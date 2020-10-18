import Axios from "axios";
import { PUBLIC_URL } from "./Constant";

export const TaskStore = async(data) => {
    return await Axios.post(`${PUBLIC_URL}api/task`, data).then((res) => {
        return res.data;
      });
};