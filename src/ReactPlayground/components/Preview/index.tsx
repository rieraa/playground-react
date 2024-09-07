import React, { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import { compile } from "./compile.ts";
import styles from "./index.module.scss";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "ReactPlayground/files.ts";
import PreviewTab from "ReactPlayground/components/Preview/PreviewTab.tsx";
import Editor from "ReactPlayground/components/CodeEditor/Editor";

function Iframe() {
  const { files } = useContext(PlaygroundContext);
  const [entryCompiledCode, setEntryCompiledCode] = useState(compile(files));
  useEffect(() => {
    setIframeUrl(getIframeUrl()); // 然后设置新 URL
  }, [files[IMPORT_MAP_FILE_NAME].value, files]);

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

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  return <iframe src={iframeUrl} className={styles.codeIframe} />;
}

function CompiledCodePreview() {
  const { files, selectedFileName } = useContext(PlaygroundContext);

  // 当前选中文件
  const [currentFile, setCurrentFile] = useState(files[selectedFileName]);
  useEffect(() => {
    setCurrentFile(files[selectedFileName]);
  }, [files, selectedFileName]);
  return (
    <Editor file={currentFile} customOptions={{ readOnly: true }}></Editor>
  );
}

export default function Preview() {
  type ComponentMapType = {
    [key: string]: React.ReactNode;
  };
  const componentsMap: ComponentMapType = {
    PREVIEW: <Iframe />,
    COMPILE: <CompiledCodePreview />,
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
