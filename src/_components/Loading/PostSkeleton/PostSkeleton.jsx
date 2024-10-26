import './PostSkeleton.css';

export function PostSkeleton ({}) {
    return (
        <>

            {[...Array(7)].map((_, i) => (

                <div key={i} className={'post-skeletoncard-container'}>
                    
                    <div className={'post-skeletoncard-header'}>
        
                        <div
                            className={'post-skeletoncard-header-author-container'}>
            
                            <div>

                                <div
                                    className={'post-skeletoncard-header-author-img'}/>
                            
                            </div>
            
                            <div className={'post-skeletoncard-header-author-username-container'}>
            
                                <div className={'post-skeletoncard-header-author-username'}>

                                    <div className={'post-skeletoncard-header-author-username-span'}/>
                                        
                                </div>
                                    
                                <div className={'post-skeletoncard-header-created-date-container'}>
            
                                    <div className={'post-skeletoncard-header-created-date'}/>
            
                                </div>
            
                            </div>
            
                        </div>
        
                        <div className={'post-skeletoncard-header-author-stats-container'}>
            
                            <div className={'post-skeletoncard-header-author-join-date'}/>
            
                            <div className={'post-skeletoncard-header-author-post-count'}/>
            
                            <div className={'post-skeletoncard-header-author-reputation'}/>
            
                            <div className={'post-skeletoncard-header-report-post'}>

                                <div className={'post-skeletoncard-skelentoncard-post-child'}/>
            
                            </div>
            
                        </div>
        
                    </div>

                    <div className={'post-skeletoncard-body'}>

                        <div className={'post-skeletoncard-body-child'}/>

                        <div className={'post-skeletoncard-body-child'}/>

                        <div className={'post-skeletoncard-body-child-3'}/>

                        <div className={'post-skeletoncard-body-child-3'}/>

                    </div>

                    <div className={'post-skeletoncard-footer'}>

                        <div className={'post-skeletoncard-footer-like'}>

                            <button className={'post-skeletoncard-footer-like-button'}/>

                            <div className={'post-skeletoncard-footer-like-count'}/>

                        </div>

                        <div className={'post-skeletoncard-footer-options'}>

                            <div className={'post-skeletoncard-options-child'}/>

                        </div>

                    </div>

                </div>

            ))}

        </>
    )
}