import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from 'ReactPlayground/PlaygroundContext'
import { compile } from './compile.ts'
import styles from './index.module.scss'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from 'ReactPlayground/files.ts'

function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')

  const [iframeUrl, setIframeUrl] = useState('')

  // useEffect(() => {
  //   setCompiledCode(files[selectedFileName].value)
  // }, [files, selectedFileName])
  const getIframeUrl = () => {
    const updatedIframe = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      )

    return URL.createObjectURL(new Blob([updatedIframe], { type: 'text/html' }))
  }
  useEffect(() => {
    const compiledCode = compile(files)
    setCompiledCode(compiledCode)
  }, [files])

  //
  useEffect(() => {
    setIframeUrl(getIframeUrl())
    console.log('🚀 ~ file: index.tsx:14 ~ Preview ~ iframeUrl:', iframeUrl)
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  return (
    <div className={styles.preview}>
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </div>
  )
}

export default Preview
