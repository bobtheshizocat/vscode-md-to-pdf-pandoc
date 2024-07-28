# Change Log

All notable changes to the "md-to-pdf-pandoc" extension will be documented in this file.

## [0.0.5] - 2024-07-28

### Changed

- removed comments and added docstrings (JSDoc format)

## [0.0.4] - 2024-07-28

### Added

- New configuration option `mdtopdfpandoc.enableLogging` to enable/disable logging of Pandoc commands and output
- Improved error logging when Pandoc conversion fails

### Changed

- Removed hardcoded PDF engine option, allowing Pandoc to use its default engine (added in between updates for testing purposes)
- Updated README with new configuration options and troubleshooting steps

### Fixed

- Improved handling of image paths and resource embedding (full path is required!)

## [0.0.1] - 2024-07-28

### Added

- Initial release of md-to-pdf-pandoc extension
- Automatic conversion of Markdown to PDF on save
- Manual conversion via shortcut key (Ctrl+Alt+P / Cmd+Alt+P)
- Customizable configuration options for PDF output:
  - Paper size and margins
  - Language settings
  - Table of contents and section numbering
  - Header inclusion with automatic title extraction
  - URL handling (line breaks and hyphenation)
- Support for custom Pandoc options
- Standalone document generation
  
### Bugs

- Automatic frontmatter addition to new Markdown files does not work
- Image rendering does not work
- Using filepaths with "\\" gives an error -> use "/" instead or "\\" -> "C:/Users/username/Documents/document.md" or "C:\\\\Users\\\\username\\\\Documents\\\\document.md"
