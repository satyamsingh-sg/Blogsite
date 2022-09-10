import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import classes from "./Signup.module.css";
import signinimg from "../../../assets/images/Signin.png";
import { useReducer } from "react";
import { signupAction } from "../../../store/auth-actions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Reducer for signup validation
const signupReducer = (state, action) => {
    // Email validation
    if (action.type === "EMAIL") {
        return {
            ...state,
            email: action.payload,
            emailIsValid: action.payload.includes("@"),
            formIsValid:
                !state.firstNameIsEmpty &&
                !state.lastNameIsEmpty &&
                action.payload.includes("@") &&
                state.passwordIsValid &&
                state.passwordIsMatching,
        };
    }
    // Password validation
    if (action.type === "PASSWORD") {
        const passValid =
            action.payload.trim().length > 6 &&
            /[a-z]/.test(action.payload.trim()) &&
            /[A-Z]/.test(action.payload.trim()) &&
            /[0-9]/.test(action.payload.trim()) &&
            /[^a-zA-Z0-9]/.test(action.payload.trim());
        const formValid =
            !state.firstNameIsEmpty &&
            !state.lastNameIsEmpty &&
            state.emailIsValid &&
            passValid &&
            action.payload === state.confirmPassword;
        return {
            ...state,
            password: action.payload,
            passwordIsValid: passValid,
            formIsValid: formValid,
            passwordIsMatching:
                passValid && action.payload === state.confirmPassword,
        };
    }
    // Password validation
    if (action.type === "CONFIRM_PASSWORD") {
        return {
            ...state,
            confirmPassword: action.payload,
            passwordIsMatching:
                state.passwordIsValid && action.payload === state.password,
            formIsValid:
                !state.firstNameIsEmpty &&
                !state.lastNameIsEmpty &&
                state.emailIsValid &&
                state.passwordIsValid &&
                action.payload === state.password,
        };
    }
    // Firstname validation
    if (action.type === "FIRSTNAME") {
        return {
            ...state,
            firstname: action.payload,
            firstNameIsEmpty: !action.payload.trim().length > 0,
            formIsValid:
                action.payload.trim().length > 0 &&
                !state.lastNameIsEmpty &&
                state.emailIsValid &&
                state.passwordIsValid &&
                state.passwordIsMatching,
        };
    }
    // Lastname validation
    if (action.type === "LASTNAME") {
        return {
            ...state,
            lastname: action.payload,
            lastNameIsEmpty: !action.payload.trim().length > 0,
            formIsValid:
                !state.firstNameIsEmpty &&
                action.payload.trim().length > 0 &&
                state.emailIsValid &&
                state.passwordIsValid &&
                state.passwordIsMatching,
        };
    }
    return {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstNameIsEmpty: null,
        lastNameIsEmpty: null,
        emailIsValid: null,
        passwordIsValid: null,
        passwordsIsMatching: null,
        formIsValid: null,
    };
};

