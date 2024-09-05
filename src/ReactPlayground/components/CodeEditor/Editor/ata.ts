import { setupTypeAcquisition } from "@typescript/ata";
import typescript from "typescript";

function createATA(onDownloadFile: (code: string, path: string) => void) {
  // 创建ATA实例并配置
  const ata = setupTypeAcquisition({
    projectName: "my-ata", // 设置项目名称为'my-ata'
    typescript: typescript, // 使用导入的typescript模块
    logger: console, // 使用console作为日志记录器
    delegate: {
      // 配置委托函数
      receivedFile: (code, path) => {
        // console.log('自动下载的包', path); // 输出日志
        onDownloadFile(code, path); // 调用传入的onDownloadFile函数
      },
    },
  });

  return ata; // 返回ATA实例
}

export { createATA };
