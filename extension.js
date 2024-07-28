const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

class MarkdownToPdfConverter {
    constructor() {
        this.config = vscode.workspace.getConfiguration('mdtopdfpandoc');
    }

    async convertToPdf(document) {
        if (!document) {
            document = vscode.window.activeTextEditor.document;
        }

        const inputPath = document.fileName;
        let outputPath = this.config.get('outputPath') || inputPath.replace('.md', '.pdf');

        if (!path.isAbsolute(outputPath)) {
            outputPath = path.join(path.dirname(inputPath), outputPath);
        }

        const pandocCommand = this.buildPandocCommand(inputPath, outputPath, document);

        if (this.config.get('enableLogging')) {
            console.log('Pandoc command:', pandocCommand);
            vscode.window.showInformationMessage(`Pandoc command: ${pandocCommand}`);
        }

        return new Promise((resolve, reject) => {
            exec(pandocCommand, (error, stdout, stderr) => {
                if (error) {
                    if (this.config.get('enableLogging')) {
                        console.error('Pandoc error:', error);
                        console.error('Pandoc stderr:', stderr);
                    }
                    reject(new Error(`Error converting to PDF: ${error.message}`));
                    return;
                }
                if (stderr && this.config.get('enableLogging')) {
                    console.warn('Pandoc stderr:', stderr);
                }
                resolve('Markdown converted to PDF successfully!');
            });
        });
    }

    buildPandocCommand(inputPath, outputPath, document) {
        let command = `pandoc "${inputPath}" -o "${outputPath}"`;
    
        if (this.config.get('standalone')) command += ' -s';
        if (this.config.get('tableOfContents')) command += ' --toc';
        if (this.config.get('numberSections')) command += ' --number-sections';
    
        command += ` -V lang=${this.config.get('language')}`;
    
        if (this.config.get('hyphensUrl')) command += ' -V hyphens=URL';
        if (this.config.get('breakUrls')) command += ' -V breakurl';
    
        command += ' -V geometry:a4paper';
        command += ' --wrap=preserve';
        
        const resourcePath = this.config.get('resourcePath');
        if (resourcePath) {
            command += ` --resource-path=${resourcePath}`;
        }
        
        if (this.config.get('embedResources')) {
            command += ' --embed-resources';
        }
        
        const margins = this.config.get('margins');
        command += ` -V geometry:left=${margins.left},right=${margins.right},top=${margins.top},bottom=${margins.bottom}`;
    
        if (this.config.get('includeHeader')) {
            command += this.buildHeaderCommand(document);
        }
    
        command += ` ${this.config.get('customPandocOptions')}`;
    
        return command;
    }

    buildHeaderCommand(document) {
        let title;
        if (this.config.get('extractTitleFromMarkdown')) {
            title = this.extractTitleFromMarkdown(document.getText());
        } else {
            title = this.config.get('documentTitle') || 'Untitled';
        }
    
        const date = new Date().toLocaleDateString('de-DE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).replace(/(\d+)\./, '$1.'); // Replace single dot with double dot for day
    
        const leftHeader = this.escapeLatex(title);
        const rightHeader = this.escapeLatex(date);
    
        // Escape backslashes and quotes for shell command
        const escapedLeftHeader = leftHeader.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const escapedRightHeader = rightHeader.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    
        return ` --variable=header-includes:"\\\\usepackage{fancyhdr}\\\\pagestyle{fancy}\\\\fancyhead[L]{${escapedLeftHeader}}\\\\fancyhead[C]{}\\\\fancyhead[R]{${escapedRightHeader}}"`;
    }
    
    escapeLatex(text) {
        return text.replace(/[&%$#_{}~^\\]/g, '\\$&')
                   .replace(/\n/g, '\\\\')
                   .replace(/[<>]/g, '{$&}');  // Wrap < and > in curly braces
    }

    extractTitleFromMarkdown(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
            try {
                const frontmatter = yaml.load(match[1]);
                if (frontmatter && frontmatter.title) {
                    return frontmatter.title;
                }
            } catch (e) {
                console.error('Error parsing frontmatter:', e);
            }
        }
        
        // Fallback to extracting from first heading if no title in frontmatter
        const titleMatch = content.match(/^#\s+(.*)$/m);
        return titleMatch ? titleMatch[1] : 'Untitled';
    }

    addFrontmatterToNewFile(uri) {
        if (!this.config.get('addFrontmatter')) return Promise.resolve(false);

        return vscode.workspace.openTextDocument(uri).then(document => {
            const edit = new vscode.WorkspaceEdit();
            const frontmatter = `---
title: "Your Title"
author: Your Name, Your First Name / ID / Organization / Student number
date: "${new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}"
---

`;
            edit.insert(uri, new vscode.Position(0, 0), frontmatter);
            return vscode.workspace.applyEdit(edit);
        });
    }
}

let converter;

function activate(context) {
    console.log('Markdown to PDF extension is now active');

    converter = new MarkdownToPdfConverter();

    let disposable = vscode.commands.registerCommand('mdtopdfpandoc.convert', function () {
        convertToPdf();
    });

    context.subscriptions.push(disposable);

    // Register event listener for file creation
    let fileSystemWatcher = vscode.workspace.createFileSystemWatcher('**/*.md');
    fileSystemWatcher.onDidCreate((uri) => {
        converter.addFrontmatterToNewFile(uri)
            .then(success => {
                if (success) {
                    vscode.window.showInformationMessage('Frontmatter added to new Markdown file.');
                }
            })
            .catch(error => {
                vscode.window.showErrorMessage('Failed to add frontmatter to new Markdown file.');
            });
    });

    // Register event listener for file save
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'markdown' && vscode.workspace.getConfiguration('mdtopdfpandoc').get('autoSaveEnabled')) {
            convertToPdf(document);
        }
    });

    // Register shortcut key
    context.subscriptions.push(vscode.commands.registerCommand('mdtopdfpandoc.convertWithShortcut', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && activeEditor.document.languageId === 'markdown') {
            convertToPdf(activeEditor.document);
        }
    }));
}

function deactivate() {}

async function convertToPdf(document) {
    try {
        const message = await converter.convertToPdf(document);
        vscode.window.showInformationMessage(message);
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
    }
}

module.exports = {
    activate,
    deactivate
};