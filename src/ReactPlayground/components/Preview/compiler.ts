import { transform } from '@babel/standalone'
import { Files } from '../../PlaygroundContext'
import { ENTRY_FILE_NAME } from '../../files'
import { PluginObj } from '@babel/core'

export const babelTransform = (filename: string, code: string, files: Files) => {
  let result = ''
  try {
    result = transform(code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      retainLines: true
    }).code!
  } catch (e) {
    console.error('编译出错', e);
  }
  return result
}

function customResolver(files: Files): PluginObj {
    return {
      visitor: {
        ImportDeclaration(path) {
            const modulePath = path.node.source.value
            if(modulePath.startsWith('.')) {
                const moduleFile = getModuleFile(files, modulePath)
            }
        },
      },
    }
}

const getModuleFile = (files: Files, modulePath: string) => {
    // 获取文件名
    let moduleName = modulePath.split('./').pop() || ''
    // 判断是否包含后缀
    if (!moduleName.includes('.')) {
        const realModuleName = Object.keys(files).filter(key => {
            console.log("🚀 ~ file: compiler.ts:48 ~ realModuleName ~ key:", key)

            return key.endsWith('.ts') 
                || key.endsWith('.tsx') 
                || key.endsWith('.js')
                || key.endsWith('.jsx')
        }).find((key) => {
            return key.split('.').includes(moduleName)
        })


        if (realModuleName) {
            moduleName = realModuleName
        }
      }
    return files[moduleName]
}


export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}
