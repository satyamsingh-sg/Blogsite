import * as React from "react";
import Leftp from "./leftp/leftp";
import Rightp from "./rightp/rightp";
import Middlep from "./middlep/middlep";
import Footer from "../../footer/Footer";

const Postdetails = (props) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Leftp />
                    </div>
                    <div className="col-7">
                        <Middlep />
                    </div>
                    <div className="col-3">
                        <Rightp />
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default Postdetails;
