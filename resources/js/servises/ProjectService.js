  
import Axios from "axios";
import { PUBLIC_URL } from "./Constant";
export const ProjectStore = async(data) => {
    return await Axios.post(`${PUBLIC_URL}api/project`, data).then((res) => {
        return res.data;
      });
};
export const ProjectUpdate = async(id, data) => {
    return await Axios.put(`${PUBLIC_URL}api/project/${id}`, data).then((res) => {
        return res.data;
      });
};


export const DelProject = async(id) => {
    return await Axios.delete(`${PUBLIC_URL}api/project/${id}`).then((res) => {
        return res.data;
      });
};