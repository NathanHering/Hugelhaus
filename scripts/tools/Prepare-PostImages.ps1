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

$specPath = Resolve-RepoPath -Path $Spec
$postSpec = Get-PostSpec -SpecPath $specPath
Assert-SpecHasImages -PostSpec $postSpec
$processedDir = Join-Path (Join-Path (Get-RepoRoot) 'post_queue') 'processed'
$processedNames = New-Object 'System.Collections.Generic.HashSet[string]'
$images = Get-OrderedImages -Images (Get-AllSpecImages -PostSpec $postSpec)
$plan = @()

for ($index = 0; $index -lt $images.Count; $index++) {
    $image = $images[$index]
    if (-not $image.sourcePath) {
        throw "images[$index] is missing required property: sourcePath"
    }

    $sourcePath = Resolve-RepoPath -Path ([string]$image.sourcePath)
    if (-not (Test-Path -LiteralPath $sourcePath)) {
        throw "Source image does not exist: $($image.sourcePath)"
    }

    $outputName = [System.IO.Path]::GetFileName($sourcePath)
    $imageDate = Get-ImageDatePartsFromFileName -FileName $outputName
    $outputDir = Join-Path (Join-Path (Join-Path (Get-RepoRoot) 'images') $imageDate.YearText) $imageDate.MonthText
    $outputPath = Join-Path $outputDir $outputName
    $destinationExists = Test-Path -LiteralPath $outputPath

    $processedName = Resolve-UniqueFileName -DirectoryPath $processedDir -RequestedName ([System.IO.Path]::GetFileName($sourcePath)) -UsedNames $processedNames
    $processedPath = Join-Path $processedDir $processedName
    $webPath = "/images/$($imageDate.YearText)/$($imageDate.MonthText)/$outputName"

    $plan += [pscustomobject]@{
        SourcePath = $sourcePath
        OutputPath = $outputPath
        DestinationExists = $destinationExists
        ProcessedPath = $processedPath
        WebPath = $webPath
        OutputName = $outputName
        Image = $image
    }
}

if ($DryRun) {
    'Dry run image processing plan:'
    $plan | ForEach-Object {
        [pscustomobject]@{
            source = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $_.SourcePath)
            destination = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $_.OutputPath)
            destinationExists = $_.DestinationExists
            processed = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $_.ProcessedPath)
            webPath = $_.WebPath
        }
    } | ConvertTo-Json -Depth 5
    exit 0
}

New-DirectoryIfMissing -Path $processedDir
foreach ($item in $plan) {
    New-DirectoryIfMissing -Path ([System.IO.Path]::GetDirectoryName($item.OutputPath))
    if (-not $item.DestinationExists) {
        Invoke-ImageMagickResize -SourcePath $item.SourcePath -OutputPath $item.OutputPath
    }
    Move-Item -LiteralPath $item.SourcePath -Destination $item.ProcessedPath

    $item.Image | Add-Member -NotePropertyName processedPath -NotePropertyValue ([System.IO.Path]::GetRelativePath((Get-RepoRoot), $item.ProcessedPath).Replace('\', '/')) -Force
}

Set-Content -LiteralPath $specPath -Value (ConvertTo-SpecJson -Spec $postSpec)
Write-Output ("Processed {0} image(s) and updated spec: {1}" -f $plan.Count, [System.IO.Path]::GetRelativePath((Get-RepoRoot), $specPath))
