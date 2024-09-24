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
import NoMatch from '../../screens/error/NoMatch';
import Success from '../../screens/cart/Success';

function App() {
	return (
		<>
        <Context>
			<WishlistProvider>
				<Router>				
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
							<Route path='/success' element={<Success/>} />
							<Route path='*' element={<NoMatch />} />
						</Routes>
				</Router>
			</WishlistProvider>
        </Context>
		</>
	);
}

export default App;