const Signup = (props) => {
    const navigate = useNavigate(); //Navigation hook for navigating user
    const dispatchAction = useDispatch(); //Dispatch hook for sending redux state updates
    const [isEmailExists, setIsEmailExists] = useState(false); //Initial states
    const initState = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstNameIsEmpty: null,
        lastNameIsEmpty: null,
        emailIsValid: null,
        passwordIsValid: null,
        passwordsIsMatching: null,
        formIsValid: null,
    };
    const [showPass, setShowPass] = useState(false);
    const showPassHandler = () => {
        setShowPass(!showPass);
    };
    const [state, dispatch] = useReducer(signupReducer, initState);

    // Form handlers each for each input field
    const firstNameHandler = (event) =>
        dispatch({ type: "FIRSTNAME", payload: event.target.value });
    const lastNameHandler = (event) =>
        dispatch({ type: "LASTNAME", payload: event.target.value });
    const emailHandler = (event) =>
        dispatch({ type: "EMAIL", payload: event.target.value });
    const passwordHandler = (event) =>
        dispatch({ type: "PASSWORD", payload: event.target.value });
    const confirmPasswordHandler = (event) =>
        dispatch({ type: "CONFIRM_PASSWORD", payload: event.target.value });

    // Form submit handler
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (state.formIsValid) {
            props.onSubmit(true);
            dispatchAction(
                signupAction(
                    state.email,
                    state.password,
                    state.firstname,
                    state.lastname
                )
            ).then((res) => {
                if (res === "success") {
                    props.onSubmit(false);
                    navigate("/home/post", { replace: true });
                }
                if (res === "EMAIL_EXISTS") {
                    props.onSubmit(false);
                    setIsEmailExists(true);
                }
            });
            dispatch({ type: "clear" });
        } else {
        }
    };

    return (
        <>
            {props.display && (
                <motion.div
                    initial={{ x: "100vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={"container shadow-lg " + classes.signup}
                >
                    <h1>Signup</h1>
                    <form onSubmit={formSubmitHandler}>
                        <div className="row">
                            <div className="col-md-6">
                                <div
                                    className={`mb-3 ${
                                        state.firstNameIsEmpty === true
                                            ? classes.invalid
                                            : ""
                                    } ${
                                        state.firstNameIsEmpty === false
                                            ? classes.valid
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Firstname"
                                        value={state.firstname}
                                        onChange={firstNameHandler}
                                        required
                                    />
                                    {state.firstNameIsEmpty === true && (
                                        <span
                                            style={{
                                                fontSize: "0.8em",
                                                color: "red",
                                            }}
                                        >
                                            This is a required field
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div
                                    className={`mb-3 ${
                                        state.lastNameIsEmpty === true
                                            ? classes.invalid
                                            : ""
                                    } ${
                                        state.lastNameIsEmpty === false
                                            ? classes.valid
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Lastname"
                                        value={state.lastname}
                                        onChange={lastNameHandler}
                                        required
                                    />
                                    {state.lastNameIsEmpty === true && (
                                        <span
                                            style={{
                                                fontSize: "0.8em",
                                                color: "red",
                                            }}
                                        >
                                            This is a required field
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`mb-3 ${
                                    state.emailIsValid === false
                                        ? classes.invalid
                                        : ""
                                } ${
                                    state.emailIsValid === true
                                        ? classes.valid
                                        : ""
                                }`}
                            >
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    value={state.email}
                                    onChange={emailHandler}
                                    required
                                />
                                {state.emailIsValid === false && (
                                    <span
                                        style={{
                                            fontSize: "0.8em",
                                            color: "red",
                                        }}
                                    >
                                        Invalid Email Address
                                    </span>
                                )}
                                {isEmailExists === true && (
                                    <span
                                        style={{
                                            fontSize: "0.8em",
                                            color: "red",
                                        }}
                                    >
                                        Email already registered
                                    </span>
                                )}
                            </div>
                            <div
                                className={`mb-3 ${
                                    state.passwordIsValid === false
                                        ? classes.invalid
                                        : ""
                                } ${
                                    state.passwordIsValid === true
                                        ? classes.valid
                                        : ""
                                } `}
                            >
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    value={state.password}
                                    onChange={passwordHandler}
                                    aria-label="Password"
                                    aria-describedby="button-addon2"
                                    required
                                />
                                {state.passwordIsValid === false && (
                                    <span
                                        style={{
                                            fontSize: "0.8em",
                                            color: "red",
                                        }}
                                    >
                                        Password should be minimum 6 charachters
                                        and it should contain atleast 1
                                        uppercase, 1 lowercase, 1 number and 1
                                        special charachter
                                    </span>
                                )}
                            </div>
                            <div
                                className={`input-group mb-3 ${
                                    state.passwordIsMatching === false
                                        ? classes.invalid
                                        : ""
                                } ${
                                    state.passwordIsMatching === true
                                        ? classes.valid
                                        : ""
                                } `}
                            >
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={state.confirmPassword}
                                    onChange={confirmPasswordHandler}
                                    aria-label="Password"
                                    aria-describedby="button-addon3"
                                    required
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
                            {state.passwordIsMatching === false && (
                                <span
                                    style={{ fontSize: "0.8em", color: "red" }}
                                >
                                    Passwords are not matching
                                </span>
                            )}
                            <div className="mb-3">
                                <button
                                    type="submit"
                                    className={"btn btn-primary shadow-none"}
                                    disabled={!state.formIsValid}
                                >
                                    Signup
                                </button>
                            </div>
                            <span>
                                Already have an account?{" "}
                                <Link
                                    to="/auth?code=signin&main=false"
                                    className="link-primary"
                                    replace={true}
                                >
                                    Signin
                                </Link>{" "}
                                here
                            </span>
                        </div>
                    </form>
                </motion.div>
            )}
            {!props.display && (
                <motion.img
                    initial={{ x: "100vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    src={signinimg}
                    alt=""
                    className={classes.signinimg}
                />
            )}
        </>
    );
};

export default Signup;
