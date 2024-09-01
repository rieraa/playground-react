import MonacoEditor, { OnMount, EditorProps } from '@monaco-editor/react'
import { createATA } from './ata'
import { editor } from 'monaco-editor'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 设置TypeScript编译器选项
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve, // 保留JSX语法
      esModuleInterop: true, // 启用ES模块互操作性
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      )
    })

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue())
    })

    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height='100%'
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
      }}
    />
  )
}
