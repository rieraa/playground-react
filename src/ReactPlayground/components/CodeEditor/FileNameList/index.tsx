import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from 'ReactPlayground/PlaygroundContext'
import FileNameItem from './FileNameItem'
import styles from './index.module.scss'
function FileNameList() {
  const [tabs, setTabs] = useState<string[]>([''])
  const { files, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext)

  // 监听files的变化，更新tabs
  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <div className={styles.tabs}>
      {tabs.map((tab: string) => (
        <FileNameItem
          tab={tab}
          active={tab === selectedFileName}
          onClick={() => setSelectedFileName(tab)}
          key={tab}
        />
      ))}
    </div>
  )
}

export default FileNameList
