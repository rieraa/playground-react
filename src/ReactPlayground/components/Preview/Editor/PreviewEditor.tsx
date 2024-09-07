import { PlaygroundContext } from "@/ReactPlayground/PlaygroundContext";
import MonacoEditor from "@monaco-editor/react";
import { useContext } from "react";

export default function Editor() {
	const { files, selectedFileName } = useContext(PlaygroundContext);

	// 当前选中文件
	const currentFile = files[selectedFileName];

	return (
		<MonacoEditor
			height='100%'
			path={`preview-${currentFile.name}`}
			language={currentFile.language}
			value={currentFile.compiledCode}
			options={{
				minimap: { enabled: false },
				fontSize: 14,
				scrollBeyondLastLine: false,
				scrollbar: {
					verticalScrollbarSize: 6,
					horizontalScrollbarSize: 6,
				},
				readOnly: true,
			}}
		/>
	);
}
