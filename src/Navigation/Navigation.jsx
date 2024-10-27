import { useRef, useState, useEffect, startTransition } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BASE_URL, logout} from '../Globals';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import logo from '../_assets/imgs/logocropped.png';
import logoDesktop from '../_assets/imgs/logodesktop.png';
import menuIcon from './imgs/menuicon.svg';
import menuIconClose from './imgs/menuiconclose.svg';
import facebookIcon from './imgs/facebookicon.png';
import facebookIconDark from './imgs/facebookicondark.png';
import mobileIcon from './imgs/mobileicon.svg';
import mobileIconDark from './imgs/mobileicondark.svg';
import emailIcon from './imgs/emailicon.svg';
import emailIconDark from './imgs/emailicondark.svg';
import Switch from '@mui/material/Switch';
import './Navigation.css';

export function Navigation () {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [user, setUser] = useState();
    const [menuDisplay, setMenuDisplay] = useState('none');
    const [currentMenuIcon, setCurrentMenuIcon] = useState(menuIcon);
    const navRef = useRef();
    const menuRef = useRef();
    const mobileLogoRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScreenSize = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleScreenSize);
        return () => window.removeEventListener("resize", handleScreenSize);
    }, []);

    useEffect(() => {
        const handleOutsideAccountMenuClick = (e) => {
            if(menuDisplay == 'block' && menuRef.current &&
                !menuRef.current.contains(e.target) && !navRef.current.contains(e.target)) {
                    setMenuDisplay('none');
                    setCurrentMenuIcon(menuIcon);
                }
        }
        document.addEventListener('click', handleOutsideAccountMenuClick, true);
        if(menuDisplay == "block") {
            setCurrentMenuIcon(menuIconClose);
        } else {
            setCurrentMenuIcon(menuIcon);
        }
        return () => document.removeEventListener('click', handleOutsideAccountMenuClick, true);
    }, [menuDisplay]);

    useEffect(() => {
        setMenuDisplay("none");
    }, [location.pathname]);

    const updateTheme = (theme) => {
        axios.post(`${BASE_URL}/profile/${user.username}/update_profile`, {
            "theme":theme
        }, {
            headers: {
                'Content-Type':'multipart/form-data',
                'X-CSRFToken':csrfToken,
            }
        })
        .catch((e) => console.log(e));
    }

    const setTheme = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {...user, "theme":user.theme == "light" ? "dark":"light"}
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage'));
        updateTheme(updatedUser.theme);
    }

    const CustomSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color:"#87ceeb",
          '&:hover': {
            backgroundColor: alpha("#87ceeb", theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor:"#87ceeb",
        },
    }));

    const Menu = () => {
        return (
            <div
                className={'navigation-menu-container'}
                ref={menuRef}
                style={{display:menuDisplay}}>

                <div
                    className={'navigation-menu-item'}
                    onClick={() => {
                        navigate("/about");
                        setMenuDisplay("none");}}>

                    About Us

                </div>

                <div
                    className={'navigation-menu-item'}
                    onClick={() => {
                        navigate("/services");
                        setMenuDisplay("none");}}>

                    Services

                </div>

                <div
                    className={'navigation-menu-item'}
                    onClick={() => {
                        navigate("/contact");
                        setMenuDisplay("none");}}>

                    Contact Us

                </div>

                <div
                    className={'navigation-menu-item'}
                    onClick={() => {
                        navigate("/portal");
                        setMenuDisplay("none");}}>

                    Client Portal

                </div>

            </div>
        )
    }

    if (screenWidth > 990) {
        return (
            <div className={'navigation-desktop-container'}>

                <div className={'navigation-desktop-parent'}>

                    <div className={'navigation-desktop-child'}>

                        <div className={'navigation-desktop-logo-container'}>

                            <img
                                className={'navigation-desktop-logo'}
                                src={logoDesktop}
                                onClick={() => navigate("/")}/>

                        </div>

                        <div className={'navigation-desktop-menu-container'}>

                            <div
                                className={'navigation-desktop-menu-item'}
                                onClick={() => navigate("/about")}>

                                About Us

                            </div>

                            <div
                                className={'navigation-desktop-menu-item'}
                                onClick={() => navigate("/services")}>

                                Services

                            </div>

                            <div
                                className={'navigation-desktop-menu-item'}
                                onClick={() => navigate("/contact")}>

                                Contact Us

                            </div>

                            <div
                                className={'navigation-desktop-menu-item'}
                                style={{marginLeft:5}}
                                onClick={() => navigate("/portal")}>

                                Client Portal

                            </div>

                        </div>

                    </div>

                    <div className={'navigation-desktop-contacts-container'}>

                        <div
                            className={'navigation-desktop-contact'}
                            onClick={() => window.location.href = "https://www.facebook.com/people/OakLinx/61567673551189/"}>

                            <div className={'navigation-desktop-contact-icon-container'}>

                                <img
                                    className={'navigation-desktop-contact-icon'}
                                    src={facebookIcon}/>
                                    
                            </div>

                            <div className={'navigation-desktop-contact-text'}>

                                Facebook

                            </div>

                        </div>

                        <div className={'navigation-desktop-contact'}>

                            <div className={'navigation-desktop-contact-icon-container'}>

                                <img
                                    className={'navigation-desktop-contact-icon'}
                                    src={emailIcon}/>
                                    
                            </div>

                            <div className={'navigation-desktop-contact-text'}>

                                info@oaklinx.com

                            </div>

                        </div>

                        <div className={'navigation-desktop-contact'}>

                            <div className={'navigation-desktop-contact-icon-container'}>

                                <img
                                    className={'navigation-desktop-contact-icon'}
                                    src={mobileIcon}/>
                                    
                            </div>

                            <div className={'navigation-desktop-contact-text'}>

                                555-555-5555

                            </div>

                        </div>

                    </div>

                </div>

                <img
                    className={'navigation-preload-logo'}
                    src={logoDesktop}/>

                <img
                    className={'navigation-preload-logo'}
                    src={logoDesktop}/>

            </div>
        )
    }
   
    return (
        <div className={'navigation-container'}>

            <div
                className={'navigation-parent'}
                ref={navRef}
                onClick={() => setMenuDisplay(menuDisplay == "none" ? "block":"none")}>

                <div
                    className={'navigation-menuicon-container'}>
                    
                    <img
                        className={'navigation-menuicon'}
                        src={currentMenuIcon}/>

                </div>

                <div className={'navigation-logo-container'}>

                    <img
                        className={'navigation-logo'}
                        ref={mobileLogoRef}
                        src={logo}
                        onClick={() => navigate("/")}/>

                </div>

            </div>

            <div className={'navigation-contacts-container'}>

                <div
                    className={'navigation-contact'}
                    onClick={() => window.location.href = "https://www.facebook.com/people/OakLinx/61567673551189/"}>

                    <div className={'navigation-contact-icon-container'}>

                        <img
                            className={'navigation-contact-icon'}
                            src={facebookIconDark}/>
                            
                    </div>

                    <div className={'navigation-contact-text'}>

                        Facebook

                    </div>

                </div>

                <div className={'navigation-contact'}>

                    <div className={'navigation-contact-icon-container'}>

                        <img
                            className={'navigation-contact-icon'}
                            src={emailIconDark}/>
                            
                    </div>

                    <div className={'navigation-contact-text'}>

                        info@oaklinx.com

                    </div>

                </div>

                <div className={'navigation-contact'}>

                    <div className={'navigation-contact-icon-container'}>

                        <img
                            className={'navigation-contact-icon'}
                            src={mobileIconDark}/>
                            
                    </div>

                    <div className={'navigation-contact-text'}>

                        555-555-5555

                    </div>

                </div>

            </div>

            <Menu/>

            <img
                className={'navigation-preload-logo'}
                src={logoDesktop}/>

            <img
                className={'navigation-preload-logo'}
                src={logoDesktop}/>

            <img
                className={'navigation-preload-logo'}
                src={menuIconClose}/>

            <img
                className={'navigation-preload-logo'}
                src={facebookIconDark}/>

            <img
                className={'navigation-preload-logo'}
                src={mobileIconDark}/>

            <img
                className={'navigation-preload-logo'}
                src={emailIconDark}/>

        </div>
    );
}