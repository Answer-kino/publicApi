import multer, { FileFilterCallback } from "multer";
import { Config } from "src/config/config";
import { logger } from "src/config/logger";
import path from "path";
import { Request, Express } from "express";
import { existsSync, mkdirSync, unlinkSync } from "fs";

const maxSize: number = Number(Config.fileupload.maxsize);
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileMimeTypeFileter = (fieldname: string, mimetype: string) => {
  if (fieldname === "shpFile") {
    if (mimetype === "application/octet-stream") return true;
  }

  return false;
};

const shpFileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = Config.fileupload.shpFileDirname as string;
    mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const customFilename: string = file.originalname;

    cb(null, `${customFilename}`);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (fileMimeTypeFileter(file.fieldname, file.mimetype)) {
    cb(null, true);
  } else {
    logger.error(`[FILE_UPLOAD_ERROR] The file type does not mactch - [${file.mimetype}] ${file.originalname}`);

    cb(null, false);
  }
};

export const shpFile = multer({
  storage: shpFileStorage,
  limits: { fieldSize: maxSize },
  fileFilter
});

export const shpFileDelete = (saveName: string) => {
  if (existsSync(path.join(Config.fileupload.shpFileDirname + saveName))) {
    try {
      unlinkSync(path.join(Config.fileupload.shpFileDirname + saveName));
      logger.warn(`delete ${path.join(Config.fileupload.shpFileDirname + saveName)}`);
    } catch (error: any) {
      logger.error(
        `[${error.code},${error.errno}] ${error.syscall} command failed, This path is invaild path: ${error.path}`
      );
    }
  }
};
