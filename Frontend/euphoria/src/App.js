import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/components/screens/home/Home';
import CategoryProducts from './components/includes/products/CategoryProducts';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/category/:id" element={<CategoryProducts />} />
				</Routes>
			</Router>

		</>
	);
}

export default App;
