import axios from "axios";

const { VITE_TARGET } = import.meta.env;

import { axiosInstance } from "../shared/axiosInstance";

export class BucketApi {


  //!Получение корзины юзера
  static async getUserBucket(id) {
    const { data } = await axiosInstance.get(`/bucket/${id}`);
    return data;
  }

  //!Добавить 
  static async addItem(inputs) {
    const { data } = await axiosInstance.post(`/bucket/add`, inputs);
    return data;
  }


  //!Удаление 1 товра
  static async delete(id) {
    const { data } = await axiosInstance.delete(`/bucket/${id}`);
    return data;
  }

//!Очистка всей корзины
    static async deleteAll(id) {
    const { data } = await axiosInstance.delete(`/bucket/all/${id}`);
    return data;
  }

}
