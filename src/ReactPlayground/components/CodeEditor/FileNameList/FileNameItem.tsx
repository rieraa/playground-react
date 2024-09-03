import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface FileNameItemProps {
  tab: string;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onEditComplete: (name: string) => void;
}

const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { tab, active, onClick, onEditComplete } = props;
  // 编辑状态
  const [editState, setEditState] = useState<boolean>(false);
  // 文件名
  const [fileName, setFileName] = useState<string>(tab);
  // 输入框
  const inputRef = useRef<HTMLInputElement>(null);
  const editClick = () => {
    setEditState(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
  });

  const editComplete = () => {
    setEditState(false);
    onEditComplete(fileName);
  };
  return (
    <div
      onClick={onClick}
      className={`${styles.tab} ${active ? styles.active : ""}`}
    >
      {editState ? (
        <input
          value={fileName}
          ref={inputRef}
          onChange={(e) => setFileName(e.target.value)}
          onBlur={editComplete}
        />
      ) : (
        <span onDoubleClick={editClick}>{fileName}</span>
      )}
    </div>
  );
};

export default FileNameItem;
