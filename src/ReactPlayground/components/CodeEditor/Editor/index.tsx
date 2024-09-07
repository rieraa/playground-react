import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";
import { File as EditorFile } from "@/ReactPlayground/files.ts";

interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  customOptions?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, customOptions } = props;

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 设置TypeScript编译器选项
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // TODO 这里的配置不理解
      jsx: monaco.languages.typescript.JsxEmit.Preserve, // 保留JSX语法
      esModuleInterop: true, // 启用ES模块互操作性
    });

    // 格式化快捷键配置
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`,
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      onChange={onChange}
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...customOptions,
      }}
    />
  );
}
