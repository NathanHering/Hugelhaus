param(
    [Parameter(Mandatory = $true)]
    [string]$Spec,
    [switch]$Apply,
    [switch]$DryRun,
    [switch]$Overwrite
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if (-not $Apply -and -not $DryRun) {
    $DryRun = $true
}

$prepareScript = Join-Path $PSScriptRoot 'Prepare-PostImages.ps1'
$createScript = Join-Path $PSScriptRoot 'Create-Post.ps1'
$registerScript = Join-Path $PSScriptRoot 'Register-Post.ps1'

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

'Completed new post automation successfully.'
