import React, { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import { compile } from "./compile.ts";
import styles from "./index.module.scss";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "ReactPlayground/files.ts";
import Editor from "ReactPlayground/components/CodeEditor/Editor";
import PreviewTab from "ReactPlayground/components/Preview/PreviewTab.tsx";

function Iframe() {
  const [iframeUrl, setIframeUrl] = useState("");
  const { files, selectedFileName } = useContext(PlaygroundContext);
  const [entryCompiledCode, setEntryCompiledCode] = useState("");

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, entryCompiledCode]);

  useEffect(() => {
    const compiledCode = compile(files);
    setEntryCompiledCode(compiledCode);
  }, [files]);

  const getIframeUrl = () => {
    const updatedIframe = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${entryCompiledCode}</script>`,
      );

    return URL.createObjectURL(
      new Blob([updatedIframe], { type: "text/html" }),
    );
  };

  return <iframe src={iframeUrl} className={styles.codeIframe} />;
}

// function CompiledCodePreview() {
//   const { files, selectedFileName } = useContext(PlaygroundContext);
//
//   // 当前选中文件
//   const [currentFile, setCurrentFile] = useState(files[selectedFileName]);
//   useEffect(() => {
//     setCurrentFile(files[selectedFileName]);
//   }, [files[selectedFileName].compiledCode]);
//   return (
//     <Editor
//       style={{
//         width: "100%",
//         height: "50%",
//         border: "none",
//       }}
//       file={currentFile}
//       isReadonly={true}
//     ></Editor>
//   );
// }

export default function Preview() {
  type ComponentMapType = {
    [key: string]: React.ReactNode;
  };
  const componentsMap: ComponentMapType = {
    // COMPILE: <CompiledCodePreview />,
    PREVIEW: <Iframe />,
  };
  const [selectedMode, setSelectedMode] = useState("PREVIEW");
  const modes = ["PREVIEW"];
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
