import React, { useState, ChangeEvent } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap';

import { urlAPI } from '../utils/urlAPI';
import { Producto } from '../utils/interfaces';

interface FormUpdateProps {
    isVisible: boolean;
    visibleModal: (show: boolean) => void;
    handleAdd: (newProducto: Producto) => void;
}

export const FormAdd = ({
    isVisible,
    handleAdd,
    visibleModal
}: FormUpdateProps) => {
    const [producto, setProducto] = useState<Producto>({
        brand: '',
        category: '',
        description: '',
        discountPercentage: 0,
        id: 0,
        images: [],
        price: 0,
        rating: 0,
        stock: 0,
        thumbnail: '',
        title: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post(`${urlAPI}/products/add-product`, producto)
            .then(response => {
                const responseData = response.data;
                const producto: Producto = responseData.data;

                console.log(producto);
                handleAdd(producto);
            })
            .catch(errResponse => {
                const dataError = errResponse.response.data;

                if (!dataError.success)
                    alert(dataError.message);
            });
    };

    return (
        <Modal show={isVisible}>
            <Modal.Header>
                <Modal.Title>Actualizar Producto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id='title'
                            name='title'
                            value={producto.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            id='price'
                            name='price'
                            value={producto.price}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            name="stock"
                            value={producto.stock}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input
                            type="number"
                            className="form-control"
                            id="rating"
                            name="rating"
                            value={producto.rating}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de la imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            id="thumbnail"
                            name="thumbnail"
                            value={producto.thumbnail}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={producto.description}
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <input
                            type="text"
                            className="form-control"
                            id="brand"
                            name="brand"
                            value={producto.brand}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className='buttons d-flex justify-content-end'>
                        <button type='button' onClick={() => visibleModal(false)} className='btn btn-danger me-2'>Cancelar</button>
                        <button type='button' onClick={handleSubmit} className='btn btn-success'>Agregar</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
