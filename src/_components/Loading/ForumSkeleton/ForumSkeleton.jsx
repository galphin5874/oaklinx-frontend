import './ForumSkeleton.css';

export function ForumSkeleton ({}) {
    return (
        <div className={'categories-skeletoncard-page-container'}>

            {[...Array(4)].map((_, i) => (

                <div
                    key={i}
                    className={'categories-skeletoncard-container'}>

                    <div className={'categories-skeletoncard-header'}>

                        <div className={'categories-skeletoncard-new-post'}>

                            <div className={'categories-skeletoncard-new-post-child'}/>

                        </div>

                        <div className={'categories-skeletoncard-name'}>

                            <div className={'categories-skeletoncard-name-child'}/>

                        </div>

                        <div className={'categories-skeletoncard-thread-count'}>

                            <div className={'categories-skeletoncard-thread-count-child'}/>
                                
                            <div className={'categories-skeletoncard-thread-count-child-2'}/>
                            
                        </div>

                        <div className={'categories-skeletoncard-post-count'}>

                            <div className={'categories-skeletoncard-post-count-child'}/>
                                
                            <div className={'categories-skeletoncard-post-count-child-2'}/>
                            
                        </div>

                    </div>

                    <div className={'categories-skeletoncard-last-post'}>

                        <div className={'categories-skeletoncard-last-post-child'}/>

                    </div>

                </div>

            ))}

            </div>
    )

}