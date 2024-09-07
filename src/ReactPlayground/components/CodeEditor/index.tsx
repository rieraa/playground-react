import { useContext, useState } from "react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "@/ReactPlayground/PlaygroundContext";
import styles from "./index.module.scss";
import { debounce } from "lodash-es";

export default function CodeEditor() {
	// 获取文件列表信息
	const { files, selectedFileName, setFiles } = useContext(PlaygroundContext);
	// 被选中的文件信息
	const file = files[selectedFileName];

	// 编辑器修改回调
	const onEditorChange = (value: string | undefined) => {
		if (value !== undefined) {
			// 添加检查以确保 value 是字符串
			files[selectedFileName].value = value;
			setFiles({ ...files });
		}
	};

	return (
		<div className={styles.codeEditor}>
			<FileNameList />

			<Editor
				file={file}
				onChange={debounce(onEditorChange, 1000)}
			/>
		</div>
	);
}
