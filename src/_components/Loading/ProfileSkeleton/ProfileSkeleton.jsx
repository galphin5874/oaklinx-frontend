import './ProfileSkeleton.css';

export function ProfileSkeleton ({ component, childComponent }) {
    if (childComponent) {
        return (
            <div className={'profile-data-skeleton-container'}>

                {[...Array(4)].map(( _, i ) => (

                    <div
                        key={i}
                        className={'profile-data-skeleton-item'}/>

                ))}

            </div>
        )
    }

    return (
        <div className={'profile-skeleton-content'}>

            <div className={'profile-skeleton-content-container'}>

                <div className={'profile-skeleton-header-container'}>

                    <div className={'profile-skeleton-header-user-image-container'}>

                        <div className={'profile-skeleton-user-image'}/>

                    </div>

                </div>

            </div>

            <div className={'profile-skeleton-stats-container'}>

                <div className={'profile-skeleton-stats-item'}/>

                <div className={'profile-skeleton-stats-item'}/>

                <div className={'profile-skeleton-stats-item'}/>

            </div>

            <div className={'profile-skeleton-menu-container'}>

                <div className={'profile-skeleton-menu-item'}/>

                <div className={'profile-skeleton-menu-item'}/>

                <div className={'profile-skeleton-menu-item'}/>

            </div>

        </div>
    )
}