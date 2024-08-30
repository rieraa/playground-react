import { useContext } from 'react'
import { PlaygroundContext } from 'ReactPlayground/PlaygroundContext'
function FileNameList() {
  const context = useContext(PlaygroundContext)

  console.log('🚀 ~ file: index.tsx:6 ~ FileNameList ~ context:', context)

  return <div>FileNameList</div>
}

export default FileNameList
