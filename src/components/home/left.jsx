import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./left.module.css";
const Left = () => {
    const classname = (navData) =>
        navData.isActive ? `fw-bold fs-8 ${classes.active}` : `fw-bold fs-8`;
    const navigate = useNavigate();
    // Home page list item
    return (
        <div>
            <ul className={`${classes.list}`}>
                <li>
                    <NavLink
                        to={"post"}
                        className={classname}
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("post", { replace: true });
                        }}
                    >
                        Posts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"question"}
                        className={classname}
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("question", { replace: true });
                        }}
                    >
                        Forums
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"recents"}
                        className={classname}
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("recents", { replace: true });
                        }}
                    >
                        Recent Activity
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"saved"}
                        className={classname}
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("saved", { replace: true });
                        }}
                    >
                        Saved for Later
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Left;
