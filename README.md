# md-to-pdf-pandoc

A Visual Studio Code extension that automatically converts Markdown files to PDF format using Pandoc.

## Features

- Automatic conversion of Markdown to PDF on save
- Manual conversion via shortcut key (Ctrl+Alt+P / Cmd+Alt+P)
- Customizable configuration options for PDF output

## Requirements

- Visual Studio Code 1.60.0 or higher
- Pandoc must be installed on your system. You can download and install it from [pandoc.org](https://pandoc.org/installing.html).

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

You can configure the extension in VS Code settings. Here are the available options with their default values:

- `mdtopdfpandoc.autoSaveEnabled`: Enables automatic PDF creation on save. (Default: `true`)
- `mdtopdfpandoc.shortcutKey`: Keyboard shortcut for manual PDF creation. (Default: `"ctrl+alt+p"`)
- `mdtopdfpandoc.addFrontmatter`: Automatically adds a frontmatter block to new Markdown files. (Default: `true`)
- `mdtopdfpandoc.standalone`: Generates a complete (standalone) document. (Default: `true`)
- `mdtopdfpandoc.tableOfContents`: Adds a table of contents. (Default: `false`)
- `mdtopdfpandoc.numberSections`: Automatically numbers sections. (Default: `false`)
- `mdtopdfpandoc.language`: Sets the document language. (Default: `"de-DE"`)
- `mdtopdfpandoc.breakUrls`: Enables line breaks for URLs. (Default: `true`)
- `mdtopdfpandoc.includeHeader`: Activates the header. (Default: `true`)
- `mdtopdfpandoc.documentTitle`: Sets the document title for the header. (Default: `""`)
- `mdtopdfpandoc.extractTitleFromMarkdown`: Extracts the title from Markdown metadata. (Default: `true`)
- `mdtopdfpandoc.outputPath`: Sets the storage location for the PDF file. (Default: `""` - same folder as Markdown file)
- `mdtopdfpandoc.customPandocOptions`: Allows additional Pandoc options. (Default: `""`)
- `mdtopdfpandoc.resourcePath`: Sets the resource path for Pandoc. (Default: `"."`)
- `mdtopdfpandoc.embedResources`: Embeds resources in the output file. (Default: `false`)
- `mdtopdfpandoc.enableLogging`: Enables logging of Pandoc commands and outputs. (Default: `false`)
- `mdtopdfpandoc.paperSize`: Selects the paper format. (Default: `"a4paper"`)
- `mdtopdfpandoc.margins`: Sets the page margins. (Default: `{ left: "3cm", right: "2cm", top: "2cm", bottom: "2cm" }`)

## Example Configuration

Here's an example configuration in your `settings.json` file:

```json
{
  "mdtopdfpandoc.autoSaveEnabled": true,
  "mdtopdfpandoc.shortcutKey": "ctrl+alt+p",
  "mdtopdfpandoc.addFrontmatter": true,
  "mdtopdfpandoc.standalone": true,
  "mdtopdfpandoc.tableOfContents": true,
  "mdtopdfpandoc.numberSections": true,
  "mdtopdfpandoc.language": "en-US",
  "mdtopdfpandoc.includeHeader": true,
  "mdtopdfpandoc.documentTitle": "My Document",
  "mdtopdfpandoc.paperSize": "a4paper",
  "mdtopdfpandoc.margins": {
    "left": "2.5cm",
    "right": "2.5cm",
    "top": "2cm",
    "bottom": "2cm"
  },
  "mdtopdfpandoc.enableLogging": true
}
```

## Troubleshooting

If you're having problems with the extension:

1. Make sure Pandoc is correctly installed and can be called from the command line.
2. Enable logging (`mdtopdfpandoc.enableLogging`) for detailed outputs.
3. Check the VS Code output (View -> Output) for detailed error messages.
4. If issues occur with image display, check the paths to your images and the `resourcePath` setting.
5. If problems persist, please open an issue on the extension's GitHub page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE.txt).

## Support

If you encounter any problems or have any suggestions, please open an issue on the [GitHub repository](https://github.com/bobtheshizocat/vscode-md-to-pdf-pandoc).
