import React, { createContext, PropsWithChildren, useState } from 'react'
import { fileName2Language } from './fileName2Language'

export interface File {
  name: string
  value: string
  language: string
}

export interface Files {
  [key: string]: File
}

export interface PlaygroundContext {
  files: Files // 文件列表
  selectedFileName: string // 当前选中的文件名
  setSelectedFileName: (fileName: string) => void
  setFiles: (files: Files) => void
  addFile: (fileName: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext)

/**
 * 共享当前文件列表状态
 *
 * @param props
 * @returns
 */
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [files, setFiles] = useState<Files>({})
  const [selectedFileName, setSelectedFileName] = useState('App.tsx')

  const addFile = (name: string) => {
    files[name] = {
      name,
      value: '',
      language: `${fileName2Language(name)}`,
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return

    const { [oldFieldName]: oldFile, ...restFiles } = files
    const newFile = {
      [newFieldName]: {
        name: newFieldName,
        value: oldFile.value,
        language: `${fileName2Language(newFieldName)}`,
      },
    }
    setFiles({ ...newFile, ...restFiles })
  }

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
