import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProductService } from './ProductService';

export default function CarruselOfertasEspeciales() {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '2500px',
            numVisible: 6,
            numScroll: 1
        },
        {
            breakpoint: '2000px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1700px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1100px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    }, []);

    const productTemplate = (product) => {
        return (
            <div className=" text-center py-3">
                <div className="mb-3">
                    <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="shadow-5" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <Carousel autoplayInterval={3000} value={products} circular responsiveOptions={responsiveOptions} showIndicators={false} itemTemplate={productTemplate} />

        </div>
    )
}