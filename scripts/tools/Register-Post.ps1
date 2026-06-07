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

function Get-RegistryEntry {
    param(
        [Parameter(Mandatory = $true)]
        $SpecData,
        [Parameter(Mandatory = $true)]
        $PostDate
    )

    $lines = New-Object System.Collections.Generic.List[string]
    $menuText = [string]$SpecData.menuText
    $lines.Add("    {   id: $($PostDate.Id), year: $($PostDate.Year), month: $($PostDate.Month), day: $($PostDate.Day),")
    $lines.Add(('        menuText: "{0}",' -f $menuText.Replace('"', '\"')))
    $lines.Add('        tags: [')
    foreach ($tag in @($SpecData.tags)) {
        $lines.Add("            tags.$tag,")
    }
    $lines.Add('        ],')
    $lines.Add("        src: './posts/$($PostDate.Year)/$($PostDate.Id).js'")
    $lines.Add('    }')
    return $lines -join "`n"
}

$specPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Spec))
$postSpec = Get-PostSpec -SpecPath $specPath
if (-not $postSpec.menuText) {
    throw 'Spec file must include menuText'
}
$postDate = Get-PostDateParts -PostDate $postSpec.postDate
$allowedTags = Get-AllowedTagNames -TagsFilePath (Join-Path (Join-Path (Get-Location) 'scripts') 'tags.js')
foreach ($tag in @($postSpec.tags)) {
    if (-not $allowedTags.Contains([string]$tag)) {
        throw "Unknown tag in spec: $tag"
    }
}

$postsPath = Join-Path (Join-Path (Get-Location) 'scripts') 'posts.js'
$postsContent = Get-Content -LiteralPath $postsPath -Raw
if ($postsContent -match ("\bid:\s*{0}\b" -f $postDate.Id)) {
    throw "Duplicate post id found in scripts/posts.js: $($postDate.Id)"
}
if ($postsContent -match ([regex]::Escape("src: './posts/$($postDate.Year)/$($postDate.Id).js'"))) {
    throw "Duplicate post src found in scripts/posts.js for id $($postDate.Id)"
}

$entry = Get-RegistryEntry -SpecData $postSpec -PostDate $postDate
if ($DryRun) {
    'Dry run posts.js entry:'
    $entry
    exit 0
}

if (-not $postsContent.TrimEnd().EndsWith(']')) {
    throw 'scripts/posts.js appears to be in an unexpected format (missing closing ]).'
}

$updatedContent = [regex]::Replace($postsContent, "`r?`n\]\s*$", ",`n$entry`n]`n")
Set-Content -LiteralPath $postsPath -Value $updatedContent
'Updated scripts/posts.js with new post entry.'
