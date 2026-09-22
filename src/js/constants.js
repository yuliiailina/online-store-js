// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

export const BASE_URL = 'https://dummyjson.com';
export const API_ENDPOINT = {
    CATEGORIES: '/products/category-list',
    PRODUCTS: '/products',
    PRODUCT_BY_ID: '/products/',
    PRODUCT_BY_CATEGORY: '/products/category/',
    PRODUCT_BY_QUERY: '/products/search?q='
}

export const PER_PAGE = 12;

export const STORAGE_KEYS = {
    WISHLIST: 'wishlist',
    CART: 'cart'
}