import { config } from "dotenv";
config({ path: ".env.public" });

export const Config: any = {
  server: {
    host: process.env.SERVER_HOST,
    port: Number(process.env.SERVER_PORT),
    mode: process.env.NODE_MODE,
    modeDev: process.env.NODE_MODE_DEV,
    modePro: process.env.NODE_MODE_PRO,
    swagger: "on"
  },
  fileupload: {
    imgDirname: process.env.FILE_IMGDIR,
    formFileDirname: process.env.FILE_FORMFILEDIR,
    maxsize: process.env.FILE_MAXSIZE,
    description: process.env.FILE_MAXSIZE_DESC
  },
  db: [
    {
      name: process.env.DB_NAME!,
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASS!,
      database: process.env.DB_DATABASE!,
      connectionLimit: Number(process.env.DB_CONNECTIONLIMIT)
    }
  ],
  apiKey: {
    nsdi: process.env.NSDI
  }
};
