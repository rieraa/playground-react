import MonacoEditor, { OnMount } from '@monaco-editor/react'

export default function Editor() {
  const code = `export default function App() {
    return <div>xxx</div>
}
    `

  const handleEditorMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })
  }

  return (
    <MonacoEditor
      height='100%'
      path={'rats.tsx'}
      language={'typescript'}
      onMount={handleEditorMount}
      value={code}
    />
  )
}
