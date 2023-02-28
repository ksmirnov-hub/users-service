import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import ReactFileReader from 'react-file-reader';
import get from "lodash/get";
import { Input, Image, Upload, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { personsFetchDataRequest } from "../redux/actions/persons";
import ContentWrapper from "../components/contentWrapper";
import { updateUserDataRequest, clearMessage as clearMessageAction} from "../redux/actions/registration";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function Account({
	isAuth = false,
	profile,
	userModified,
	clearMessage,
	sendData,
}) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [age, setAge] = useState(0);
	const [name, setName] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [birthDate, setBirthDate] = useState('');
	const [photo, setPhoto] = useState('');
	const [file, setFile] = useState('');

	useEffect(() => {
		setName(profile.name);
		setBirthDate(profile.birthdate);
		setPassword();
		setPhoto(profile.photo);
	}, [profile]);

	useEffect(() => {
		setIsEditMode(false);
		setFile('');
		setSuccessMessage(userModified);
		setTimeout(() => {	
			setSuccessMessage(false);
			clearMessage();
		}, 3000)
	}, [userModified]);

	useEffect(() => {
		const fields = !name || (password && passwordError);
		setIsDisabled(fields);
	}, [name, passwordError]);

	useEffect(() => {
		if (password && passwordRepeat) {
			setPasswordError(password !== passwordRepeat);
		} else {
			
			setPasswordError(false);
		}
	}, [password, passwordRepeat]);

	const handleFiles = (files) => {
		console.log('files', files);
		setFile(files.base64);
	};

	const updateProfile = () => {
		const updatedData = {
			name,
			password,
			file: file,
			id: profile._id
		}
		sendData(updatedData);
	};


	return (
		<ContentWrapper>
			<div className="flex flex-row justify-center">
				<div className="my-[50px] h-auto">
					{isAuth && (
						<div className="p-[20px] w-[700px] [&>div]:mb-[20px] [&>div]:flex [&>div]:flex-row [&>div]:justify-between">
							<div className="[&>input]:text-[25px]">
								<div className="text-[25px] w-[420px] font-bold">Ваше имя:</div>
								{isEditMode ? (
									<Input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Имя" />
								) : (
									<div className="text-[25px] italic">{name}</div>
								)}
							</div>
							{isEditMode && (
							<>
								<div className="flex flex-col">
									<div className="text-[25px] w-[420px] font-bold">Новый пароль:</div>
									<Input.Password
										onChange={(e) => setPassword(e.target.value)}
										iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
									/>
								</div>
								<div className="flex flex-col">
									<div className="text-[25px] w-[420px] font-bold">Повторите пароль:</div>
									<Input.Password
										onChange={(e) => setPasswordRepeat(e.target.value)}
										iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
									/>
								</div>
								<div className="flex flex-row justify-center">
								{
									passwordError && (
										<div className="text-[15px] w-[350px] text-red-500 align-center">Пароли не совпадают</div>
									)
								}

								</div>
							</>
							)}
							{!isEditMode && (
								<div>
									<div className="text-[25px] min-w-[200px] font-bold">Дата рождения :</div>
									<div className="text-[25px] italic">{moment(birthDate).format('DD.MM.YYYY')}</div>
								</div>
							)}
							<div>
								{isEditMode ? (
									<div className="flex flex-row w-full justify-between">
										<div  className="flex flex-col">
											<div className="text-[25px] mb-[20px] h-[60px]">
												<ReactFileReader
													fileTypes={[".png",".jpg", ".gif", ".jpeg"]}
													base64={true}
													multipleFiles={false}
													handleFiles={handleFiles}
												>
												  <button className='text-[25px] border bg-[#C0C0C0] rounded-md p-[8px] font-bold'>Загрузите новое</button>
												</ReactFileReader>
											</div>
											<div className='border w-[200px] h-[250px] border-slate-400'>
											{
												file && (
													<Image
														width={200}
														height={250}
														src={file}
													/>
												)
											}
											</div>
										</div>
										<div  className="flex flex-col">
											<div className="text-[25px] mb-[20px] h-[60px] font-bold">Текущее фото:</div>
											<div className='border w-[200px] h-[250px] border-slate-400'>
												<Image
													width={200}
													src={photo}
												/>
											</div>
										</div>
									</div>
								) : (
									<div className="flex flex-row w-full !justify-end">
										<Image
											width={200}
											src={photo}
										/>
									</div>
								)}
							</div>
							{isEditMode && (
								<div className='flex flex-row !justify-center w-full'>
									<div className='flex flex-row text-[25px]  items-center justify-between w-[50%]'>
										<Button type="default" onClick={updateProfile} disabled={isDisabled}>
											Отправить
										</Button>
										<Button type="default" onClick={() => setIsEditMode(false)}>
											Отменить
										</Button>
									</div>
								</div>
							)}

							{!isEditMode && (
								<Button type="default" onClick={() => setIsEditMode(true)}>
									Редактировать
								</Button>
							)}

							{successMessage && (
								<div className="text-[25px] w-full mt-[50px] !justify-center font-bold text-[#008000]">
									Данные успешно изменены
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</ContentWrapper>
	);
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		profile: state.auth.profile,
		userModified: state.registration.userModified,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		sendData: data => dispatch(updateUserDataRequest(data)),
		clearMessage: data => dispatch(clearMessageAction(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);