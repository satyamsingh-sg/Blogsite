import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signin.module.css";
import signupimg from "../../../assets/images/Signup.png";
import { useDispatch } from "react-redux";
import { signinAction } from "../../../store/auth-actions";
import { motion } from "framer-motion";

// Reducer for signin validation
const signinReducer = (state, action) => {
    // Email Validation
    if (action.type === "EMAIL_ON_CHANGE") {
        return {
            ...state,
            email: action.payload,
            emailIsValid: action.payload.includes("@"),
            formIsValid: action.payload.includes("@") && state.passwordIsValid,
        };
    }
    // Password Validation
    if (action.type === "PASSWORD_ON_CHANGE") {
        return {
            ...state,
            password: action.payload,
            passwordIsValid:
                action.payload.trim().length > 6 &&
                /[a-z]/.test(action.payload.trim()) &&
                /[A-Z]/.test(action.payload.trim()) &&
                /[0-9]/.test(action.payload.trim()) &&
                /[^a-zA-Z0-9]/.test(action.payload.trim()),
            formIsValid:
                state.emailIsValid &&
                action.payload.trim().length > 6 &&
                /[a-z]/.test(action.payload.trim()) &&
                /[A-Z]/.test(action.payload.trim()) &&
                /[0-9]/.test(action.payload.trim()) &&
                /[^a-zA-Z0-9]/.test(action.payload.trim()),
        };
    }
    return {
        email: "",
        password: "",
        emailIsValid: null,
        passwordIsValid: null,
        formIsValid: null,
    };
};

const Signin = (props) => {
    // Navigation hook to redirect user
    const navigate = useNavigate();
    const [creds, setCreds] = useState({
        emailIsCorrect: null,
        passwordIsCorrect: null,
    }); // Creds of the user, stored in state
    const dispatchAction = useDispatch(); // To dispatch the redux state
    const initState = {
        email: "",
        password: "",
        emailIsValid: null,
        passwordIsValid: null,
        formIsValid: null,
    };
    const [showPass, setShowPass] = useState(false);
    // Password change handler
    const showPassHandler = () => {
        setShowPass(!showPass);
    };
    const [state, dispatch] = useReducer(signinReducer, initState);
    // Email handler on every key stroke
    const emailHandler = (event) => {
        dispatch({ type: "EMAIL_ON_CHANGE", payload: event.target.value });
    };
    const passwordHandler = (event) => {
        dispatch({ type: "PASSWORD_ON_CHANGE", payload: event.target.value });
    };

    // Handler to submmit the form after validation
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (state.formIsValid) {
            props.onSubmit(true);
            dispatchAction(signinAction(state.email, state.password)).then(
                (res) => {
                    if (res === "success") {
                        props.onSubmit(false);
                        // Navigating the user after successful signin
                        navigate("/home/post", { replace: true });
                    }
                    if (res === "INVALID_PASSWORD") {
                        // Alerting user for invalid password
                        props.onSubmit(false);
                        setCreds({ ...creds, passwordIsCorrect: false });
                    }
                    if (res === "EMAIL_NOT_FOUND") {
                        // Alerting use for email not found
                        props.onSubmit(false);
                        setCreds({ ...creds, emailIsCorrect: false });
                    }
                }
            );
        } else {
        }
        dispatch({ type: "clear" });
    };

    return (
        <>
            {/* Conditional display  */}
            {props.display && (
                <motion.div
                    initial={{ x: "-100vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={"container shadow-lg " + classes.signin}
                >
                    <h1>Signin</h1>
                    <form onSubmit={formSubmitHandler}>
                        <div
                            className={`mb-3 ${
                                state.emailIsValid === false
                                    ? classes.invalid
                                    : ""
                            } ${
                                state.emailIsValid === true ? classes.valid : ""
                            } `}
                        >
                            <input
                                type="email"
                                className={`form-control`}
                                value={state.email}
                                placeholder="Email address"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                onChange={emailHandler}
                            />
                            {state.emailIsValid === false && (
                                <span
                                    style={{ fontSize: "0.8em", color: "red" }}
                                >
                                    Invalid email! Please include "@"
                                </span>
                            )}
                            {creds.emailIsCorrect === false && (
                                <span
                                    style={{ fontSize: "0.8em", color: "red" }}
                                >
                                    Email not registered !
                                </span>
                            )}
                        </div>
                        <div
                            className={`input-group mb-3 ${
                                state.passwordIsValid === false
                                    ? classes.invalid
                                    : ""
                            } ${
                                state.passwordIsValid === true
                                    ? classes.valid
                                    : ""
                            }`}
                        >
                            <input
                                type={showPass ? "text" : "password"}
                                className={`form-control`}
                                value={state.password}
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="button-addon2"
                                onChange={passwordHandler}
                            />
                            {!showPass && (
                                <button
                                    className="btn border border-1 shadow-none"
                                    type="button"
                                    id="button-addon2"
                                    onClick={showPassHandler}
                                >
                                    <Visibility />
                                </button>
                            )}
                            {showPass && (
                                <button
                                    className="btn border border-1 shadow-none"
                                    type="button"
                                    id="button-addon2"
                                    onClick={showPassHandler}
                                >
                                    <VisibilityOff />
                                </button>
                            )}
                        </div>
                        {state.passwordIsValid === false && (
                            <span style={{ fontSize: "0.8em", color: "red" }}>
                                Password should be minimum 6 charachters and it
                                should contain atleast 1 uppercase, 1 lowercase,
                                1 number and 1 special charachter
                            </span>
                        )}{" "}
                        {creds.passwordIsCorrect === false && (
                            <span style={{ fontSize: "0.8em", color: "red" }}>
                                Wrong password
                            </span>
                        )}{" "}
                        <br />
                        <button
                            type="submit"
                            className="btn btn-primary shadow-none"
                            disabled={!state.formIsValid}
                        >
                            Signin
                        </button>{" "}
                        <br /> <br />
                        <span>
                            New to the application?{" "}
                            <Link
                                to="/auth?code=signup&main=false"
                                className="link-primary"
                                replace={true}
                            >
                                Signup
                            </Link>{" "}
                            here
                        </span>
                    </form>
                </motion.div>
            )}
            {!props.display && (
                <motion.img
                    initial={{ x: "-100vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    src={signupimg}
                    alt=""
                    className={classes.signupimg}
                />
            )}
        </>
    );
};

export default Signin;
