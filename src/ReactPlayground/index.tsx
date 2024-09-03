import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from './components/Header'
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'
import style from './index.module.scss'

export default function ReactPlayground() {
  return (
    <div className={style.container}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
