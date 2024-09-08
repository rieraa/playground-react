import { useContext, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import FileNameItem from "./FileNameItem";
import styles from "./index.module.scss";
function FileNameList() {
	const {
		files,
		selectedFileName,
		setSelectedFileName,
		updateFileName,
		addFile,
	} = useContext(PlaygroundContext);
	const tabs: string[] = Object.keys(files);
	const [creat, setCreate] = useState(false);
	// 编辑结束回调
	const onEditComplete = (oldFieldName: string, newFileName: string) => {
		updateFileName(oldFieldName, newFileName);
		setCreate(false);
	};

	const addTab = () => {
		const newFileName = "Comp" + Math.random().toString().slice(2, 5) + ".tsx";
		addFile(newFileName);
		setSelectedFileName(newFileName);
		setCreate(true);
	};

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
