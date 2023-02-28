import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import ContentWrapper from "../components/contentWrapper";

function Home({
	profile,
	isAuth = false,
}) {
	const profileName =  profile.name ? `, ${profile.name}` : ''; 
	return (
		<ContentWrapper>
			<div className="w-[700px] h-full mx-[30%]">
				<div className="my-[150px] h-auto font-bold border-solid border-black text-[24px]">
					<div>{`Здравствуйте${profileName}`}</div>
					<div> Вы находитесь на главной странице</div>
				</div>
			</div>
		</ContentWrapper>
	);
}

const mapStateToProps = state => {
	return {
		profile: state.auth.profile,
	};
}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(Home);