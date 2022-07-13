import IController from "../interface/IController";
import ApiResponse from "src/utility/apiResponse";
import ApiError from "src/utility/apiError";
import { StatusCodes } from "http-status-codes";
import { Config } from "src/config/config";
import ApiAxios from "src/utility/customAxios";

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
}
