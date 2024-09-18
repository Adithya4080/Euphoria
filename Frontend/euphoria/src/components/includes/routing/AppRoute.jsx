import React from 'react';
import '../../../../src/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../screens/home/Home';
import CategoryProducts from '../products/CategoryProducts';
import ProductSinglePage from '../productSingle/ProductSinglePage';
import Login from '../../screens/login/Login';
import Signup from '../../screens/login/Signup';
import Cart from '../../screens/cart/Cart'
import { WishlistProvider } from '../context/Context';
import { Context } from '../context/Store';
import { ToastContainer } from 'react-toastify';
import AuthRoute from './AuthRoute';

function App() {
	return (
		<>
        <Context>
			<Router>
				<WishlistProvider>
                    <ToastContainer />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/category/:id" 
                                element={
                                    <AuthRoute>  
                                        <CategoryProducts />
                                    </AuthRoute>
                                } 
                            />
							<Route path = "/product/:id" element={<ProductSinglePage />} />
							<Route path= "/login" element ={<Login />} />
							<Route path='/create' element={<Signup />} />
							<Route path='/cart' element={<Cart />} />
						</Routes>
				</WishlistProvider>
			</Router>
        </Context>
		</>
	);
}

export default App;