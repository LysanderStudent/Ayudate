export interface UserDummyJSON {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    image: string;
};


export interface Producto {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>;
}