  
import Axios from "axios";
import { PUBLIC_URL } from "./Constant";
export const ProjectStore = async(data) => {
    return await Axios.post(`${PUBLIC_URL}api/project`, data).then((res) => {
        return res.data;
      });
};