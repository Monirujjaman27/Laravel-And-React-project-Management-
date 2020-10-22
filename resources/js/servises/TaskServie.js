import Axios from "axios";
import { PUBLIC_URL } from "./Constant";

/**
 * store new task
 * 
 * @param {request data} data 
 */


export const TaskStore = async(data) => {
    return await Axios.post(`${PUBLIC_URL}api/task`, data).then((res) => {
        return res.data;
      });
};

/**
 * store update task
 * 
 * @param {id} data 
 */


export const TaskUpdate = async(id, data) => {
    return await Axios.put(`${PUBLIC_URL}api/task/${id}`, data).then((res) => {
        return res.data;
      });
};

export const DelTask = async(id) => {
    return await Axios.delete(`${PUBLIC_URL}api/task/${id}`).then((res) => {
        return res.data;
      });
};