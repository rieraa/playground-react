import Editor from './Editor'
import FileNameList from './FileNameList'

function CodeEditor() {
  const file = {
    name: 'app.tsx',
    value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
    language: 'typescript',
  }
  function onEditorChange() {
    console.log(...arguments)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  )
}

export default CodeEditor
