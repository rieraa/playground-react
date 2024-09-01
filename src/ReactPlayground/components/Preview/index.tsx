import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from 'ReactPlayground/PlaygroundContext'
import { compile } from './compiler'
import Editor from 'ReactPlayground/components/CodeEditor/Editor'
import styles from './index.module.scss'

function Preview() {
  const { files, selectedFileName } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')

  useEffect(() => {
    const compiledCode = compile(files)
    setCompiledCode(compiledCode)
  }, [selectedFileName])

  return (
    <div className={styles.preview}>
      {/* <iframe
          src={iframeUrl}
          style={{
            width: '100%',
            height: '100%',
            padding: 0,
            border: 'none',
          }}
        /> */}
      <Editor
        file={{
          name: 'dist.js',
          value: compiledCode,
          language: 'javascript',
        }}
      />
    </div>
  )
}

export default Preview
