import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, getCsrfToken } from '../../Globals';
import { Input, Button } from '../../_components/UI/UI';
import axios from 'axios';
import './SetPassword.css';

export default function SetPassword() {
    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState();
    const [tokenID, setTokenID] = useState();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordLengthValid, setPasswordLengthValid] =useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getCsrfToken()
        .then((resp) => setCsrfToken(resp.data));
    }, []);

    useEffect(() => {
        const validateFields = () => {
            if (password.length < 8) {
                setErrors(
                    (currentErrors ) => [
                        ...currentErrors, 'Password must be at least 8 chars'
                    ]);
                setPasswordLengthValid(false);
            } else {
                setPasswordLengthValid(true);
            }
            if (password !== password2) {
                setErrors(
                    (currentErrors ) => [
                        ...currentErrors, 'Passwords must match'
                    ]);
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true);
            }
        }
        resetErrors([]);
        if (password.length > 0 && password2.length > 0) { validateFields() }
    }, [password, password2]);

    const resetErrors = () => {
        setShowErrors(false);
        setErrors([]);
    }

    const setNewPassword = () => {
        if (passwordLengthValid && passwordsMatch) {
            resetErrors();
            setLoading(true);
            axios.post(`${BASE_URL}${location.pathname}`, {
                'new_password':password,
                'confirmed_password':password,
            }, {
                headers: {
                    'Content-Type':'multipart/form-data',
                    'X-CSRFToken':csrfToken,
                }
            }
            )
            .then((resp) => {
                if(resp.data == "success") {
                    setPasswordChanged(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 2500);
                } else {
                    setErrors((currentErrors) => [
                        ...currentErrors, resp.data
                    ]);
                    setShowErrors(true);
                    setLoading(false);
                }
            })
            .catch((e) => console.log(e));
        } else {
            setShowErrors(true);
            setLoading(false);
        }
    }

    return (
        <div className={'setpassword-container'}>

            <div className={'setpassword-form-fade'}>

                <div className={'setpassword-logo-container'}>

                    <img 
                        className='setpassword-logo'
                        src={logo}/>

                </div>

                {passwordChanged ?
                
                    <div className={'setpassword-success-container'}>

                        Password changed succesfully, redirecting to login...

                    </div>
            
                :

                    null
                
                }

                {showErrors ? 

                    <div>

                        <div className={'setpassword-error-header'}>
                            
                            {errors.map((error, i) => ( 

                                <div key={i}>

                                    {i + 1}. {error}

                                </div>

                            ))}

                        </div>

                    </div>
            
                :
                    
                    null
                
                }

                <div className={'setpassword-form'}>

                    <Input
                        type={'password'}
                        placeholder={'New Password'}
                        autoFocus={true}
                        autoComplete={'true'}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <Input
                        type={'password'}
                        placeholder={'Confirm Password'}
                        autoComplete={'true'}
                        onChange={(e) => setPassword2(e.target.value)}/>

                    <Button
                        text={'Save'}
                        style={{margin:5}}
                        loading={loading}
                        onClick={() => setNewPassword()}/>

                </div>

            </div>

        </div>
    )
}