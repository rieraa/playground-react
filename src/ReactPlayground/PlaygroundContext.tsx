import { createContext, PropsWithChildren, useState } from "react";
import { fileName2Language } from "./utils";
import { Files, initFiles } from "./files";

// 全局上下文类型定义
export interface PlaygroundContext {
	files: Files; // 文件列表
	selectedFileName: string; // 当前选中的文件名
	setSelectedFileName: (fileName: string) => void;
	setFiles: (files: Files) => void;
	addFile: (fileName: string) => void;
	removeFile: (fileName: string) => void;
	updateFileName: (oldFieldName: string, newFieldName: string) => void;
}
// 创建全局上下文
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
		const fn = name.split(".").shift();
		files[name] = {
			name,
			value: `function ${fn}() {
  return (
    <div>
      ${fn}
    </div>
  );
}
export default ${fn};`,
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
		// 修改后的新文件列表
		const newFiles = { ...files };
		delete newFiles[oldFieldName];
		// 旧文件内容
		const oldFile = files[oldFieldName];
		const newFile = {
			[newFieldName]: {
				...oldFile,
				name: newFieldName,
				language: fileName2Language(newFieldName),
			},
		};

		const entries = Object.entries(newFiles);
		const oldEntries = Object.entries(files);
		const index = oldEntries.findIndex(([key]) => {
			return key === oldFieldName;
		});

		const newEntries = [
			...entries.slice(0, index),
			[newFieldName, newFile[newFieldName]],
			...entries.slice(index),
		];
		setSelectedFileName(newFieldName);
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
