import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Input, Image } from 'antd';
import moment from 'moment';
import { personsFetchDataRequest } from "../redux/actions/persons";
import ContentWrapper from "../components/contentWrapper";

function People({
	persons: {
		data = [],
	},
	isAuth = false,
	profile: { _id: currentUserId},
	fetchData
}) {
	const [personsList, setPersonsList] = useState([]);

	useEffect(() => {
		fetchData("/api/users")
		console.log('persons', personsList);
	}, []);

	useEffect(() => {
		setPersonsList(data);
	}, [data]);

	return (
		<ContentWrapper>
			<div className="w-[800px] h-full mx-[30%]">
				<div className="my-[150px] h-auto">
					{isAuth ? (
						<div>Перейти в профиль</div>
					) : (
						<div
							className="p-[20px] [&>div:nth-child(even)]:py-[20px] [&>div]:mb-[20px] [&>div:nth-child(even)]:border-b-4 [&>div:nth-child(even)]:border-t-4 [&>div:last-child]:!border-b-0">
						{
							personsList.filter(item => item._id !== currentUserId).map((person) => {
								const format = moment(person.birthdate).format('DD-MMM-YYYY');
								const age = moment().diff(moment(person.birthdate).format('DD-MMM-YYYY'), 'years');
								return (
									<div className="flex flex-row justify-between border-[#413839]" key={person._id}>
										<div className="flex flex-col justify-center font-bold text-[24px]">
											<div>{person.name}</div>
											<div className="flex flex-row justify-left font-bold text-[24px]">
												<div className="text-[#434b4d] font-normal text-[24px] mr-[20px]">Возраст: </div>
												<div>{age}</div>
											</div>
										</div>
										<div>
											<Image
												width={200}
												src={person.photo}
											/>
										</div>
									</div>
								);
							})
						}
						</div>
					)}
				</div>
			</div>
		</ContentWrapper>
	);
}

const mapStateToProps = state => {
	return {
		persons: state.persons,
		profile: state.auth.profile
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(personsFetchDataRequest(url))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(People);