import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { Producto } from '../utils/interfaces'
import { urlAPI } from '../utils/urlAPI';
import { CardProducto } from '../components/CardProducto';
import { FormUpdate } from '../components/FormUpdate';
import { FormAdd } from '../components/FormAdd';

interface ProductosProps {
    isAuthenticated: boolean;
}

export const Productos = ({ isAuthenticated }: ProductosProps) => {
    const location = useLocation();
    const productoVacio: Producto = {
        id: 0,
        discountPercentage: 0,
        price: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        description: '',
        thumbnail: '',
        title: '',
        images: []
    };

    const [keyword, setKeyword] = useState('');
    const [sortType, setSortType] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [productos, setProductos] = useState<Producto[]>([]);
    const [selectProducto, setSelectProducto] = useState<Producto>({ ...productoVacio });
    const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);

    useEffect(() => {
        if (location.state !== null) {
            isAuthenticated = location.state;

            if (isAuthenticated) {
                axios.get(`${urlAPI}/products/get-products`)
                    .then(response => {
                        const responseData: Producto[] = response.data.products;
                        setProductos(responseData);
                    })
                    .catch(errResponse => {
                        const dataError = errResponse.response.data;

                        if (!dataError.success)
                            alert(dataError.message);
                    });
            }
        }

    }, []);

    const getSortedProductos = () => {
        let sortedProductos = [...productos];

        if (sortType === 'name') {
            sortedProductos.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            });
        } else if (sortType === 'price') {
            sortedProductos.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        return sortedProductos;
    };

    const getKeywordProductos = (productos: Producto[]) => {
        let sortedProductos = [...productos];

        if (keyword !== '') {
            sortedProductos = sortedProductos.filter((producto: Producto) =>
                producto.title.toLowerCase().includes(keyword.toLowerCase())
                || producto.price.toString() === keyword
            );
        }

        return sortedProductos;
    };

    const selectProduct = (productoToUpdate: Producto) => {
        setSelectProducto({ ...productoToUpdate });
        setIsVisibleUpdate(true);
    };

    const closeModalUpdate = () => {
        setSelectProducto({ ...productoVacio });
        setIsVisibleUpdate(false);
    };

    const handleUpdateProduct = () => {
        setIsVisibleUpdate(false);

        const productosActualizados = productos.map(producto => {
            if (producto.id === selectProducto.id) {
                return selectProducto;
            }

            return producto;
        });

        setProductos(productosActualizados);
        setSelectProducto({ ...productoVacio });
    };

    const handleAddProduct = (newProducto: Producto) => {
        setIsVisibleAdd(false);
        setProductos(prevProductos => [...prevProductos, newProducto]);
    };

    if (location.state === null) {
        return (
            <span className="text-neon"><p>Inicia Sesion</p></span>
        );
    } else {
        return (
            <div className="container py-5">
                <span className="text-neon"><p>Productos</p></span>

                <div className='my-3 d-flex'>
                    <input
                        className='me-2 input-group flex-nowrap'
                        placeholder='Buscar...'
                        type="text"
                        value={keyword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                    />

                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} className='mx-1 form-select w-25'>
                        <option value="">Ordenar Por:</option>
                        <option value="name">Nombre</option>
                        <option value="price">Precio</option>
                    </select>

                    {sortType !== '' &&
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='mx-1 form-select w-25'>
                            <option value="asc">{sortType === 'name' ? 'A-Z' : 'Menor Precio'}</option>
                            <option value="desc">{sortType === 'name' ? 'Z-A' : 'Mayor Precio'}</option>
                        </select>
                    }
                </div>

                <div className='productos-grid'>
                    {getKeywordProductos(getSortedProductos()).map((producto: Producto) => (
                        <CardProducto
                            key={producto.id}
                            producto={producto}
                            handleSelectProducto={selectProduct}
                        />
                    ))}
                </div>

                <center>
                    <div className="button-add my-4">
                        <button onClick={() => setIsVisibleAdd(true)} className='btn'>Agregar Producto</button>
                    </div>
                </center>

                {isVisibleUpdate &&
                    <FormUpdate
                        producto={selectProducto}
                        isVisible={isVisibleUpdate}
                        handleUpdate={handleUpdateProduct}
                        closeModalUpdate={closeModalUpdate}
                        changeValue={setSelectProducto}
                    />}

                {isVisibleAdd &&
                    <FormAdd
                        isVisible={isVisibleAdd}
                        visibleModal={setIsVisibleAdd}
                        handleAdd={handleAddProduct}
                    />}

            </div >
        );
    }

};
