import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Input, Select, Form, Button, DatePicker, Upload } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { addUserDataRequest } from "../redux/actions/registration";

const OPTIONS = ['Мужской', 'Женский'];

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function Registration({
	persons: {
		data = [],
	},
	isAuth = false,
	sendData
}) {
	const [muggers, setMaggers] = useState([]);
	const [selectedGender, setSelectedGender] = useState([]);
    const [fileList, setFileList] = useState([]);

	const filteredOptions = OPTIONS.filter((o) => !selectedGender.includes(o))

	const onFinish = (values: any) => {
		console.log(values);
		sendData(values);
	};

	const onFinishFailed = (values: any) => {
		console.log(values);
	};

	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

	const getFile = (e) => {
	  console.log('Upload event:', e);

	  if (Array.isArray(e)) {
		return e;
	  }
	 return e && e.fileList;
	};

	const [img, setImg] = useState('');

  const handleFormChange = (event) => {
    
    event.preventDefault();
	setImg(event.target.files[0]);
	console.log('event.target.value', event.target.files[0]);
	sendData(event.target.files);
  }

  const handleSubmit = (o) => {
	  
    sendData(img);
  }

	return (
		<div className="w-[500px] h-full mx-[35%]">
			<div className="my-[150px] h-auto">
				{isAuth ? (
					<div>Перейти в профиль</div>
				) : (
					<div className="p-[20px] [&>div]:mb-[20px]">

						<div className="font-sans font-bold text-[24px] text-center">Форма регистрации</div>
						<Form
							name="basic"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{ maxWidth: 600 }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
							<Form.Item
								label="Имя"
								name="name"
								rules={[{ required: true, message: 'Введите ваше имя!' }]}
							>
								<Input />
							</Form.Item>
							<Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
								<Input />
							</Form.Item>
							<Form.Item
								label="Пароль"
								name="password"
								rules={[{ required: true, message: 'Please input your password!' }]}
							>
								<Input.Password
									iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
								/>
							</Form.Item>
							<Form.Item  name={'birthdate'} label="Дата рождения">
								<DatePicker />
							</Form.Item>
							<Form.Item name={'gender'} label="Ваш пол">
								<Select
									value={selectedGender}
									onChange={setSelectedGender}
									style={{ width: '100%' }}
									options={filteredOptions.map((item) => ({
										value: item,
										label: item,
									}))}
								/>
							</Form.Item>
							<Form.Item
								label="Фото"
								name={'file'}
								valuePropName="fileList"
								getValueFromEvent={getFile}
							>
								<Upload
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									listType="picture-card"
									fileList={[]}
									onChange={handleChange}
								>
									<div>
										<PlusOutlined />
										<div
											style={{
											  marginTop: 8,
											}}
										>
											Загрузить изображение
										</div>
									</div>
								</Upload>
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button type="default" htmlType="submit">
									Отправить
								</Button>
							</Form.Item>
						</Form>
					</div>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		persons: state.persons
	};
}

const mapDispatchToProps = dispatch => {
	return {
		sendData: url => dispatch(addUserDataRequest(url))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);