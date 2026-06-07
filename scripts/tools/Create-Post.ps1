param(
    [Parameter(Mandatory = $true)]
    [string]$Spec,
    [switch]$Overwrite,
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'PostTools.ps1')

function Get-SlidesForImages {
    param(
        [Parameter(Mandatory = $true)]
        $Images,
        [Parameter(Mandatory = $true)]
        $PostDate
    )

    $slides = New-Object System.Collections.ArrayList
    $ordered = Get-OrderedImages -Images $Images
    for ($index = 0; $index -lt $ordered.Count; $index++) {
        $image = $ordered[$index]
        $webPath = if ($image.PSObject.Properties.Name -contains 'webPath' -and $image.webPath) {
            [string]$image.webPath
        } else {
            $outputName = if ($image.PSObject.Properties.Name -contains 'outputName' -and $image.outputName) { [string]$image.outputName } else { [System.IO.Path]::GetFileName([string]$image.sourcePath) }
            "/images/$($PostDate.YearText)/$($PostDate.MonthText)/$outputName"
        }

        $caption = if ($image.PSObject.Properties.Name -contains 'caption') { [string]$image.caption } else { '' }
        $null = $slides.Add([pscustomobject]@{
            WebPath = $webPath
            Caption = (ConvertTo-SlideText -Value $caption)
        })
    }

    return @($slides)
}

function Get-PostFileContent {
    param(
        [Parameter(Mandatory = $true)]
        $SpecData,
        [Parameter(Mandatory = $true)]
        $PostDate
    )

    $sections = Get-NormalizedSections -PostSpec $SpecData
    $slideDeclarations = New-Object System.Collections.Generic.List[string]
    $contentLines = New-Object System.Collections.Generic.List[string]
    $continuation = '\'

    for ($sectionIndex = 0; $sectionIndex -lt $sections.Count; $sectionIndex++) {
        $section = $sections[$sectionIndex]

        foreach ($paragraph in @($section.paragraphs)) {
            $contentLines.Add(("    <p>$(ConvertTo-TemplateText -Value ([string]$paragraph))</p>" + $continuation))
            $contentLines.Add(('    <br>' + $continuation))
        }

        if (@($section.images).Count -gt 0) {
            $slideVarName = "slides_$($PostDate.Id)$(Get-SlideSuffix -Index $sectionIndex)"
            $slideDeclarations.Add("let $slideVarName = JSON.stringify([")
            foreach ($slide in (Get-SlidesForImages -Images $section.images -PostDate $PostDate)) {
                $slideDeclarations.Add("    ['$($slide.WebPath)','$($slide.Caption)'],")
            }
            $slideDeclarations.Add('])')
            $slideDeclarations.Add('')
            $contentLines.Add("    <div class='slides' data-sources='`${$slideVarName}'></div>")
            $contentLines.Add(('    <br>' + $continuation))
        }
    }

    if ($contentLines.Count -gt 0 -and $contentLines[$contentLines.Count - 1] -eq ('    <br>' + $continuation)) {
        $contentLines.RemoveAt($contentLines.Count - 1)
    }

    $lines = New-Object System.Collections.Generic.List[string]
    foreach ($line in $slideDeclarations) {
        $lines.Add($line)
    }
    $lines.Add(('content.innerHTML = `' + $continuation))
    $lines.Add(("    <h1>$(ConvertTo-TemplateText -Value ([string]$SpecData.title))</h1>" + $continuation))
    $lines.Add(("    <h5>$(ConvertTo-DisplayDateText -PostDate $SpecData.postDate)</h5>" + $continuation))
    $lines.Add(('    <br>' + $continuation))
    foreach ($line in $contentLines) {
        $lines.Add($line)
    }
    $lines.Add('`')

    return ($lines -join "`n") + "`n"
}

function Get-RegistrySnippet {
    param(
        [Parameter(Mandatory = $true)]
        $SpecData,
        [Parameter(Mandatory = $true)]
        $PostDate
    )

    $lines = New-Object System.Collections.Generic.List[string]
    $menuText = [string]$SpecData.menuText
    $lines.Add('{')
    $lines.Add("    id: $($PostDate.Id), year: $($PostDate.Year), month: $($PostDate.Month), day: $($PostDate.Day),")
    $lines.Add(('    menuText: "{0}",' -f $menuText.Replace('"', '\"')))
    $lines.Add('    tags: [')
    foreach ($tag in @($SpecData.tags)) {
        $lines.Add("        tags.$tag,")
    }
    $lines.Add('    ],')
    $lines.Add("    src: './posts/$($PostDate.Year)/$($PostDate.Id).js'")
    $lines.Add('},')
    return $lines -join "`n"
}

$specPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Spec))
$postSpec = Get-PostSpec -SpecPath $specPath
if (-not $postSpec.menuText -or -not $postSpec.title) {
    throw 'Spec file requires both menuText and title'
}
Assert-SpecHasImages -PostSpec $postSpec
$postDate = Get-PostDateParts -PostDate $postSpec.postDate
$postDirectory = Join-Path (Join-Path (Get-Location) 'posts') ([string]$postDate.Year)
$postPath = Join-Path $postDirectory "$($postDate.Id).js"

if ((Test-Path -LiteralPath $postPath) -and -not $Overwrite) {
    throw "Post file already exists: $([System.IO.Path]::GetRelativePath((Get-Location).Path, $postPath)). Use -Overwrite to replace it."
}

$content = Get-PostFileContent -SpecData $postSpec -PostDate $postDate
if ($DryRun) {
    Write-Output ("Dry run post generation target: {0}" -f [System.IO.Path]::GetRelativePath((Get-Location).Path, $postPath))
    'Preview first 20 lines:'
    ($content -split "`n" | Select-Object -First 20) -join "`n"
    'Add this entry to scripts/posts.js:'
    Get-RegistrySnippet -SpecData $postSpec -PostDate $postDate
    exit 0
}

New-DirectoryIfMissing -Path $postDirectory
Set-Content -LiteralPath $postPath -Value $content
Write-Output ("Created post file: {0}" -f [System.IO.Path]::GetRelativePath((Get-Location).Path, $postPath))
'Add this entry to scripts/posts.js:'
Get-RegistrySnippet -SpecData $postSpec -PostDate $postDate
