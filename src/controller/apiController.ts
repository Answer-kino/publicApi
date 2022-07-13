import { StatusCodes } from "http-status-codes";
import ogr2ogr from "ogr2ogr";

import { Config } from "src/config/config";
import ApiAxios from "src/utility/customAxios";
import ApiResponse from "src/utility/apiResponse";
import ApiError from "src/utility/apiError";
import IController from "src/interface/IController";
import { shpFileDelete } from "src/middleware/uploadHandler";

export default class apiController {
  static nsdi: IController = async (req, res) => {
    try {
      const { data: tableData } = await ApiAxios.get(
        `http://www.nsdi.go.kr/lxportal/zcms/nsdi/platform/openapi.html?apitype=dataList&authkey=${Config.apiKey.nsdi}`
      );

      const { data: columnData } = await ApiAxios.get(
        `http://www.nsdi.go.kr/lxportal/zcms/nsdi/platform/openapi.html?apitype=columnList&datasets=12676&authkey=${Config.apiKey.nsdi}`
      );
      console.log(tableData);
      console.log(columnData);
      ApiResponse.result(res, StatusCodes.OK, columnData);
    } catch (error: any) {
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };

  static shp2GeoJson: IController = async (req, res) => {
    try {
      // multer 로 업로드한 파일
      const { shpFile }: any = req.files;

      // shp convert GeoJson
      const data = await ogr2ogr(shpFile[0].path);

      // convert 후 업로드한 파일 삭제
      // shpFileDelete(shpFile[0].filename);
      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      console.error(error);
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
