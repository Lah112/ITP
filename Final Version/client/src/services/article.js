import axios from "axios";
import backendUrl from "../backendUrl";
import { token } from "./auth";

const baseUrl = `${backendUrl}/api/articles`;

const setConfig = () => {
  return {
    headers: { "x-auth-token": token },
  };
};

const getAllArticles = async () => {
  console.log("get all article");
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getArticleById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, setConfig());
  return response.data;
};

const addNewArticle = async (articleObj) => {
  const response = await axios.post(`${baseUrl}`, articleObj, setConfig());
  return response.data;
};

const updateArticle = async (articleObj, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, articleObj, setConfig());
  return response.data;
};

const deleteArticle = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig());
  return response.data;
};

const getArticleReportDetails = async () => {
  const response = await axios.get(`${baseUrl}/report/get`, setConfig());
  return response.data;
};

const articleService = {
  getAllArticles,
  getArticleById,
  addNewArticle,
  updateArticle,
  deleteArticle,
  getArticleReportDetails,
};

export default articleService;
