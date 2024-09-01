import { useContext } from 'react'
import Editor from './Editor'
import FileNameList from './FileNameList'
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import styles from './index.module.scss'
import { debounce } from 'lodash-es'
function CodeEditor() {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext)
  const file = files[selectedFileName]
  function onEditorChange(value: string) {
    files[selectedFileName].value = value
    setFiles(files)
  }
  return (
    <div className={styles.codeEditor}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 1000)} />
    </div>
  )
}

export default CodeEditor
