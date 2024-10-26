import './MessengerSkeleton.css';

export function MessengerSkeleton ({ component, childComponent }) {
    if (childComponent) {
        return (
            <>
                {[...Array(4)].map(( _, i ) => (

                    <div
                        key={ i }
                        className={'messenger-skeleton-chat-card'}>

                        <div className={'messenger-skeleton-chat-card-image-container'}>

                            <div className={'messenger-skeleton-chat-card-image-child'}/>

                        </div>

                        <div className={'messenger-skeleton-chat-card-username-container'}>

                            <div className={'messenger-skeleton-chat-card-username'}/>

                            <div className={'messenger-skeleton-chat-card-last-message'}/>

                        </div>

                        <div className={'messenger-skeleton-chat-card-last-message-date'}/>

                    </div>

                ))}

            </>
        )
    }

    return (
        <div className={'messenger-skeleton-container'}>

            <div className={'messenger-skeleton-header'}>

                <div className={'messenger-skeleton-header-label'}>
                    
                    <div className={'messenger-skeleton-header-label-child'}/>

                </div>

                <div
                    className={'messenger-skeleton-compose-button-container'}>

                    <div className={'messenger-skeleton-compose-child'}/>

                </div>

                <div
                    className={'messenger-skeleton-settings-icon-container'}>

                    <div className={'messenger-skeleton-settings-child'}/>

                </div>

            </div>

            <div className={'messenger-skeleton-search-input-container'}>

                <div
                    className={'messenger-skeleton-close-icon-container'}>

                    <div></div>

                </div>

            </div>

            <div className={'messenger-skeleton-chats'}>

                <div className={'messenger-skeleton-refresh-icon-container'}>

                    <div className={'messenger-skeleton-refresh-child'}/>

                </div>

                {[...Array(4)].map(( _, i ) => (

                    <div
                        key={ i }
                        className={'messenger-skeleton-chat-card'}>

                        <div className={'messenger-skeleton-chat-card-image-container'}>

                            <div className={'messenger-skeleton-chat-card-image-child'}/>

                        </div>

                        <div className={'messenger-skeleton-chat-card-username-container'}>

                            <div className={'messenger-skeleton-chat-card-username'}/>

                            <div className={'messenger-skeleton-chat-card-last-message'}/>

                        </div>

                        <div className={'messenger-skeleton-chat-card-last-message-date'}/>

                    </div>

                ))}

            </div>

        </div>
    )
}