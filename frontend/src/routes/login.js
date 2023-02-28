import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { checkCredentialsRequest } from "../redux/actions/login";

function Registration({
	isAuth = false,
	authError = null,
	checkCredentials
}) {
	const onFinish = (values: any) => {
		console.log(values);
		checkCredentials(values);
	};

	const onFinishFailed = (values: any) => {
		console.log(values);
	};

	return (
		<div className="w-[600px] h-full mx-[30%]">
			<div className="my-[150px] h-auto">
				{isAuth ? (
					<div>Перейти в профиль</div>
				) : (
					<div className="p-[20px] [&>div]:mb-[20px]">
						<div className="font-sans font-bold text-[24px] text-center">
							Для авторизации введите Email и пароль
						</div>
						<Form
							name="basic"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{ maxWidth: 600 }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
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
							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button type="default" htmlType="submit">
									Отправить
								</Button>
							</Form.Item>
						</Form>
						{
							authError ? (
								<div className="text-red text-red-500 font-bold text-[15px] text-center">{authError}</div>
							) : null
							
						}
					</div>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		authError: state.auth.error
	};
}

const mapDispatchToProps = dispatch => {
	return {
		checkCredentials: data => dispatch(checkCredentialsRequest(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);