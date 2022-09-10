import React from "react";
import classes from "./right.module.css";
// post and Question filter page
const Right = () => {
    return (
        <div>
            <div className={`${classes.fix}`}>
                <div className={`row ${classes.order}`}>
                    <div className="col-md-6">
                        <h6 className="mt-4 fw-bold fs-5">Sort By</h6>
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                for="flexCheckDefault"
                            >
                                block
                            </label>
                        </div>
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                for="flexCheckDefault"
                            >
                                checkbox
                            </label>
                        </div>
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                for="flexCheckDefault"
                            >
                                html
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="mt-4 fw-bold fs-5">Order By</h6>
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                for="flexCheckDefault"
                            >
                                checkbox
                            </label>
                        </div>
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                for="flexCheckDefault"
                            >
                                html
                            </label>
                        </div>
                    </div>
                </div>
                <hr
                    style={{
                        color: "#379683",
                        padding: "1px",
                        marginRight: "20px",
                    }}
                />
                {/* <div className={`  ${classes.fellow}`}>

                    <div className={`${classes.head}`}>
                        <p className={`fw-bold fs-8 `} style={{ color: 'black' }}>People you may know</p>
                    </div>

                    <div className={`row  ${classes.bottom}`}>
                        <div className={`fw-bold ${classes.person} ${classes.person1} shadow`}>
                            <img src="https://picsum.photos/50" alt="img" />
                            <a href='#'>Surya</a>
                        </div>
                        <div className={` fw-bold ${classes.person} shadow`}>
                            <img src="https://picsum.photos/50" alt="img" />
                            <a href='#'>Surya</a>
                        </div>


                    </div>
                    <div className={`row  ${classes.bottom}`}>
                        <div className={`fw-bold ${classes.person} ${classes.person2} shadow`}>
                            <img src="https://picsum.photos/50" alt="img" />
                            <a href='#'>Surya</a>
                        </div>
                        <div className={`fw-bold ${classes.person} shadow`}>
                            <img src="https://picsum.photos/50" alt="img" />
                            <a href='#'>Surya</a>
                        </div>


                    </div>
                    <div className={`${classes.view}`}>
                        <button className={'btn btn-primary ' + classes.a} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">View more</button>
                    </div>


                </div> */}
            </div>
        </div>
    );
};

export default Right;
