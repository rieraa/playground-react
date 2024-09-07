import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./index.module.scss";

interface FileNameItemProps {
  tab: string;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onEditComplete: (name: string) => void;
}

const FileNameItem: React.FC<FileNameItemProps> = ({
  tab,
  active,
  onClick,
  onEditComplete,
}) => {
  const [editState, setEditState] = useState(false); // 编辑状态
  const [fileName, setFileName] = useState(tab); // 文件名
  const inputRef = useRef<HTMLInputElement>(null); // 输入框引用
  const tabRef = useRef<HTMLDivElement>(null); // tab引用

  // 双击进入编辑模式
  const handleDoubleClick = useCallback(() => {
    setEditState(true);
  }, []);

  // 退出编辑模式并触发回调
  const editComplete = useCallback(() => {
    setEditState(false);
    onEditComplete(fileName);
  }, [fileName, onEditComplete]);

  // 当进入编辑模式时，聚焦到输入框
  useEffect(() => {
    inputRef.current?.focus();
  }, [editState]);

  return (
    <div
      ref={tabRef}
      onClick={onClick}
      className={`${styles.tab} ${active ? styles.active : ""}`}
    >
      {editState ? (
        <input
          ref={inputRef}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          onBlur={editComplete}
          className={styles.input}
          // 使用容器宽度设置输入框宽度
          style={{ width: tabRef.current?.offsetWidth || "auto" }}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{fileName}</span>
      )}
    </div>
  );
};

export default FileNameItem;
