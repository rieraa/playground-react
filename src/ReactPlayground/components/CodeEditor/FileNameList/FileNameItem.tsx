import React from 'react'
import styles from './index.module.scss'

interface FileNameItemProps {
  tab: string
  active: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

function FileNameItem({ tab, active, onClick }: FileNameItemProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles.tab} ${active ? styles.active : ''}`}
    >
      {tab}
    </div>
  )
}

export default FileNameItem
