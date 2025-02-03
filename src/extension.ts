import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('pathtree.generateFilePath', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace is open. Please open a folder first.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const workspaceName = workspaceFolders[0].name;
        const filePath = path.join(rootPath, 'file.path.txt');
        
        vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Generating File Path Tree 🌳 (${workspaceName})`
            },
            (progress) => {
                return new Promise((resolve) => {
                    const treeStructure = generateTree(rootPath, '', true);
                    fs.writeFileSync(filePath, treeStructure, 'utf-8');
                    vscode.window.showInformationMessage(`File path structure saved to file.path.txt`);
                    resolve(undefined);
                });
            }
        );
        
        const treeStructure = generateTree(rootPath, '', true);
        
        fs.writeFileSync(filePath, treeStructure, 'utf-8');
        vscode.window.showInformationMessage(`File path structure saved to file.path.txt`);
    });

    let disposableFolder = vscode.commands.registerCommand('pathtree.generateFolderFilePath', (uri: vscode.Uri) => {
        if (!uri || !fs.existsSync(uri.fsPath)) {
            vscode.window.showErrorMessage('Invalid folder selection.');
            return;
        }

        const folderPath = uri.fsPath;
        const folderName = path.basename(folderPath);
        const filePath = path.join(folderPath, `${folderName}.path.txt`);

        vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Generating file path for folder 🌳 (${folderName})`
            },
            (progress) => {
                return new Promise((resolve) => {
                    const treeStructure = generateTree(folderPath, '', true);
                    fs.writeFileSync(filePath, treeStructure, 'utf-8');
                    vscode.window.showInformationMessage(`File path saved to ${filePath}`);
                    resolve(undefined);
                });
            }
        );

        const treeStructure = generateTree(folderPath, '', true);

        fs.writeFileSync(filePath, treeStructure, 'utf-8');
        vscode.window.showInformationMessage(`File path saved to ${filePath}`);
    });

    context.subscriptions.push(disposable, disposableFolder);
}

function generateTree(dirPath: string, indent: string, isRoot: boolean): string {
    let folders: { name: string, path: string }[] = [];
    let files: string[] = [];
    
    const items = fs.readdirSync(dirPath);
    items.forEach((item) => {
        const itemPath = path.join(dirPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
            folders.push({ name: item, path: itemPath });
        } else {
            files.push(item);
        }
    });
    
    let result = isRoot ? path.basename(dirPath) + '/\n' : '';
    
    folders.forEach((folder) => {
        result += indent + '├── ' + folder.name + '/\n';
        result += generateTree(folder.path, indent + ' |          ', false);
    });
    
    files.forEach((file, index) => {
        const prefix = index === files.length - 1 ? '└── ' : '├── ';
        result += indent + prefix + file + '\n';
    });
    
    return result;
}

export function deactivate() {}

// 7RuVWqAl68W36HV5DkQ4Xlz5JTITomvFVmEEdrdzmLDkxkllXi7uJQQJ99BBACAAAAAAAAAAAAAGAZDOe88e