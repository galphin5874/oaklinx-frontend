import { BASE_URL, MEDIA_URL, getCsrfToken, logout, getUserLocalStorage } from '../../Globals';
import { Input, Button, Link } from '../../_components/UI/UI';
import { useState, useEffect, startTransition } from 'react'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LoadingCircle } from '../../_components/Loading/LoadingCircle/LoadingCircle';
import axios from 'axios';
import './Login.css';

export default function Login() {
	const [csrfToken, setCsrfToken] = useState();
	const [user, setUser] = useState(null);
	const [isAuth, setIsAuth] = useState();
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorCode, setErrorCode] = useState();
	const [errorMsg, setErrorMsg] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [loadedImages, setLoadedImages] = useState(0);
	const [buttonMsg, setButtonMsg] = useState('Log in');
	const [loggingIn, setLoggingIn] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
	const navigate = useNavigate();
	axios.defaults.withCredentials = true

	useEffect(() => {
		getCsrfToken()
		.then((resp) => setCsrfToken(resp.data));
		getAuthStatus();
	}, []);

	useEffect(() => {
		const handleAuthErrorMessage = () => {
			setLoggingIn(false);
			if(errorCode == 'AUTH_FAILED') {
				setErrorMsg('Authentication failed');
			}
			if(errorCode == 'ERR_NETWORK') {
				setErrorMsg(`Unable to contact server, Try again later.`);
			}
			if(errorCode === 'ECONNABORTED') {
				setErrorMsg('Server response time exceeded');
			}
		}
		if(errorCode) handleAuthErrorMessage();
	}, [errorCode]);

	useEffect(() => {
		if(loggingIn) {
			setButtonDisabled(true);
			setErrorCode();
			setErrorMsg('');
			setButtonMsg('Logging in...');
		} else {
			setButtonDisabled(false);
			setButtonMsg('Log in');
		}
	}, [loggingIn]);

	useEffect(() => {
		setErrorCode();
		setErrorMsg('');
		if(username.length > 0 && password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [username, password]);

	useEffect(() => {
		if(user && loadedImages == 4) {
			setIsAuth(true);
			navigate('/')
		}
	}, [user, loadedImages]);

	const getAuthStatus = () => {
		try {
			axios.get(`${BASE_URL}/account/is_auth`)
			.then((resp) => {
				setCheckingAuth(false);
				if(resp.data !== false) {
					localStorage.setItem('user', JSON.stringify(resp.data));
					setIsAuth(true);
					navigate('/');
					setUser(JSON.stringify(resp.data));
				} else {
					setIsAuth(false);
					getToken();
				}
			})
			.catch((e) => {
				setErrorCode(e.code);
			});
		}
		catch (e) {
			console.log(e);
		}
	}

	async function login () {
		setLoggingIn(true);
		try {
			const resp = await axios.post(`${BASE_URL}/account/login`, {
				'username':username,
				'password':password
			}, { headers: {
					'X-CSRFToken':csrfToken,
					'Content-Type':'multipart/form-data'
				}
			})
			const data = resp.data;
			if(data !== false) {
				localStorage.setItem(
					'user', JSON.stringify(data));
				setUser(data);
				setIsAuth(true);
			} else {
				setErrorCode('AUTH_FAILED');
				setLoggingIn(false);
			}
			setLoggingIn(false);
		}
		catch (e) {
			console.log(e)
		}
	}
	
	return (
		<div className={'login-container'}>

			<div className={'login-logo-container'}>

				<LazyLoadImage
					className={'login-logo'}
					alt={logo}
					src={logo}
					effect={"blur"}
					threshold={100}/>

			</div>
			
			{ checkingAuth ? 
				
				<div style={{marginTop:20}}>
					
					<LoadingCircle size={35} animated={true}/>

				</div>
				
			
			:

				<>
			
					{ !isAuth ?

						<>

							<div className={'login-form-container'}>
													
								<div className={'login-input-container'}>

									<Input
										placeholder='Username'
										autoFocus={true}
										autoComplete={'true'}
										onChange={( e ) => setUsername( e.target.value )}
										onKeyDown={(e) => e.key === "Enter" ? login():null}/>

								</div>

								<div className={'login-input-container'}>

									<Input
										placeholder='Password'
										type={'password'}
										autoComplete={'true'}
										onChange={(e) => setPassword(e.target.value)}
										onKeyDown={(e) => e.key === "Enter" ? login():null}/>

								</div>

								<div className={'login-button-container'}>

									<Button
										text={"Login"}
										disabled={buttonDisabled}
										loading={loggingIn}
										onClick={() => login()}
										onKeyDown={(e) => e.key === "Enter" ? login():null}/>

								</div>

							</div>

						
							{ errorMsg ?
								
								<div
									className={'login-error-container'}
									style={{display:errorMsg ? 'flex':'none'}}>

									{errorMsg}

								</div>

							:

								null

							}
						
						
							<div className={'login-footer'}>

								<Link
									style={{marginRight:10}}
									to={"/register"}
									text={"Create account"}/>

								<Link
									style={{marginLeft:10}}
									to={'/account/forgot_password'}
									text={"Forgot Password?"}/>

							</div>

							<div>

								<Link
									style={{marginTop:3}}
									to={"/install"}
									text={"Install GAPPS on Mobile"}/>

							</div>
						
						</>
					
				
					:

						<div className={'login-isauth-menu'}>

							<div>

								<Button
									text={'Forums'}
									style={{margin:5}}
									onClick={() => startTransition(() => {
										navigate('/forum/categories')})}/>

							</div>

							<div>

								<Button
									text={'Services'}
									style={{margin:5}}/>

							</div>

							<div>

								<Button
									text={'Logout'}
									style={{margin:5}}
									loading={loggingOut}
									onClick={() => {
										setLoggingOut(true);
										logout().then((resp) => {
											setIsAuth();
											setLoggingOut(false)})}}/>

							</div>

							{/* <div>

								<Button
									text={'Dark/Light'}
									style={{margin:5}}
									onClick={() => toggleTheme()}/>

							</div> */}

						</div>
				
					}

				</>
				
			}

			<img
				style={{display:'none'}}
				src={homeIcon}
				onLoad={() => setLoadedImages(
					(current) => current + 1)}/>

			<img
				style={{display:'none'}}
				src={homeIconActive}
				onLoad={() => setLoadedImages(
					(current) => current + 1)}/>

			<img
				style={{display:'none'}}
				src={searchIcon}
				onLoad={() => setLoadedImages(
					(current) => current + 1)}/>

			<img
				style={{display:'none'}}
				src={chatIcon}
				onLoad={() => setLoadedImages(
					(current) => current + 1)}/>
						
		</div>

	);
	
}