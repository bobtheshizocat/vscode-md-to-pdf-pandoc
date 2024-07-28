# md-to-pdf-pandoc

A Visual Studio Code extension that automatically converts Markdown files to PDF format using Pandoc.

## Features

- Automatic conversion of Markdown to PDF on save
- Manual conversion via shortcut key (Ctrl+Alt+P / Cmd+Alt+P)
- Customizable configuration options for PDF output
- Automatic frontmatter addition to new Markdown files

## Requirements

- Visual Studio Code 1.60.0 or higher
- Pandoc installed on your system

## Installation

1. Install Visual Studio Code 1.60.0 or higher
2. Install Pandoc on your system
3. Install the md-to-pdf-pandoc extension from the VS Code Marketplace

## Usage

The extension activates automatically when a Markdown file is opened in VS Code. It can generate a PDF version either automatically upon saving or manually via a keyboard shortcut.

### Automatic Conversion

By default, the extension will automatically convert your Markdown file to PDF when you save it. You can disable this feature in the settings.

### Manual Conversion

You can manually convert a Markdown file to PDF using the shortcut key:

- Windows/Linux: `Ctrl+Alt+P`
- Mac: `Cmd+Alt+P`

## Configuration

You can customize the behavior of md-to-pdf-pandoc in your VS Code settings. Here's a comprehensive list of all available options:

- `mdtopdfpandoc.autoSaveEnabled`: Enable/disable automatic conversion on save (default: true)
- `mdtopdfpandoc.shortcutKey`: Shortcut key for manual PDF conversion (default: "ctrl+alt+p")
- `mdtopdfpandoc.outputPath`: Set the output path for the PDF file (default: empty, uses same directory as Markdown file)
- `mdtopdfpandoc.paperSize`: Set the paper size (default: "a4paper", options: "a4paper", "letterpaper", "a5paper", "b5paper")
- `mdtopdfpandoc.margins`: Set the page margins (default: left: "3cm", right: "2cm", top: "2cm", bottom: "2cm")
- `mdtopdfpandoc.language`: Set the document language (default: "de-DE")
- `mdtopdfpandoc.standalone`: Generate a standalone document (default: true)
- `mdtopdfpandoc.tableOfContents`: Include a table of contents (default: false)
- `mdtopdfpandoc.numberSections`: Number sections automatically (default: false)
- `mdtopdfpandoc.includeHeader`: Include a header in the document (default: true)
- `mdtopdfpandoc.documentTitle`: Set the document title for the header (default: empty, uses title from Markdown)
- `mdtopdfpandoc.extractTitleFromMarkdown`: Extract the title from Markdown metadata (default: true)
- `mdtopdfpandoc.breakUrls`: Enable URL line breaks (default: true)
- `mdtopdfpandoc.hyphensUrl`: Enable hyphenation for URLs (default: true)
- `mdtopdfpandoc.addFrontmatter`: Automatically add frontmatter to new Markdown files (default: true)
- `mdtopdfpandoc.customPandocOptions`: Add custom Pandoc options (default: empty)

To modify these settings, go to File > Preferences > Settings in VS Code, then search for "md-to-pdf-pandoc".

### Frontmatter

When `mdtopdfpandoc.addFrontmatter` is enabled, the extension will automatically add the following frontmatter to new Markdown files:

```yaml
---
title: "Your Title"
author: Your Name, Your First Name / ID / Organization / Student number
date: "Current Date"
---
```

You can customize this frontmatter in your Markdown files to set the document title, author, and date.

## Advanced Usage

### Custom Pandoc Options

You can add custom Pandoc options using the `mdtopdfpandoc.customPandocOptions` setting. This allows you to further customize the PDF output beyond the provided settings. For example, you could add options to change the PDF engine, use a custom LaTeX template, or add filters.

### Resource Handling

The extension automatically sets the resource path to the current directory, allowing Pandoc to find local images and other resources referenced in your Markdown files.

## Troubleshooting

If you encounter issues with the PDF conversion:

1. Ensure Pandoc is correctly installed and accessible from the command line.
2. Check the VS Code output panel (View > Output, then select "Markdown to PDF" from the dropdown) for any error messages.
3. Verify that your Markdown syntax is correct and that all referenced resources (like images) are available.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE.txt).

## Support

If you encounter any problems or have any suggestions, please open an issue on the [GitHub repository](https://github.com/bobtheshizocat/vscode-md-to-pdf-pandoc).
