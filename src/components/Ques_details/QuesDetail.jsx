import * as React from "react";
import Leftq from "./leftq/leftq";
import Rightq from "./rightq/rightq";
import Middleq from "./middleq/middleq";
import Footer from "../footer/Footer";

const Quesdetails = (props) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2" style={{ marginTop: "2em" }}>
                        <Leftq />
                    </div>
                    <div className="col-7" style={{ marginTop: "2em" }}>
                        <Middleq />
                    </div>
                    <div className="col-3" style={{ marginTop: "2em" }}>
                        <Rightq />
                    </div>
                </div>
            </div>
            <br />
            <Footer />
        </>
    );
};

export default Quesdetails;
