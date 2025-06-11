import axios from "axios";

const { VITE_TARGET } = import.meta.env;

import { axiosInstance } from "../shared/axiosInstance";

export class ProductApi {
  static async getAll() {
    const { data } = await axiosInstance.get("/product");
    return data
  }

  static async getOne(id) {
    const { data } = await axiosInstance.get(`/product/${id}`);
    return data;
  }

  static async createProduct(inputs) {
    const { data } = await axiosInstance.post(`product`, inputs);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/product/${id}`);
    return data;
  }

  static async update(id, inputs) {
    const { data } = await axiosInstance.put(`/product/${id}`, inputs);
    return data;
  }
}
