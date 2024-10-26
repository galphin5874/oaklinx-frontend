import { useRef, useState, useEffect, startTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, logout} from '../Globals';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import logo from '../_assets/imgs/logocropped.png';
import logoDesktop from '../_assets/imgs/logodesktop2.png';
import menuIcon from './imgs/menuicon.svg';
import menuIconClose from './imgs/menuiconclose.svg';
import mobileIcon from './imgs/mobileicon.svg';
import emailIcon from './imgs/emailicon.svg';
import Switch from '@mui/material/Switch';
import './Navigation.css';

export function Navigation () {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [user, setUser] = useState();
    const [menuDisplay, setMenuDisplay] = useState('none');
    const [currentMenuIcon, setCurrentMenuIcon] = useState(menuIcon);
    const navRef = useRef();
    const menuRef = useRef();
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

                <div className={'navigation-menu-item'}>

                    About Us

                </div>

                <div className={'navigation-menu-item'}>

                    Services

                </div>

                <div className={'navigation-menu-item'}>

                    Contact Us

                </div>

                <div className={'navigation-menu-item'}>

                    Client Portal

                </div>

            </div>
        )
    }

    if (screenWidth > 990) {
        return (
            <div className={'navigation-desktop-container'}>

                <div className={'navigation-desktop-parent'}>

                    <div className={'navigation-desktop-logo-container'}>

                        <img
                            className={'navigation-desktop-logo'}
                            src={logoDesktop}/>

                    </div>

                    <div className={'navigation-desktop-menu-container'}>

                        <div className={'navigation-desktop-menu-item'}>

                            About Us

                        </div>

                        <div className={'navigation-desktop-menu-item'}>

                            Services

                        </div>

                        <div className={'navigation-desktop-menu-item'}>

                            Contact Us

                        </div>

                        <div
                            className={'navigation-desktop-menu-item'}
                            style={{marginLeft:5}}>

                            Client Portal

                        </div>

                    </div>

                </div>

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
                        src={logo}/>

                </div>

            </div>

            <Menu/>

        </div>
    );
}