import { useState, useEffect } from 'react';
import loadingCircleLight from '../../../_assets/imgs/refreshlightmode.png';
import loadingCircleDark from '../../../_assets/imgs/refreshdarkmode.png';
import loadingCircleActive from '../../../_assets/imgs/refreshactive.png';
import './LoadingCircle.css';

export function LoadingCircle ({mode, size, style, animated}) {
    const [loadingCircle, setLoadingCircle] = useState();
    const [theme, setTheme] = useState();

    useEffect(() => {
        const updateTheme = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {setTheme(user.theme)};
        }
        window.addEventListener("storage", updateTheme);
        updateTheme();
        return () => window.removeEventListener("storage", updateTheme);
    }, []);

    useEffect(() => {
        switch (mode ? mode : theme) {
            case "light":
                setLoadingCircle(loadingCircleLight);
                break

            case "dark":
                setLoadingCircle(loadingCircleDark);
                break

            case "active":
                setLoadingCircle(loadingCircleActive);
            break
            
            default:
                setLoadingCircle(loadingCircleActive);
        }
    }, [mode, theme]);

    return (
        <div className={'loadingcircle-container'}>

            <img
                className={'loadingcircle-icon'}
                src={loadingCircle}
                style={{
                    width:size,
                    height:size,
                    animation:animated ? null : "none"}}/>

        </div>
    )
}