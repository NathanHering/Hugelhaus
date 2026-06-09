# Hugelhaus

This is a blog site dedicated to documenting the home improvements and times spent at the house I purchased.


## Post Automation (Local CLI)

Image resizing and post file generation can now be automated from a JSON spec file using local PowerShell scripts. These scripts are only for authoring on your machine; the deployed site remains fully static.

### Prerequisite

Install ImageMagick and ensure `magick` is available in your terminal path.

### Example Spec

Use the sample at `post_queue/new-post.example.json` as a template.

Preferred shape for complex posts is section-based:

```json
{
	"postDate": "2026-06-07",
	"title": "Example",
	"menuText": "Example",
	"tags": ["PROJECTS"],
	"sections": [
		{
			"paragraphs": ["Paragraphs before first slide set."],
			"images": [
				{ "sourcePath": "post_queue/2026/a.jpg", "caption": "A" }
			]
		},
		{
			"paragraphs": ["More text before another slide set."],
			"images": [
				{ "sourcePath": "post_queue/2026/b.jpg", "caption": "B" }
			]
		}
	]
}
```

Images are rendered in the same order they appear in each `sections[].images[]` array.

The older flat shape (`bodyParagraphs` + `images`) is still supported for simple posts.

### 1) Dry Run Image Prep

```powershell
.\scripts\tools\Prepare-PostImages.ps1 -Spec post_queue/new-post.example.json -DryRun
```

### 2) Resize and Move Images

```powershell
.\scripts\tools\Prepare-PostImages.ps1 -Spec post_queue/new-post.example.json -Apply
```

This command resizes images to width 1000 and writes them to `images/YYYY/MM` based on the first six characters of each source file name (`YYYYMM`).
The output file name is always the same as the source file name, and the spec is updated with `processedPath` values.

### 3) Generate Post File

```powershell
.\scripts\tools\Create-Post.ps1 -Spec post_queue/new-post.example.json
```

This creates `posts/YYYY/yymmdd.js` and prints the matching entry snippet to add in `scripts/posts.js`.

### 4) Register Post in posts.js

```powershell
.\scripts\tools\Register-Post.ps1 -Spec post_queue/new-post.example.json -Apply
```

### 5) Run End-to-End (Recommended)

Dry run:

```powershell
.\scripts\tools\New-Post.ps1 -Spec post_queue/new-post.example.json -DryRun
```

Apply changes:

```powershell
.\scripts\tools\New-Post.ps1 -Spec post_queue/new-post.example.json -Apply
```


Visit the site at:

https://www.hugelhaus.com
