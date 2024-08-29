import Editor from './Editor'
import FileNameList from './FileNameList'

function CodeEditor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor />
    </div>
  )
}

export default CodeEditor
