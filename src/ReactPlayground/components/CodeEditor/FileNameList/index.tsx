import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import FileNameItem from "./FileNameItem";
import styles from "./index.module.scss";
function FileNameList() {
  const [tabs, setTabs] = useState<string[]>([""]);
  const { files, selectedFileName, setSelectedFileName, updateFileName } =
    useContext(PlaygroundContext);

  const onEditComplete = (name: string) => {
    updateFileName(selectedFileName, name);
  };

  // 监听files的变化，更新tabs
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab: string) => (
        <FileNameItem
          tab={tab}
          active={tab === selectedFileName}
          onClick={() => setSelectedFileName(tab)}
          onEditComplete={onEditComplete}
          key={tab}
        />
      ))}
    </div>
  );
}

export default FileNameList;
