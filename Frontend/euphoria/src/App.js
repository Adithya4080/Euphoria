import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/components/screens/home/Home';
import CategoryProducts from './components/includes/products/CategoryProducts';
import ProductSinglePage from './components/includes/productSingle/ProductSinglePage';
import Login from './components/screens/login/Login';
import Signup from './components/screens/login/Signup';
import { WishlistProvider } from './components/includes/context/Context';

function App() {
	return (
		<>
			<Router>
				<WishlistProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/category/:id" element={<CategoryProducts />} />
						<Route path = "/product/:id" element={<ProductSinglePage />} />
						<Route path= "/login" element ={<Login />} />
						<Route path='/create' element={<Signup />} />
					</Routes>
				</WishlistProvider>
			</Router>

		</>
	);
}

export default App;
