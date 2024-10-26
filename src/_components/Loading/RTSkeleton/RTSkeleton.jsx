import "./RTSkeleton.css";

export function RTSkeleton ({ component, childComponent }) {
    return (
        <div className={'rtskeleton-container'}>
            
            { childComponent != "reply" ?

                <>

                    <div className={"rtskeleton-header-container"}>

                        <div className={"rtskeleton-header-component-title"}/>

                        <div className={"rtskeleton-header-close-button"}/>

                    </div>

                    <div className={"rtskeleton-title-input"}/>

                </>

            :

                null
            
            }

            <div className={"rtskeleton-buttons-container"}>

                <div className={"rtskeleton-button"}/>

                <div className={"rtskeleton-button"}/>

                <div className={"rtskeleton-button"}/>

            </div>

            <div className={"rtskeleton-body"}/>

        </div>
    )
}