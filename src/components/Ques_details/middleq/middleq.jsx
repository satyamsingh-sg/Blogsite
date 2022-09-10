import * as React from "react";
//import { Avatar, Hidden } from '@mui/material'
import classes from "./middleq.module.css";
import Middle from "./Middle";
import Last from "./Last";
import { useSelector } from "react-redux";

const Middleq = (props) => {
    const questiondata = useSelector((state) => state.question); // using selector to get the data from the store
    return (
        <div
            className="container-fluid shadow"
            style={{
                backgroundColor: "white",
                marginTop: "1em",
                marginBottom: "1em",
                padding: "1em",
                borderRadius: "8px",
            }}
        >
            <div className="row" style={{ height: "150px" }}>
                <div className="col">
                    <div className={classes.middleheader}>
                        <h3>
                            <b>{questiondata.question}</b>
                        </h3>
                    </div>
                    <div className="row" style={{ paddingTop: "0.5em" }}>
                        <div className="col-12">
                            <div style={{ fontSize: "1em" }}>
                                <b>Asked on</b>
                                {"  "}
                                <b style={{ color: "green" }}>
                                    {questiondata.publishedDate}
                                </b>{" "}
                                {"  "} by {"  "}{" "}
                                <b style={{ color: "blue" }}>
                                    {questiondata.author}
                                </b>
                            </div>
                        </div>
                        {/* <div className="col-3">
                            <div className={classes.subhead}>
                                <b>Views</b>  {questiondata.likes}
                            </div>
                        </div> */}
                        {/* <div className="col-6">
                            <div style={{textAlign:"right"}}>
                                <button className="btn btn-primary" className={classes.button1}><div>Close thread</div></button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <hr />
            <div className="row" style={{ height: "360px" }}>
                <div className="col">
                    {" "}
                    {/*Till above is the question details like asked on and posted by*/}
                    <Middle />{" "}
                    {/*Here we are importing the question and question description  part*/}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col">
                    <Last
                        profileData={props.profileData}
                        theRef={props.theRef}
                    />{" "}
                    {/*Here we are importing the comments for the posted question printing component*/}
                </div>
            </div>
        </div>
    );
};

export default Middleq;
