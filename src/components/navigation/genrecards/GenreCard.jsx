import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./GenreCard.module.css";

const GenreCard = (props) => {
    const navigate = useNavigate(); //Hook used to navigate
    return (
        <div
            className={"card bg-dark text-white shadow " + classes.gcard}
            onClick={(event) => {
                event.preventDefault();
                navigate(`/searchresults?genre=${props.name.toLowerCase()}`); //Navigating to search results page
            }}
            style={{ cursor: "pointer" }}
        >
            <img src={props.link} className="card-img" alt="..." />
            <div className={"card-img-overlay " + classes.genre}>
                <h5 className="card-title">{props.title}</h5>
            </div>
        </div>
    );
};

export default GenreCard;
