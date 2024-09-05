import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/components/screens/home/Home';
import CategoryProducts from './components/includes/products/CategoryProducts';
import ProductSinglePage from './components/includes/productSingle/ProductSinglePage';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/category/:id" element={<CategoryProducts />} />
					<Route path = "/products" element={<ProductSinglePage />} />
				</Routes>
			</Router>

		</>
	);
}

export default App;
