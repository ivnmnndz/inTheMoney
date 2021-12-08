import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Login/Signin';
import Signup from './components/Login/Signup';

import Navbar from './components/Navbar';

const Layout = () => {

	return (
			<BrowserRouter>
				<Navbar />
					<Routes>
            <Route path="/login" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
			</BrowserRouter>
	);
};

export default Layout;
