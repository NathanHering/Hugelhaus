param(
    [Parameter(Mandatory = $true)]
    [string]$Spec,
    [switch]$Apply,
    [switch]$DryRun,
    [switch]$Overwrite,
    [switch]$Undo
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'PostTools.ps1')

if ($Apply -and $Undo) {
    throw 'Specify either -Apply or -Undo, not both.'
}

if (-not $Apply -and -not $DryRun -and -not $Undo) {
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

function Move-SpecToCurrent {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SpecPath
    )

    $currentDir = Join-Path (Join-Path (Get-RepoRoot) 'post_queue') 'current'
    New-DirectoryIfMissing -Path $currentDir

    $specName = [System.IO.Path]::GetFileName($SpecPath)
    $targetPath = Join-Path $currentDir $specName
    if (Test-Path -LiteralPath $targetPath) {
        throw "Current spec already exists: $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $targetPath))"
    }

    Move-Item -LiteralPath $SpecPath -Destination $targetPath
    return $targetPath
}

function Get-PostFilePath {
    param(
        [Parameter(Mandatory = $true)]
        $PostDate
    )

    $postDirectory = Join-Path (Join-Path (Get-RepoRoot) 'posts') ([string]$PostDate.Year)
    return (Join-Path $postDirectory "$($PostDate.Id).js")
}

function Remove-RegistryEntryForPost {
    param(
        [Parameter(Mandatory = $true)]
        $PostDate
    )

    $postsPath = Join-Path (Join-Path (Get-RepoRoot) 'scripts') 'posts.js'
    if (-not (Test-Path -LiteralPath $postsPath)) {
        throw "posts.js was not found: $postsPath"
    }

    $postsContent = Get-Content -LiteralPath $postsPath -Raw
    $pattern = "(?ms)^\s*\{\s*id:\s*$($PostDate.Id),.*?^\s*\},?\s*$"
    if ($postsContent -notmatch $pattern) {
        return $false
    }

    $updatedContent = [regex]::Replace($postsContent, $pattern, '')
    Set-Content -LiteralPath $postsPath -Value $updatedContent
    return $true
}

function Restore-ProcessedImage {
    param(
        [Parameter(Mandatory = $true)]
        $Image,
        [switch]$DryRun
    )

    if (-not ($Image.PSObject.Properties.Name -contains 'processedPath') -or -not $Image.processedPath) {
        throw 'Image is missing required property: processedPath'
    }

    if (-not ($Image.PSObject.Properties.Name -contains 'sourcePath') -or -not $Image.sourcePath) {
        throw 'Image is missing required property: sourcePath'
    }

    $processedPath = Resolve-RepoPath -Path ([string]$Image.processedPath)
    $sourcePath = Resolve-RepoPath -Path ([string]$Image.sourcePath)
    $processedExists = Test-Path -LiteralPath $processedPath
    $sourceExists = Test-Path -LiteralPath $sourcePath

    if ($processedExists -and $sourceExists) {
        throw "Cannot restore image because both paths exist: $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $sourcePath)) and $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $processedPath))"
    }

    if (-not $processedExists -and -not $sourceExists) {
        throw "Neither the processed image nor the source image exists: $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $sourcePath))"
    }

    if ($processedExists) {
        return [pscustomobject]@{
            SourcePath = $sourcePath
            ProcessedPath = $processedPath
            Action = 'restored'
            ShouldMove = -not $DryRun
        }
    }

    return [pscustomobject]@{
        SourcePath = $sourcePath
        ProcessedPath = $processedPath
        Action = 'already-restored'
        ShouldMove = $false
    }
}

function Invoke-UndoNewPost {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SpecPath,
        [switch]$DryRun
    )

    $postSpec = Get-PostSpec -SpecPath $SpecPath
    Assert-SpecHasImages -PostSpec $postSpec

    $processedRoot = Join-Path (Join-Path (Get-RepoRoot) 'post_queue') 'processed'
    if ([System.IO.Path]::GetFullPath($SpecPath) -notlike ([System.IO.Path]::GetFullPath((Join-Path $processedRoot '*')))) {
        throw "Undo expects the spec file from post_queue/processed: $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $SpecPath))"
    }

    $postDate = Get-PostDateParts -PostDate $postSpec.postDate
    $postPath = Get-PostFilePath -PostDate $postDate
    $currentSpecPath = Join-Path (Join-Path (Join-Path (Get-RepoRoot) 'post_queue') 'current') ([System.IO.Path]::GetFileName($SpecPath))
    $imageRestores = @(Get-AllSpecImages -PostSpec $postSpec | ForEach-Object { Restore-ProcessedImage -Image $_ -DryRun:$DryRun })
    $registryAction = $null
    $postAction = $null
    $specAction = $null

    if ($DryRun) {
        'Dry run undo plan:'
        [pscustomobject]@{
            spec = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $SpecPath)
            specDestination = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $currentSpecPath)
            post = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $postPath)
            registry = 'scripts/posts.js'
            images = @($imageRestores | ForEach-Object {
                [pscustomobject]@{
                    source = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $_.SourcePath)
                    processed = [System.IO.Path]::GetRelativePath((Get-RepoRoot), $_.ProcessedPath)
                    action = $_.Action
                }
            })
        } | ConvertTo-Json -Depth 6
        return
    }

    foreach ($imageRestore in $imageRestores) {
        if (-not $imageRestore.ShouldMove) {
            continue
        }

        New-DirectoryIfMissing -Path ([System.IO.Path]::GetDirectoryName($imageRestore.SourcePath))
        Move-Item -LiteralPath $imageRestore.ProcessedPath -Destination $imageRestore.SourcePath
    }

    if (Test-Path -LiteralPath $postPath) {
        Remove-Item -LiteralPath $postPath
        $postAction = 'removed'
    } else {
        $postAction = 'already-missing'
    }

    if (Remove-RegistryEntryForPost -PostDate $postDate) {
        $registryAction = 'removed'
    } else {
        $registryAction = 'already-missing'
    }

    if (Test-Path -LiteralPath $SpecPath) {
        Move-SpecToCurrent -SpecPath $SpecPath | Out-Null
        $specAction = 'restored'
    } elseif (Test-Path -LiteralPath $currentSpecPath) {
        $specAction = 'already-restored'
    } else {
        throw "Neither processed nor current spec exists for undo: $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $SpecPath))"
    }

    'Undid new post automation successfully.'
    "Spec: $specAction"
    "Post file: $postAction"
    "Registry entry: $registryAction"
    $imageRestores | ForEach-Object {
        "Image: $($_.Action) $([System.IO.Path]::GetRelativePath((Get-RepoRoot), $_.SourcePath))"
    }
}

if ($DryRun) {
    if ($Undo) {
        Invoke-UndoNewPost -SpecPath $specPath -DryRun
        exit 0
    }

    & $prepareScript -Spec $Spec -DryRun
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    & $createScript -Spec $Spec -DryRun
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    & $registerScript -Spec $Spec -DryRun
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    exit 0
}

if ($Undo) {
    Invoke-UndoNewPost -SpecPath $specPath
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
