import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getCsrfToken } from "../../Globals";
import { Input, Button, Link } from "../../_components/UI/UI";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Turnstile from "react-turnstile";
import axios from "axios";
import './Register.css';

export default function Register() {
    const [registering, setRegistering] = useState(false);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [captToken, setCaptToken] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [password1Valid, setPassword1Valid] = useState(false);
    const [password2Valid, setPassword2Valid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [captchaValid, setCaptchaValid] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCsrfToken()
        .then((resp) => setToken(resp.data));
    }, []); 

    useEffect(() => {
        setShowErrors(false);
        setErrors([]);
        if(email.length > 0 && username.length > 0 &&
            password1.length > 0 && password2.length > 0) {
                setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
        validateForm();
    }, [email, username, password1, password2, captToken]);

    useEffect(() => {
        if(emailValid && usernameValid && password1Valid &&
            password2Valid && passwordMatch && captchaValid) {
                setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [emailValid, usernameValid, password1Valid,
        password2Valid, passwordMatch, captchaValid]);

    const validateForm = () => {
        const charsAfterAt = email.substring(email.indexOf("@") + 1);
        if (email.includes('@') && charsAfterAt.length >= 5) {
            if (email.includes('.com') || email.includes('.net') ||
                email.includes('.org')) {
                setEmailValid(true);
            } else {
                setEmailValid(false);
                setErrors((currentErrors) => {
                    return [...currentErrors, 'Valid email required']
                })
            }
        } else {
            setEmailValid(false);
            setErrors((currentErrors) => {
                return [...currentErrors, 'Valid email required']
            })
        }
        if (username.length > 0) {
            setUsernameValid(true);
        } else {
            setUsernameValid(false);
        }
        if (password1.length < 8 || password2.length < 8) {
            setPassword1Valid(false);
            setPassword2Valid(false);
            setErrors(( currentErrors ) => {
                return [...currentErrors, 'Password 8 characters minimum']
            })
        }
        if (password1.length >= 8) {
            setPassword1Valid(true);
        } else {
            setPassword1Valid(false);
        }
        if (password2.length >= 8) {
            setPassword2Valid(true);
        } else {
            setPassword2Valid(false);
        }
        if (password1 == password2) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
            setErrors((currentErrors) => {
                return [...currentErrors, 'Passwords must match']
            });
        }
        if (captToken) {
            setCaptchaValid(true);
        } else {
            setCaptchaValid(false);
            setErrors((currentErrors) => {
                return [...currentErrors, 'Complete CAPTCHA']
            });
        }
    }

    const register = async () => {
        setRegistering(true);
        if (formValid) {
            setErrors([]);
            axios.post(`${BASE_URL}/account/register`, {
                'email':email,
                'username':username,
                'password':password1,
                'password2':password2
            }, { 
				headers: {
					'X-CSRFToken':token,
					'Content-Type':'multipart/form-data'
            }})
            .then((resp) => {
                if(resp.data !== true) {
                    setRegistering(false);
                    for (let i = 0; i < resp.data.length; i++) {
                        if (resp.data[i].includes('email')) {
                            setErrors((currentErrors) => {
                                return [...currentErrors, 'Email address already exists'];
                            })
                        } else {
                            setErrors((currentErrors) => {
                                return [...currentErrors, 'Username already exists'];
                            })
                        }
                    }
                    setShowErrors(true);
                } else {
                    setErrors([])
                    setSuccess(true);
                    setTimeout(() => {
                        navigate(`/`);
                    }, 2000 );
                }
            })
            .catch((e) => console.log(e));
        } else {
            setRegistering(false);
            setShowErrors(true);
        }
        
    }

    return (

        <div className={'register-container'}>

            <div className={'register-logo-container'}>

                <LazyLoadImage 
                    className='register-logo'
                    effect={"blur"}
                    threshold={100}
                    src={logo}/>

            </div>

            <div className={'register-text'}>

                Sign up

            </div>
        
            <div className={'register-input-container'}>

                <Input
                    placeholder={'Email'}
                    type={'email'}
                    autoFocus={true}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? register():null}/>

            </div>

            <div className={'register-input-container'}>

                <Input
                    placeholder={'Username'}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? register():null}/>

            </div>

            <div className={'register-input-container'}>

                <Input
                    placeholder={'Password(8 chars)'}
                    type={'password'}
                    onChange={(e) => setPassword1(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? register():null}/>

            </div>

            <div className={'register-input-container'}>

                <Input
                    placeholder={'Confirm password'}
                    type={'password'}
                    onChange={(e) => setPassword2(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? register():null}/>

            </div>

            <div className={'register-captcha-parent-container'}>

                <div className={'register-captcha-container'}>

                    <Turnstile
                        sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                        theme={'light'}
                        size={'flexible'}
                        fixedSize={true}
                        autoResetOnExpire={true}
                        onVerify={(token) => setCaptToken(token)}/>

                </div>

            </div>

            <div className={'register-button-container'}>

                <Button
                    text={'Sign up'}
                    disabled={buttonDisabled}
                    loading={registering}
                    onClick={() => register()}
                    onKeyDown={(e) => e.key === "Enter" ? register():null}/>

            </div>

            {success ?
            
                <div className={'register-msg-container'}>
            
                    <div className={'register-msg'}>

                        Success. Redirecting to login...
                        
                    </div>

                </div>

            :

                null
        
            }

            <div
                className={'register-error-container'}
                style={{display:showErrors ? 'flex':'none'}}>

                <div className={'register-error-list'}>

                    { showErrors ? 
                        
                        errors.map((error, i) => (

                            <div key={i}>

                                {i + 1}. {error}

                            </div>

                        ))
                
                    :

                        null
                    
                    }
                    
                </div>

            </div>

            <div className={'register-login'}>

                Already have an account? 

                <span>

                    <Link
                        style={{marginLeft:4}}
                        text={"Login"}
                        to={'/'}/>

                </span>

            </div>

        </div>
            
    )
}