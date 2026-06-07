Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-PostSpec {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SpecPath
    )

    if (-not (Test-Path -LiteralPath $SpecPath)) {
        throw "Spec file was not found: $SpecPath"
    }

    $spec = Get-Content -LiteralPath $SpecPath -Raw | ConvertFrom-Json -Depth 100
    if (-not $spec.postDate) {
        throw 'Spec file is missing required property: postDate'
    }

    return $spec
}

function Get-PostDateParts {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PostDate
    )

    if ($PostDate -notmatch '^(\d{4})-(\d{2})-(\d{2})$') {
        throw "Invalid postDate format: $PostDate. Expected yyyy-mm-dd."
    }

    [pscustomobject]@{
        Year = [int]$Matches[1]
        Month = [int]$Matches[2]
        Day = [int]$Matches[3]
        YearText = $Matches[1]
        MonthText = $Matches[2]
        DayText = $Matches[3]
        Id = "$($Matches[1].Substring(2))$($Matches[2])$($Matches[3])"
    }
}

function Get-NormalizedSections {
    param(
        [Parameter(Mandatory = $true)]
        $PostSpec
    )

    $hasSections = $PostSpec.PSObject.Properties.Name -contains 'sections'
    if ($hasSections -and $null -ne $PostSpec.sections -and $PostSpec.sections.Count -gt 0) {
        return @($PostSpec.sections | ForEach-Object {
            [pscustomobject]@{
                paragraphs = if ($_.PSObject.Properties.Name -contains 'paragraphs') { @($_.paragraphs) } else { @() }
                images = if ($_.PSObject.Properties.Name -contains 'images') { @($_.images) } else { @() }
            }
        })
    }

    $bodyParagraphs = if ($PostSpec.PSObject.Properties.Name -contains 'bodyParagraphs') { @($PostSpec.bodyParagraphs) } else { @() }
    $images = if ($PostSpec.PSObject.Properties.Name -contains 'images') { @($PostSpec.images) } else { @() }

    return @(
        [pscustomobject]@{
            paragraphs = $bodyParagraphs
            images = $images
        }
    )
}

function Get-AllSpecImages {
    param(
        [Parameter(Mandatory = $true)]
        $PostSpec
    )

    $images = @()
    foreach ($section in (Get-NormalizedSections -PostSpec $PostSpec)) {
        foreach ($image in @($section.images)) {
            $images += $image
        }
    }

    return $images
}

function Assert-SpecHasImages {
    param(
        [Parameter(Mandatory = $true)]
        $PostSpec
    )

    $images = @(Get-AllSpecImages -PostSpec $PostSpec)
    if ($images.Count -eq 0) {
        throw 'Spec file must include at least one image in sections[].images[] or images[]'
    }
}

function Get-OrderedImages {
    param(
        [Parameter(Mandatory = $true)]
        $Images
    )

    return @($Images | Sort-Object -Property @{ Expression = {
        if ($_.PSObject.Properties.Name -contains 'order' -and $null -ne $_.order) { [int]$_.order } else { [int]::MaxValue }
    } }, @{ Expression = {
        if ($_.PSObject.Properties.Name -contains 'sourcePath' -and $_.sourcePath) { [string]$_.sourcePath } else { '' }
    } })
}

function New-DirectoryIfMissing {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Resolve-UniqueFileName {
    param(
        [Parameter(Mandatory = $true)]
        [string]$DirectoryPath,
        [Parameter(Mandatory = $true)]
        [string]$RequestedName,
        [Parameter(Mandatory = $true)]
        $UsedNames
    )

    $extension = [System.IO.Path]::GetExtension($RequestedName)
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($RequestedName)
    $candidate = $RequestedName
    $index = 1

    while ($UsedNames.Contains($candidate.ToLowerInvariant()) -or (Test-Path -LiteralPath (Join-Path $DirectoryPath $candidate))) {
        $candidate = '{0}_{1}{2}' -f $baseName, $index.ToString('00'), $extension
        $index++
    }

    $null = $UsedNames.Add($candidate.ToLowerInvariant())
    return $candidate
}

function Invoke-ImageMagickResize {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SourcePath,
        [Parameter(Mandatory = $true)]
        [string]$OutputPath
    )

    $arguments = @($SourcePath, '-auto-orient', '-resize', '1000x')
    $extension = [System.IO.Path]::GetExtension($OutputPath).ToLowerInvariant()
    if ($extension -in @('.jpg', '.jpeg')) {
        $arguments += @('-quality', '90')
    }
    $arguments += $OutputPath

    & magick @arguments
    if ($LASTEXITCODE -ne 0) {
        throw 'ImageMagick returned a non-zero exit code.'
    }
}

function ConvertTo-DisplayDateText {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PostDate
    )

    $date = [datetime]::ParseExact($PostDate, 'yyyy-MM-dd', [System.Globalization.CultureInfo]::InvariantCulture)
    return '{0:dddd MMMM d yyyy}' -f $date
}

function ConvertTo-SlideText {
    param(
        [AllowNull()]
        [string]$Value
    )

    if ($null -eq $Value) {
        return ''
    }

    return $Value.Replace("'", '&apos;')
}

function ConvertTo-TemplateText {
    param(
        [AllowNull()]
        [string]$Value
    )

    if ($null -eq $Value) {
        return ''
    }

    return $Value.Replace('`', '&#96;')
}

function Get-SlideSuffix {
    param(
        [Parameter(Mandatory = $true)]
        [int]$Index
    )

    $value = $Index + 1
    $result = ''
    while ($value -gt 0) {
        $value--
        $result = [char](97 + ($value % 26)) + $result
        $value = [math]::Floor($value / 26)
    }

    return $result
}

function ConvertTo-SpecJson {
    param(
        [Parameter(Mandatory = $true)]
        $Spec
    )

    return ($Spec | ConvertTo-Json -Depth 100) + "`n"
}

function Get-AllowedTagNames {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TagsFilePath
    )

    $content = Get-Content -LiteralPath $TagsFilePath -Raw
    $tagMatches = [regex]::Matches($content, '\b[A-Z_]+\s*:')
    $names = New-Object 'System.Collections.Generic.HashSet[string]'
    foreach ($match in $tagMatches) {
        $null = $names.Add($match.Value.Replace(':', '').Trim())
    }

    return $names
}
