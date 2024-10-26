import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigation } from './Navigation/Navigation.jsx';
import { Home } from './Home/Home.jsx';
import ForgotPassword from './Account/ForgotPassword/ForgotPassword';
import ChangePassword from './Account/ChangePassword/ChangePassword';
import UpdateEmail from './Account/UpdateEmail/UpdateEmail';
import Register from './Account/Register/Register';
import Login from './Account/Login/Login';
import axios from 'axios';
import './index.css'
const SetPassword = lazy(() => import('./Account/ForgotPassword/SetPassword'));

export default function App() {
	axios.defaults.withCredentials = true;

	const GeneralRoute = ({ children }) => {
		return (
			<>

				<Navigation/>

					<div>

						{ children }

					</div>

			</>
		);
	}

	const GeneralRoutes = () => {
		return (
			<GeneralRoute>

				<Outlet/>

			</GeneralRoute>

		)
	}

	return (
		<Router>

			<Routes>

				<Route element={<GeneralRoutes/>}>
				
					<Route path={'/'} element={<Home/>}/>

					<Route path="/home" element={<Home/>}/>

					<Route path="/register" element={<Register/>}/>

					<Route path="/login" element={<Login/>}/>
				
				</Route>

			</Routes>

		</Router>
	);
}