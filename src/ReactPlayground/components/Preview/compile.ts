import { transform } from "@babel/standalone";
import { File, Files } from "../../PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../files";
import { PluginObj } from "@babel/core";

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code;
  const regexReact = /^import\s+React\s+from\s+['"]react['"];?$/m;
  if (
    (filename.endsWith(".jsx") || filename.endsWith(".tsx")) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};

export const babelTransform = (
  filename: string,
  code: string,
  files: Files,
) => {
  const _code = beforeTransformCode(filename, code);
  // main.tsx =>
  let result = "";
  try {
    // todo 深度优先遍历 二叉树也回顾一下
    result = transform(code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(files, filename)],
      retainLines: true,
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }

  // 1.main

  return result;
};

/**
 * 自定义插件自定义导入文件来源
 * @param files
 */
function customResolver(files: Files, filename: string): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        debugger;
        const modulePath = path.node.source.value;

        if (modulePath.startsWith(".")) {
          const moduleFile = getModuleFile(files, modulePath);

          if (!moduleFile) return;
          if (moduleFile.name.endsWith(".css")) {
            path.node.source.value = css2Js(moduleFile);
          } else if (moduleFile.name.endsWith(".json")) {
            path.node.source.value = json2Js(moduleFile);
          } else {
            // tsx文件存在嵌套引用
            path.node.source.value = URL.createObjectURL(
              new Blob(
                [babelTransform(moduleFile.name, moduleFile.value, files)],
                {
                  type: "application/javascript",
                },
              ),
            );
            // files[moduleFile.name].compiledCode = babelTransform(
            //   moduleFile.name,
            //   moduleFile.value,
            //   files,
            // );
            console.log(
              "🥘 ~ file:compile.ts method:ImportDeclaration line:76 param:filename -----",
              filename,
            );
            console.log(
              "🥘 ~ file:compile.ts method:ImportDeclaration line:72 param:moduleFile.name -----",
              moduleFile.name,
            );
            // console.log(
            //   "🥘 ~ file:compile.ts method:ImportDeclaration line:73 param:files[moduleFile.name].compiledCode -----",
            //   files[moduleFile.name].compiledCode,
            // );
          }
        }
      },
    },
  };
}
const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split("./").pop() || "";
  if (!moduleName.includes(".")) {
    moduleName =
      Object.keys(files).find((key) => {
        const baseName = key.split(".").shift();
        return (
          baseName === moduleName &&
          (key.endsWith(".ts") ||
            key.endsWith(".tsx") ||
            key.endsWith(".js") ||
            key.endsWith(".jsx"))
        );
      }) || moduleName;
  }

  return files[moduleName];
};

const css2Js = (file: File) => {
  const randomId = new Date().getTime();
  const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)


    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.appendChild(styles)
})()
    `;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" }),
  );
};

const json2Js = (file: File) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" }),
  );
};

export const compile = (files: Files) => {
  // 2.获取入口文件
  const main = files[ENTRY_FILE_NAME];
  // 3.入口代码转译
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
