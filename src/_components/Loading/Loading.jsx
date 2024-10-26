import '../Loading/Loading.css';

function Loading( { msg, fade, duration, progressCircleOnly, size } ) {
    return (
        <div className={'loading-container'} >
                
            <div className="loadingio-spinner-spinner-nq4q5u6dq7r">
                <div className="ldio-x2uulkbinbj">
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                </div>
            </div>
                
            { msg ? 
            
                <div className={'loading-message'}>

                    {`${msg}`}

                </div>
        
            :
            
                null  

            }

        </div>
        
    );
}

export default Loading;