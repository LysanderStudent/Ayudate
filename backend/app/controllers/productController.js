import axios from 'axios';

const controller = {
    getProducts: async (req, res) => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                return res.status(200).json({ products: response.data.products });
            })
            .catch(err => {
                return res.status(400).json({ success: false, message: 'Error en consultar los productos' });
            });
    },

    getProduct: (req, res) => {
        const { id } = req.params;

        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => {
                return res.status(200).json({ product: response.data });
            })
            .catch(err => {
                return res.status(404).json({ success: false, message: 'Error en consultar los productos' });
            });
    },

    addProduct: (req, res) => {
        const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = req.body;
        const data = {
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images
        };
        axios.post('https://dummyjson.com/products/add', data)
            .then(response => {
                return res.status(200).json({ success: true, data: response.data });
            })
            .catch(error => {
                return res.status(404).json({ success: false, message: 'Error al agregar el producto' });
            });
    },

    updateProduct: (req, res) => {
        const { id } = req.params;
        const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = req.body;
        const data = {
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images
        };

        axios.put(`https://dummyjson.com/products/${id}`, data)
            .then(response => {
                return res.status(200).json({ success: true, message: 'Producto actualizado', data: response.data });
            })
            .catch(error => {
                return res.status(404).json({ success: false, message: 'Error al actualizar el producto' });
            });
    },

    deleteProduct: (req, res) => {
        const { id } = req.params;

        axios.delete(`https://dummyjson.com/products/${id}`)
            .then(response => {
                return res.status(200).json({ success: true, message: 'Producto eliminado', data: response.data });
            })
            .catch(error => {
                return res.status(404).json({ success: false, message: 'Error al eliminar el producto' });
            });
    },
};

export default controller;