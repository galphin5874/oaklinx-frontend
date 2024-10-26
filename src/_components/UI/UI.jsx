import { Link as ReactLink } from 'react-router-dom';
import buttonLoadingCircle from '../../_assets/imgs/loadingcircle.png';
import loadingCircle from '../../_assets/imgs/loadingcirclesvg.svg';
import './UI.css';


export function Input ({type, style, placeholder, value, autoFocus, autoComplete, onChange, onKeyDown}) {
    return (
        <input
            className={'UI-input'}
            type={type}
            value={value}
            style={style}
            placeholder={placeholder}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={onChange}
            onKeyDown={onKeyDown}/>
    )
}

export function Button ({text, style, onClick, disabled, loading, onKeyDown}) {
    return (
        <button
            className={'UI-button'}
            disabled={disabled}
            style={style}
            onClick={onClick}
            onKeyDown={onKeyDown}>

            <div
                className={'UI-button-text'}
                style={{display:loading ? 'none':'flex'}}>

                {text}

            </div>

            <div className={'UI-button-loading-circle-container'}
                style={{display:loading ? 'flex':'none'}}>

                <img
                    className={'UI-button-loading-circle-icon'}
                    src={buttonLoadingCircle}/>

            </div>

        </button>
    )
}

export function Link({text, to, style}) {
    return (
        <ReactLink
            className={'UI-link'}
            style={style}
            to={to}>

            {text}

        </ReactLink>
    )
}

export function LoadingCircle({style}) {
    return (
        <img
            className={"UI-loading-circle"}
            src={loadingCircle}
            style={style}/>
    )
}