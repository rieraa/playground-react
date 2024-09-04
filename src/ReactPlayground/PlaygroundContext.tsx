import { createContext, PropsWithChildren, useState } from "react";
import { fileName2Language } from "./utils";
import { initFiles } from "./files";

export interface File {
  name: string;
  value: string;
  language: string;
  compiledCode?: string;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContext {
  files: Files; // 文件列表
  selectedFileName: string; // 当前选中的文件名
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "main.tsx",
} as PlaygroundContext);

/**
 * 共享当前文件列表状态
 *
 * @param props
 * @returns
 */
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState("main.tsx");

  const addFile = (name: string) => {
    files[name] = {
      name,
      value: "",
      language: `${fileName2Language(name)}`,
    };
    setFiles({ ...files });
  };

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({ ...files });
  };
  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || !newFieldName) return;
    debugger;
    // 修改后的新文件列表
    const newFiles = { ...files };
    delete newFiles[oldFieldName];
    // 旧文件内容
    const oldFile = files[oldFieldName];
    const newFile = {
      [newFieldName]: {
        name: newFieldName,
        value: oldFile.value,
        language: `${fileName2Language(newFieldName)}`,
      },
    };

    const entries = Object.entries(newFiles);
    const oldEntries = Object.entries(files);
    console.log(
      "🥘 ~ file:PlaygroundContext.tsx method:updateFileName line:73 param:entries -----",
      entries,
    );
    const index = oldEntries.findIndex(([key]) => {
      console.log(
        "🥘 ~ file:PlaygroundContext.tsx method: line:77 param:key -----",
        key,
      );
      return key === oldFieldName;
    });
    console.log(
      "🥘 ~ file:PlaygroundContext.tsx method:updateFileName line:74 param:index -----",
      index,
    );

    const newEntries = [
      ...entries.slice(0, index),
      [newFieldName, newFile[newFieldName]],
      ...entries.slice(index),
    ];

    setFiles(Object.fromEntries(newEntries));
  };

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
  );
};
