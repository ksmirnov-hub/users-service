import React, { useEffect } from 'react';
import { NavLink, Outlet, Link} from "react-router-dom";
import { connect } from "react-redux";

export const MainLayout = ({
	logoutAction,
	isAuth,
}) => {
	const inactiveStyle = {
		textDecoration: "underline",
	};

	const logout = () => {
		logoutAction();
	}

	const checkActive = ({ isActive }) => {
		return isActive ? undefined : inactiveStyle;
	}

	return (
		<>
		<div className="flex flex-row bg-[#413839] ">
			<div
				className="w-[90%] h-[100px] px-[30%] items-center flex flex-row justify-around [&>a]:text-[#F0FFF0] [&>a]:text-[25px]"
			>
				<NavLink to="/" style={checkActive}>Главная</NavLink>
				<NavLink style={checkActive} to="/account">Профиль</NavLink>
				<NavLink style={checkActive} to="/people">Аккаунты</NavLink>
			</div>
			<div className="w-[10%] [&>a]:text-[25px] [&>a]:text-[#FFDAB9] items-center flex flex-row">
			{
				isAuth && (
					<a onClick={logout} href="#" className="no-underline ">
						Выйти
					</a>
				)
			}
			</div>
		</div>
			<div className="h-full">
				<Outlet />
			</div>
		</>
  );
};
