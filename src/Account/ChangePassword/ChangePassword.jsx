import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getCsrfToken } from "../../Globals";
import { Input, Button } from "../../_components/UI/UI";
import { LoadingCircle } from '../../_components/Loading/LoadingCircle/LoadingCircle';
import axios from "axios";
import loadingCircle from '../../_assets/imgs/loadingcircle.png';
import './ChangePassword.css';

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState( true );
    const [newPasswordValid, setNewPasswordValid] = useState( false );
    const [newPassword2Valid, setNewPassword2Valid] = useState( false );
    const [passwordsMatch, setPasswordsMatch] = useState( false );
    const [formValid, setFormValid] = useState( false );
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState( false );
    const [updatingMsg, setUpdatingMsg] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getCsrfToken()
        .then((resp) => setCsrfToken(resp));
    }, []);

    useEffect(() => {
        const validateForm = () => {
            if( currentPassword.length > 0 &&
                newPassword.length > 0 &&
                newPassword2.length > 0 ) {
                    setButtonDisabled( false );
            } else {
                setButtonDisabled( true );
            }
            if( newPassword.length >= 8 ) {
                setNewPasswordValid( true );
            } else {
                setNewPasswordValid( false );
                setErrors(( currentErrors) => [
                    ...currentErrors, 'New password must be atleast 8 chars'
                ])
            }
            if( newPassword == newPassword2 ) {
                setPasswordsMatch( true );
            } else {
                setPasswordsMatch( false );
                setErrors(( currentErrors ) => [
                    ...currentErrors, 'Passwords must match'
                ])
            }
        }
        const resetErrors = () => {
            setShowErrors( false );
            setErrors([]);
        }
        resetErrors();
        validateForm();
    }, [ currentPassword, newPassword, newPassword2 ]);

    useEffect(() => {
        if( newPasswordValid && passwordsMatch ) {
            setFormValid( true );
        } else {
            setFormValid( false );
        }
    }, [ newPasswordValid, passwordsMatch ]);

    const updatePassword = () => {
        if (formValid) {
            setUpdatingMsg('updating password . . .')
            setLoading(true);
            setErrors([]);
            axios.post(`${BASE_URL}/account/password_change`, {
                'current_password':currentPassword,
                'new_password':newPassword,
            }, { headers: {
                'X-CSRFToken':csrfToken,
                'Content-Type':'multipart/form-data'
            }})
            .then(( resp ) => {
                if( resp.data == true ) {
                    setUpdatingMsg('Success, redirecting to login . . .');
                    setTimeout(() => {
                        localStorage.removeItem('user');
                        window.dispatchEvent(new Event('storage'));
                        navigate('/login');
                    }, 1700);
                } else {
                    setUpdatingMsg();
                    setLoading(false);
                    setErrors(( currentErrors ) => [
                        ...currentErrors, 'Current password is incorrect'
                    ]);
                    setShowErrors( true );
                }
            })
            .catch(( error ) => {
                console.log( error );
            });
        } else {
            setShowErrors( true );
        }
    }

    return (
        <div className={'changepassword-container'}>

            <div className={'changepassword-form-container'}>

                <div className={'changepassword-header'}>

                    Change Password

                </div>

                { updatingMsg ? 

                    <div className={'changepassword-success-container'}>

                        <LoadingCircle size={23} animated={true}/>

                        { updatingMsg }

                    </div>

                :

                    null

                }

                { showErrors ? 

                    <div className={'changepassword-error-header'}>
    
                        { errors.map((error, i) => (

                            <div key={i}>

                                {i + 1}. {error}

                            </div>

                        ))}

                    </div>
            
                :

                    null
                
                }

                <div className={'changepassword-form'}>

                    <Input
                        placeholder={'Current Password'}
                        type={'password'}
                        autoFocus={ true }
                        onChange={( e ) => setCurrentPassword( e.target.value )}/>

                    <Input
                        placeholder={'New Password'}
                        type={'password'}
                        onChange={( e ) => setNewPassword( e.target.value )}/>

                    <Input
                        placeholder={'Confirm New Password'}
                        type={'password'}
                        style={{marginBottom:10}}
                        onChange={( e ) => setNewPassword2( e.target.value )}/>

                    <Button
                        text={'Save'}
                        loading={loading}
                        disabled={buttonDisabled}
                        style={{margin:"auto"}}
                        onClick={() => updatePassword()}/>

                </div>

            </div>

        </div>
    
    )
}