import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { connect } from "react-redux";
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Home, People, Account, NoMatch, Login, Registration, Portal } from "../routes";
import { MainLayout } from "./MainLayout";
import { checkCredentialsRequest } from "../redux/actions/login";
import { eraseUserAuth } from "../redux/actions/auth";
import './App.css';

function App({
	isAuth = false,
	checkCredentials,
	isLoading,
	logoutAction,
}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false); 
	let location = useLocation();
	const navigate = useNavigate();
	let state = location.state;

	useEffect(() => {
		if (!isAuth) {
			setIsAuthenticated(false);
			const token = localStorage.getItem('token');
			if (token) {
				checkCredentials({id: token})
			}
		} else {
			setIsAuthenticated(true);
		}
	}, [isAuth]);

	const updeteRoute = (Component) => (isAuthenticated ? <Navigate replace to="/account" /> : Component);
	const updeteRouteToPortal = (Component) => (isAuthenticated ? Component : <Navigate replace to="/portal" />);

	return (
		<div className='app h-full'>
			<Routes location={state?.backgroundLocation || location}>
				<Route path="/" element={<MainLayout logoutAction={logoutAction} isAuth={isAuth} />}>
					<Route index element={<Home />} />
					<Route path="people" element={updeteRouteToPortal(<People />)} />
					<Route path="account" element={updeteRouteToPortal(<Account />)} />
					<Route path="*" element={<NoMatch />} />
					<Route
						path="portal"
						element={updeteRoute(<Portal />)}
					/>
					<Route
						path="registration"
						element={updeteRoute(<Registration />)}
					/>
					<Route
						path="login"
						element={updeteRoute(<Login />)}
					/>
				</Route>
				</Routes>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		isLoading: state.login.isLoading
	};
}

const mapDispatchToProps = dispatch => {
	return {
		checkCredentials: data => dispatch(checkCredentialsRequest(data)),
		logoutAction: () => dispatch(eraseUserAuth())
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
