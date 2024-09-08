import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./index.module.scss";
import close from "@/assets/close.svg";

interface FileNameItemProps {
	tab: string;
	active: boolean;
	create: boolean;
	index: number;
	isReadOnly: boolean;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	onEditComplete: (newFileName: string, oldFileName: string) => void;
	onRemove: () => void;
}

const FileNameItem: React.FC<FileNameItemProps> = ({
	tab,
	active,
	onClick,
	onEditComplete,
	create,
	onRemove,
	isReadOnly,
}) => {
	const [editState, setEditState] = useState<boolean>(create); // 编辑状态
	const [fileName, setFileName] = useState(tab); // 文件名
	const inputRef = useRef<HTMLInputElement>(null); // 输入框引用
	const tabRef = useRef<HTMLDivElement>(null); // tab引用

	// 双击进入编辑模式
	const handleDoubleClick = useCallback(() => {
		if (isReadOnly) return;
		setEditState(true);
	}, [isReadOnly]);

	// 退出编辑模式并触发回调
	const editComplete = useCallback(() => {
		setEditState(false);
		onEditComplete(tab, fileName);
	}, [fileName, onEditComplete, tab]);

	// 当进入编辑模式时，聚焦到输入框
	useEffect(() => {
		inputRef.current?.focus();
	}, [editState]);

	// 新增文件聚焦
	useEffect(() => {
		if (create) {
			inputRef.current?.focus();
		}
	}, [create]);

	return (
		<div
			ref={tabRef}
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
				<>
					<span
						onClick={onClick}
						onDoubleClick={handleDoubleClick}
					>
						{fileName}
					</span>
					{!isReadOnly ? (
						<img
							onClick={onRemove}
							className={styles.close}
							src={close}
							alt=''
						/>
					) : (
						""
					)}
				</>
			)}
		</div>
	);
};

export default FileNameItem;
