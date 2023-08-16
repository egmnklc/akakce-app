import axios, { AxiosResponse } from "axios";
import { Product } from "../layout/models/product";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (err) {
    console.log(err);
    return await Promise.reject(err);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Products = {
  list: () => requests.get<Product[]>("/products"),
  details: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: Product) => requests.post<void>("/products", product),
  update: (product: Product) =>
    requests.put<void>(`/products/${product.id}`, product),
  delete: (id: string) => requests.delete<void>(`/products/${id}`),
};

const agent = {
  Products,
};

export default agent;
