import * as vscode from 'vscode';

function snippet(data: { description: string, prefix: string, body: string[], scope: string }) {
	return {
		description: data.description,
		prefix: data.prefix,
		body: data.body,
		scope: data.scope
	};
}

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
			description: "XaviaBot Command Template Full",
			prefix: "xpc",
			body: [
				"const config = {",
				"    name: \"$1\",",
				"    aliases: [\"\"],",
				"    description: \"$2\",",
				"    usage: \"$3\",",
				"    cooldown: 3,",
				"    permissions: [0, 1, 2],",
				"    credits: \"$4\",",
				"    extra: {}",
				"}",
				"",
				"const langData = {",
				"    \"vi_VN\": {",
				"        \"message\": \"This is an example message\",",
				"    },",
				"    \"en_US\": {",
				"        \"message\": \"This is an example message\",",
				"    }",
				"}",
				"",
				"async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {",
				"    message.send(getLang(\"message\"));",
				"}",
				"",
				"export default {",
				"    config,",
				"    langData,",
				"    onCall",
				"}"
			],
			scope: "javascript"
		}),
		snippet({
			description: "XaviaBot Command Template without Config",
			prefix: "xpcnc",
			body: [
				"const langData = {",
				"    \"vi_VN\": {",
				"        \"message\": \"This is an example message\",",
				"    },",
				"    \"en_US\": {",
				"        \"message\": \"This is an example message\",",
				"    }",
				"}",
				"",
				"async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {",
				"    message.send(getLang(\"message\"));",
				"}",
				"",
				"export default {",
				"    langData,",
				"    onCall",
				"}"
			],
			scope: "javascript"
		}),
		snippet({
			description: "XaviaBot Command Template with only one Function",
			prefix: "xpcof",
			body: [
				"export default function ({ message, args, getLang, extra, data, userPermissions, prefix }) {",
				"    message.send(\"Hello Xavia!\");",
				"}"
			],
			scope: "javascript"
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
