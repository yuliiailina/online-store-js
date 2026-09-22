import axios from "axios";
import { API_ENDPOINT, BASE_URL, PER_PAGE } from "./constants";

axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
    const {data} = await axios (API_ENDPOINT.CATEGORIES);
    return data;
}

export async function getProducts(currentPage) {
    const skip = (currentPage - 1) * PER_PAGE;
    const {data} = await axios (API_ENDPOINT.PRODUCTS, {params: {
        skip,
        limit: PER_PAGE
    }});
    return data;
}

export async function getProductById(id) {
    const {data} = await axios (`${API_ENDPOINT.PRODUCT_BY_ID}${id}`);
    return data;
}

export async function getProductByCategory(category, currentPage) {
    const skip = (currentPage - 1) * PER_PAGE;
    const {data} = await axios (`${API_ENDPOINT.PRODUCT_BY_CATEGORY}${category}`, {params: {
        skip,
        limit: PER_PAGE
    }});
    return data;
}

export async function getProductByQuery(query, currentPage) {
    const skip = (currentPage - 1) * PER_PAGE;
    const {data} = await axios (`${API_ENDPOINT.PRODUCT_BY_QUERY}${query}`, {params: {
        skip,
        limit: PER_PAGE
    }});
    return data;
}