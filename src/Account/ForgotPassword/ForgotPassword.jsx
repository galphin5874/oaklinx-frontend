import { useState, useRef, useEffect } from 'react'
import { BASE_URL, getCsrfToken } from '../../Globals';
import { Input, Button, Link } from '../../_components/UI/UI';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState();
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState();
    const logoRef = useRef();

    useEffect(() => {
        getCsrfToken()
        .then((resp) => setCsrfToken(resp.data));
    }, []);

    useEffect(() => {
        setShowError(false);
        validateEmail();
        if (email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    const validateEmail = () => {
        const charsAfterAt = email.substring(email.indexOf("@") + 1);
        if (email.includes('@') && charsAfterAt.length >= 5) {
            if (email.includes('.com') || email.includes('.net') ||
                email.includes('.org')) {
                setEmailValid(true);
            } else {
                setEmailValid(false);
                setError('Valid email required')
            }
        } else {
            setEmailValid(false);
            setError('Valid email required')
        }
    }

    const sendEmail = () => {
        setLoading(true);
        axios.post(`${BASE_URL}/account/reset_password`, {
            'email':email
        }, {
            headers:{
                'X-CSRFToken':csrfToken,
                'Content-Type':'multipart/form-data'
            }
        })
        .then((resp) => {
            setLoading(false);
            setEmailSent(true);
        })
        .catch((e) => console.log(e));
    }

    return (
        <div className={'forgotpassword-container'}>

            <div className={'forgotpassword-logo-container'}>

                <LazyLoadImage
                    className={'forgotpassword-logo'}
                    ref={logoRef}
                    alt={logo}
                    src={logo}
                    effect={"blur"}
                    threshold={100}/>

            </div>

            { emailSent ?
            
                <div className={'forgotpassword-email-sent-container'}>

                    If the email account exists, you will receive an email with instructions shortly

                </div>
            
            :
            
                <div className={'forgotpassword-form'}>


                    { showError ?

                        <div className={'forgotpassword-error-container'}>

                            {error}

                        </div>
                        
                    : null}

                    <Input
                        placeholder={'Email'}
                        autoFocus={true}
                        autoComplete={'true'}
                        onChange={(e) => setEmail( e.target.value )}/>

                    <div className={'forgotpassword-button-container'}>

                        <Button
                            text={'Reset Password'}
                            loading={loading}
                            disabled={buttonDisabled}
                            onClick={() => emailValid ? sendEmail() : setShowError(true)}/>

                    </div>

                </div>
            
            }

            <div className={'forgotpassword-footer'}>

                <div className={'forgotpassword-footer-links'}>

                    <Link
                        text={"◄ Login"}
                        to={'/login'}/>

                </div>

            </div>

        </div>

    )

}