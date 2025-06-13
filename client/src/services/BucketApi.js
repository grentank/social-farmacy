import axios from "axios";

const { VITE_TARGET } = import.meta.env;

import { axiosInstance } from "../shared/axiosInstance";

export class BucketApi {
  static async getUserBucket(userId) {
    try {
      const { data } = await axiosInstance.get(`/bucket/${userId}`);
      return data;
    } catch (error) {
      console.error("Error getting user bucket:", error);
      throw error;
    }
  }

  static async addItem(inputs) {
    try {
      const { data } = await axiosInstance.post(`/bucket/add`, inputs);
      return data;
    } catch (error) {
      console.error("Error adding item to bucket:", error);
      throw error;
    }
  }

  static async delete(itemId) {
    try {
      const { data } = await axiosInstance.delete(`/bucket/${itemId}`);
      return data;
    } catch (error) {
      console.error("Error deleting item from bucket:", error);
      throw error;
    }
  }

  static async deleteAll(userId) {
    try {
      const { data } = await axiosInstance.delete(`/bucket/all/${userId}`);
      return data;
    } catch (error) {
      console.error("Error clearing bucket:", error);
      throw error;
    }
  }
}