import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './views/Home'
import Signin from './components/Login/Signin';
import Signup from './components/Login/Signup';

const Layout = () => {

	return (
			<BrowserRouter>
				<Navbar />
					<Routes>
						<Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
			</BrowserRouter>
	);
};

export default Layout;
