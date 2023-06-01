import React from 'react'
import { Producto } from '../utils/interfaces'

interface CardProductoProps {
    producto: Producto;
    handleSelectProducto: (producto: Producto) => void;
}

export const CardProducto = ({ producto, handleSelectProducto }: CardProductoProps) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="contenedor-imagen">
                    <img className='producto-imagen' src={producto.thumbnail} alt={producto.title} />
                </div>

                <div className='text-white px-2'>
                    <p className='text-center fw-bold fs-5'>{producto.title}</p>
                    <div className='mb-5'>{producto.description}</div>
                    <div className='descripcion-precio d-flex align-items-center pb-2'>
                        <span className="moneda">$</span>
                        <span className='valor'>{producto.price}</span>
                    </div>
                </div>

                <div className="button-update d-flex justify-content-end align-self-end">
                    <button onClick={() => handleSelectProducto(producto)} className='btn m-2'>Editar</button>
                </div>
            </div>
        </div>
    )
}
