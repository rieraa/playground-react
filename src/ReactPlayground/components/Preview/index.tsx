import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "ReactPlayground/PlaygroundContext";
import { compile } from "./compile.ts";
import styles from "./index.module.scss";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "ReactPlayground/files.ts";

function Preview() {
  const { files, selectedFileName } = useContext(PlaygroundContext);
  const [entryCompiledCode, setEntryCompiledCode] = useState("");
  const [compiledCode, setCompiledCode] = useState(
    files[selectedFileName].compiledCode,
  );

  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    setCompiledCode(files[selectedFileName].compiledCode);
  }, [selectedFileName]);

  // useEffect(() => {
  //   setCompiledCode(files[selectedFileName].value)
  // }, [files, selectedFileName])
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
  useEffect(() => {
    const compiledCode = compile(files);
    setEntryCompiledCode(compiledCode);
  }, [files]);

  //
  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, entryCompiledCode]);

  return (
    <div className={styles.preview}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "50%",
          border: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "50%",
          border: "none",
        }}
      >
        <div>{compiledCode}</div>
      </div>
    </div>
  );
}

export default Preview;
