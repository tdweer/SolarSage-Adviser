import * as React from "react";

function AxAdminDashCard({TITLE, VALUE, IMG}) {
    return (
        <div className={"w260px h180px bg-white adminCard"}>
            <div className={"w100 h30 bg-mainColor adminCardHeader container"}>
                <h2 className={"f_white fontPoppins-Light"}> {TITLE} </h2>
            </div>

            <div className={"w100 mt-2 h65 container"}>
                <div className={"w55 h100  container"}>
                    <h1 className={"fontPoppins f_mainColor fs-45px"}> {VALUE} </h1>
                </div>

                <div className={"w35 h100 container"}>
                    <div className={"adminCardIconDiv container"}>
                        <img className={"w85"} src={IMG} alt="admin_card_img"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AxAdminDashCard;
