import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import wishlist from '../../../assets/wishlist.svg';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import { useWishlist } from '../context/Context';

function CategoryProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { wishlistItems, addToWishlist } = useWishlist();

    useEffect(() => {
        console.log('Wishlist Items from Context:', wishlistItems);
        const token = localStorage.getItem('token');
        const currentPath = window.location.pathname;

        if (!token) {
            localStorage.setItem('redirectAfterLogin', currentPath);
            navigate('/login');
        } else {
            fetch(`http://localhost:8000/api/v1/category/products/protected/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        localStorage.setItem('redirectAfterLogin', currentPath);
                        navigate('/login');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status_code === 6000) {
                        setProducts(data.data);
                        setCategoryName(data.category_name);
                    } else {
                        setErrorMessage('Failed to load products.');
                    }
                })
                .catch(error => console.error('Error fetching products:', error));
        }
    }, [id, navigate, wishlistItems]);

    return (
        <>  
            <Helmet>
                <title>{categoryName} | Euphoria</title>
            </Helmet>
            <Navbar />
            <div className='wrapper'>
                <div className='flex items-center space-x-5 mt-5 mb-10'>
                    <Rectangle />
                    <Heading text={categoryName} />
                </div>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <div className='grid grid-cols-4 max-[1080px]:grid-cols-3 max-[768px]:grid-cols-2 gap-10 mb-10'>
                    {products.map(product => (
                        <div key={product.id}>
                            <div className='relative'>
                                <div className='w-full h-[370px] relative'>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.featured_image} alt={product.name} className='w-full h-full' />
                                    </Link>
                                </div>
                                <div 
                                    className={`z-1 bg-white rounded-[50%] absolute top-6 right-4 cursor-pointer ${wishlistItems.includes(product.id) ? 'wishlist-active' : ''}`}
                                    onClick={() => {
                                        console.log('Clicked wishlist for product:', product.id); // Debugging line
                                        addToWishlist(product.id);
                                    }}
                                >
                                    <img src={wishlist} alt="Wishlist" className='p-2' />
                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                <div>
                                    <Link to={`/product/${product.id}`}>
                                        <h4 className='text-[#2A2F2F] text-[14px] font-bold overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer'>
                                            {product.name}
                                        </h4>
                                    </Link>
                                    <p className='text-[#7F7F7F] text-[12px] font-medium'>{product.brand}'s Brand</p>
                                </div>
                                <div>
                                    <p className='text-[#2A2F2F] text-[16px] font-bold'>${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CategoryProducts;

