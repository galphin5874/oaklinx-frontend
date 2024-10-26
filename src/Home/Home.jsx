import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, MEDIA_URL } from '../Globals.jsx';
import headerImage from './imgs/homeheaderimg.jpg';
import supportServiceIcon from './imgs/supportserviceicon.png';
import cloudServiceIcon from './imgs/cloudserviceicon.png';
import networkServiceIcon from './imgs/networkserviceicon.png';
import securityServiceIcon from './imgs/securityserviceicon.png';
import './Home.css';

export function Home () {
    return (
        <div className={'home-container'}>

            <div
                className={'home-header'}
                style={{backgroundImage:`url(${MEDIA_URL}/static/homeheaderimg.jpg)`}}>

                <div className={'home-header-title'}>

                    Your All-In-One Technology Solution

                </div>

                <div className={'home-header-services-container'}>

                    <div className={'home-header-services-item'}>

                        <div className={'home-header-services-icon-container'}>

                            <img
                                className={'home-header-services-icon'}
                                src={supportServiceIcon}
                            />

                        </div>

                        <div className={'home-header-service'}>

                            IT Support

                        </div>

                    </div>

                    <div className={'home-header-services-item'}>

                        <div className={'home-header-services-icon-container'}>

                            <img
                                className={'home-header-services-icon'}
                                src={networkServiceIcon}
                            />

                        </div>

                        <div className={'home-header-service'}>

                            Network Configurations

                        </div>

                    </div>

                    <div className={'home-header-services-item'}>

                        <div className={'home-header-services-icon-container'}>

                            <img
                                className={'home-header-services-icon'}
                                src={cloudServiceIcon}
                            />

                        </div>

                        <div className={'home-header-service'}>

                            Cloud Infrastructures

                        </div>

                    </div>

                    <div className={'home-header-services-item'}>

                        <div className={'home-header-services-icon-container'}>

                            <img
                                className={'home-header-services-icon'}
                                src={securityServiceIcon}
                            />

                        </div>

                        <div className={'home-header-service'}>

                            Security

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}