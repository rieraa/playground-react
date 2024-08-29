import React from 'react'

// 通过字符串的方式引入iframe.html
import iframeRaw from '../public/iframe.html?raw'

const iframeUrl = URL.createObjectURL(
  new Blob([iframeRaw], { type: 'text/html' })
)

const Preview: React.FC = () => {
  return (
    <>
      <div>字符串引入</div>
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
      <div>文件引入</div>
      <iframe
        src='/iframe.html'
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
    </>
  )
}

export default Preview
