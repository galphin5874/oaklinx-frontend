import { useEffect, useState } from "react";
import { BASE_URL, getCsrfToken } from "../../Globals";
import { Input, Button } from "../../_components/UI/UI";
import { LoadingCircle } from '../../_components/Loading/LoadingCircle/LoadingCircle';
import axios from "axios";
import Cookies from "universal-cookie";
import './UpdateEmail.css';

export default function UpdateEmail() {
    const [csrfToken, setCsrfToken] = useState();
    const [user, setUser] = useState();
    const [email, setEmail ] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const [showErrors, setShowErrors] = useState( false );
    const [updatingEmail, setUpdatingEmail] = useState(false);
    const [updatingMsg, setUpdatingMsg] = useState('');
    const [emailUpdated, setEmailUpdated] = useState( false );
    const cookies = new Cookies();

    useEffect(() => {
        getCsrfToken()
        .then((resp) => setCsrfToken(resp));
    }, []);

    useEffect(() => {
        setShowErrors(false);
        const charsAfterAt = email.substring(email.indexOf("@") + 1);
        if (email.includes('@') && charsAfterAt.length >= 5) {
            if (email.includes('.com') || email.includes('.net') ||
                email.includes('.org')) {
                setIsValid(true);
            } else {
                setIsValid(false);
                setError("Valid address required.");
            }
        } else {
            setIsValid(false);
            setError("Valid address required.");
        }
        setEmailUpdated(false);
    }, [email]);  

    const updateEmail = () => {
        setButtonDisabled(true);
        setShowErrors(false);
        setUpdatingMsg("updating email . . .");
        setUpdatingEmail(true);
        axios.post(`${BASE_URL}/account/update_email`, {
            'new_email':email,
        }, { headers: {
            'X-CSRFToken':csrfToken,
            'Content-Type':'multipart/form-data'
        }})
        .then((resp) => {
            setButtonDisabled(false);
            setUpdatingEmail(false);
            if(resp.data == 'success') {
                setUpdatingMsg(`Email address successfully updated to ${email}`);
                setEmailUpdated(true);
            } else {
                setError("An account with this email already exists");
                setShowErrors(true);
            }
        })
        .catch((e) => {
            console.log(e);
            setUpdatingEmail(false);
        });
    }

    return (
        <div className={'updateemail-container'}>

            <div className={'updateemail-form-container'}>

                <div className={'updateemail-header'}>

                    Update Email

                </div>

                { updatingEmail ?

                    <div className={'updateemail-success-container'}>

                        <LoadingCircle size={23} animated={true}/>

                        { updatingMsg }

                    </div>

                :

                    null

                }

                { showErrors ? 

                    <div className={'updateemail-error-header'}>
    
                        {error}

                    </div>
            
                :

                    null
                
                }

                { emailUpdated ? 

                    <div className={'updateemail-success-container'}>

                        { updatingMsg }

                    </div>

                :

                    null

                }

                <div className={'updateemail-form'}>

                    <Input
                        placeholder={'Email address'}
                        type={'email'}
                        autoFocus={true}
                        style={{marginBottom:8, marginTop:8}}
                        onChange={(e) => setEmail(e.target.value)}/>

                    <Button
                        text={'Update'}
                        disabled={buttonDisabled}
                        style={{margin:'auto'}}
                        onClick={() => isValid ? updateEmail():setShowErrors(true)}/>

                </div>

            </div>

        </div>
    
    )
}