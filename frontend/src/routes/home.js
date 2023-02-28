import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import ContentWrapper from "../components/contentWrapper";

function Home({
	profile,
	isAuth = false,
}) {
	const profileName =  profile.name ? `, ${profile.name}.` : '.'; 
	return (
		<ContentWrapper>
			<div className="w-[700px] h-full mx-[30%]">
				<div className="my-[150px] h-auto font-bold border-solid border-black text-[24px]">
					<div>{`Здравствуйте${profileName}`}</div>
					<div> Вы находитесь на главной странице</div>
					{
						!isAuth && (
							<>
								<div className="font-sans font-bold text-[24px]">Для пользования сервисом</div>
								<div className="flex flex-row [&>a]:text-blue-600 justify-between text-2xl">
									<Link to="/login">войдите</Link>
									<div>или</div>
									<Link to="/registration">зарегистрируйтесь</Link>
								</div>
							</>
						)
					}
				</div>
			</div>
		</ContentWrapper>
	);
}

const mapStateToProps = state => {
	return {
		profile: state.auth.profile,
		isAuth: state.auth.isAuth,
	};
}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(Home);