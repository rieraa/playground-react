import { useContext, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import FileNameItem from "./FileNameItem";
import styles from "./index.module.scss";
import {
	APP_COMPONENT_FILE_NAME,
	ENTRY_FILE_NAME,
	IMPORT_MAP_FILE_NAME,
} from "@/ReactPlayground/files";
function FileNameList() {
	const {
		files,
		selectedFileName,
		setSelectedFileName,
		updateFileName,
		addFile,
		removeFile,
	} = useContext(PlaygroundContext);
	const tabs: string[] = Object.keys(files);
	const [creat, setCreate] = useState(false);
	// 编辑结束回调
	const onEditComplete = (oldFieldName: string, newFileName: string) => {
		updateFileName(oldFieldName, newFileName);
		setCreate(false);
	};
	// 新增文件回调
	const addTab = () => {
		const newFileName = "Comp" + Math.random().toString().slice(2, 5) + ".tsx";
		addFile(newFileName);
		setSelectedFileName(newFileName);
		setCreate(true);
	};

	// 删除文件
	const removeTab = (fileNmame: string) => {
		removeFile(fileNmame);
		setSelectedFileName(ENTRY_FILE_NAME);
	};

	// 只读文件
	const readonlyFileNames = [
		ENTRY_FILE_NAME,
		IMPORT_MAP_FILE_NAME,
		APP_COMPONENT_FILE_NAME,
	];

	return (
		<div className={styles.tabs}>
			{tabs.map((tab: string, index: number, arr: string[]) => (
				<FileNameItem
					tab={tab}
					active={tab === selectedFileName}
					onClick={() => setSelectedFileName(tab)}
					onEditComplete={onEditComplete}
					create={creat && index === arr.length - 1}
					index={index}
					isReadOnly={readonlyFileNames.includes(tab)}
					onRemove={() => removeTab(tab)}
					key={tab}
				/>
			))}
			<div
				className={styles.addFile}
				onClick={addTab}
			>
				+
			</div>
		</div>
	);
}

export default FileNameList;
