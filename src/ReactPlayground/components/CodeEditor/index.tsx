import { useContext, useEffect, useState } from 'react'
import Editor from './Editor'
import FileNameList from './FileNameList'
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext'
import styles from './index.module.scss'
import { debounce } from 'lodash-es'

export default function CodeEditor() {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext)
  const [file, setFile] = useState(files[selectedFileName])
  const onEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      // 添加检查以确保 value 是字符串
      files[selectedFileName].value = value
      setFiles({ ...files })
    }
  }

  useEffect(() => {
    setFile(files[selectedFileName])
  }, [files, selectedFileName])

  return (
    <div className={styles.codeEditor}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 1000)} />
    </div>
  )
}
