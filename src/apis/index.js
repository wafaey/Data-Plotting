import Request from "./Config";
import Global from "../constants/Global";

const Plotter = {
  getAvailableColumns: () => {
    const subUrl = Global.URL + `/columns`;
    return Request.get(subUrl, {});
  },
  getColumnsDataValues: (data) => {
    const subUrl = Global.URL + "/data";
    return Request.post(subUrl, data);
  },
};
export default Plotter;
