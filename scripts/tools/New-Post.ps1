param(
    [Parameter(Mandatory = $true)]
    [string]$Spec,
    [switch]$Apply,
    [switch]$DryRun,
    [switch]$Overwrite
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'PostTools.ps1')

if (-not $Apply -and -not $DryRun) {
    $DryRun = $true
}

$prepareScript = Join-Path $PSScriptRoot 'Prepare-PostImages.ps1'
$createScript = Join-Path $PSScriptRoot 'Create-Post.ps1'
$registerScript = Join-Path $PSScriptRoot 'Register-Post.ps1'
$specPath = Resolve-RepoPath -Path $Spec

function Move-SpecToProcessed {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SpecPath
    )

    $processedDir = Join-Path (Join-Path (Get-RepoRoot) 'post_queue') 'processed'
    New-DirectoryIfMissing -Path $processedDir

    $specName = [System.IO.Path]::GetFileName($SpecPath)
    $targetPath = Join-Path $processedDir $specName
    if (Test-Path -LiteralPath $targetPath) {
        throw "Processed spec already exists: $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $targetPath))"
    }

    Move-Item -LiteralPath $SpecPath -Destination $targetPath
    return $targetPath
}

if ($DryRun) {
    & $prepareScript -Spec $Spec -DryRun
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    & $createScript -Spec $Spec -DryRun
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    & $registerScript -Spec $Spec -DryRun
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    exit 0
}

& $prepareScript -Spec $Spec -Apply
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if ($Overwrite) {
    & $createScript -Spec $Spec -Overwrite
} else {
    & $createScript -Spec $Spec
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $registerScript -Spec $Spec -Apply
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Move-SpecToProcessed -SpecPath $specPath | Out-Null

'Completed new post automation successfully.'
