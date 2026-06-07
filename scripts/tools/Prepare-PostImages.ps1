param(
    [Parameter(Mandatory = $true)]
    [string]$Spec,
    [switch]$Apply,
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'PostTools.ps1')

if (-not $Apply -and -not $DryRun) {
    $DryRun = $true
}

$specPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Spec))
$postSpec = Get-PostSpec -SpecPath $specPath
Assert-SpecHasImages -PostSpec $postSpec
$postDate = Get-PostDateParts -PostDate $postSpec.postDate
$outputDir = Join-Path (Join-Path (Join-Path (Get-Location) 'images') $postDate.YearText) $postDate.MonthText
$webDir = "/images/$($postDate.YearText)/$($postDate.MonthText)"
$usedNames = New-Object 'System.Collections.Generic.HashSet[string]'
$images = Get-OrderedImages -Images (Get-AllSpecImages -PostSpec $postSpec)
$plan = @()

for ($index = 0; $index -lt $images.Count; $index++) {
    $image = $images[$index]
    if (-not $image.sourcePath) {
        throw "images[$index] is missing required property: sourcePath"
    }

    $sourcePath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) ([string]$image.sourcePath)))
    if (-not (Test-Path -LiteralPath $sourcePath)) {
        throw "Source image does not exist: $($image.sourcePath)"
    }

    $requestedName = if ($image.PSObject.Properties.Name -contains 'outputName' -and $image.outputName) { [string]$image.outputName } else { [System.IO.Path]::GetFileName($sourcePath) }
    $uniqueName = Resolve-UniqueFileName -DirectoryPath $outputDir -RequestedName $requestedName -UsedNames $usedNames
    $outputPath = Join-Path $outputDir $uniqueName
    $webPath = "$webDir/$uniqueName"

    $plan += [pscustomobject]@{
        SourcePath = $sourcePath
        OutputPath = $outputPath
        WebPath = $webPath
        OutputName = $uniqueName
        Image = $image
    }
}

if ($DryRun) {
    'Dry run image processing plan:'
    $plan | ForEach-Object {
        [pscustomobject]@{
            source = [System.IO.Path]::GetRelativePath((Get-Location).Path, $_.SourcePath)
            destination = [System.IO.Path]::GetRelativePath((Get-Location).Path, $_.OutputPath)
            webPath = $_.WebPath
        }
    } | ConvertTo-Json -Depth 5
    exit 0
}

New-DirectoryIfMissing -Path $outputDir
foreach ($item in $plan) {
    Invoke-ImageMagickResize -SourcePath $item.SourcePath -OutputPath $item.OutputPath
    $item.Image | Add-Member -NotePropertyName outputName -NotePropertyValue $item.OutputName -Force
    $item.Image | Add-Member -NotePropertyName webPath -NotePropertyValue $item.WebPath -Force
}

Set-Content -LiteralPath $specPath -Value (ConvertTo-SpecJson -Spec $postSpec)
Write-Output ("Resized {0} image(s) and updated spec: {1}" -f $plan.Count, [System.IO.Path]::GetRelativePath((Get-Location).Path, $specPath))
