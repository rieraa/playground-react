import React, { useContext, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import { compile } from "./compile.ts";
import styles from "./index.module.scss";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "ReactPlayground/files.ts";
import PreviewTab from "ReactPlayground/components/Preview/PreviewTab.tsx";
import Editor from "ReactPlayground/components/CodeEditor/Editor";
import PreviewEditor from "./Editor/PreviewEditor.tsx";

function Iframe() {
	const { files } = useContext(PlaygroundContext);
	const entryCompiledCode = compile(files);

	const getIframeUrl = () => {
		const updatedIframe = iframeRaw
			.replace(
				'<script type="importmap"></script>',
				`<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
			)
			.replace(
				'<script type="module" id="appSrc"></script>',
				`<script type="module" id="appSrc">${entryCompiledCode}</script>`
			);

		return URL.createObjectURL(
			new Blob([updatedIframe], { type: "text/html" })
		);
	};

	const iframeUrl = getIframeUrl();

	return (
		<iframe
			src={iframeUrl}
			className={styles.codeIframe}
		/>
	);
}

export default function Preview() {
	type ComponentMapType = {
		[key: string]: React.ReactNode;
	};
	const componentsMap: ComponentMapType = {
		PREVIEW: <Iframe />,
		COMPILE: <PreviewEditor />,
	};
	const [selectedMode, setSelectedMode] = useState("PREVIEW");
	const modes = ["PREVIEW", "COMPILE"];
	return (
		<div className={styles.preview}>
			<PreviewTab
				modes={modes}
				selectedMode={selectedMode}
				onChange={(mode) => setSelectedMode(mode)}
			/>
			{componentsMap[selectedMode]}
		</div>
	);
}
