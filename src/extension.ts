// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// Snippet function
// description: The description of the snippet
// prefix: The prefix of the snippet
// body: The body of the snippet
// scope: The scope of the snippet
function snippet(data: { description: string, prefix: string, body: string[], scope: string }) {
	return {
		description: data.description,
		prefix: data.prefix,
		body: data.body,
		scope: data.scope
	};
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

class Snippets extends vscode.CompletionItem {
	constructor(label: string, kind: vscode.CompletionItemKind, description: string, detail: string, insertText: string) {
		super(label, kind);
		this.label = description;
		this.detail = detail;
		this.insertText = insertText;
	}
}

export function activate(context: vscode.ExtensionContext) {

	// Snippets
	let snippets = [
		snippet({
			description: "Log to console",
			prefix: "log",
			body: ["console.log($1);"],
			scope: "javascript,typescript,typescriptreact,javascriptreact"
		})
	]

	// Register snippets
	let disposable = vscode.languages.registerCompletionItemProvider('javascript', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			return snippets.map((snippet) => {
				return new Snippets(snippet.prefix, vscode.CompletionItemKind.Snippet, snippet.description, snippet.prefix, snippet.body.join("\n"));
			});
		}
	});

	context.subscriptions.push(disposable);
}
