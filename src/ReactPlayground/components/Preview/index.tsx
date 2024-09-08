import React, { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import { compile } from "./compile.ts";
import styles from "./index.module.scss";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "ReactPlayground/files.ts";
import PreviewTab from "ReactPlayground/components/Preview/PreviewTab.tsx";
import PreviewEditor from "./Editor/PreviewEditor.tsx";
import { Message } from "../Message/index.tsx";

interface MessageData {
	data: {
		type: string;
		message: string;
	};
}

function Iframe() {
	const { files } = useContext(PlaygroundContext);
	const entryCompiledCode = compile(files);

	const [error, setError] = useState("");

	const handleMessage = (msg: MessageData) => {
		const { type, message } = msg.data;
		if (type === "ERROR") {
			setError(message);
		}
	};

	useEffect(() => {
		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

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
		<div className={styles.container}>
			<iframe
				src={iframeUrl}
				className={styles.codeIframe}
			/>
			<Message
				type='error'
				content={error}
			/>
		</div>
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
