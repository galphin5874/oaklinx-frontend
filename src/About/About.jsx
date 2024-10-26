import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, MEDIA_URL } from '../Globals.jsx';
import './About.css';

export function About () {
    return (
        <div className={'about-container'}>

            <div
                className={'about-header'}
                style={{backgroundImage:`url(${MEDIA_URL}/static/aboutheaderimg.jpg)`}}>

                <div className={'about-header-title'}>

                    About Us

                </div>

            </div>

        </div>
    )
}