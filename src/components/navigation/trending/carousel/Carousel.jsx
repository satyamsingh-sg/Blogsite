import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import classes from "./Carousel.module.css";
import Card from "../card/Card";

const LeftArrow = (props) => {
    //Left arrow custom ui
    const { className, onClick } = props;
    return props.currentSlide !== 0 ? (
        <div
            className={className + " " + classes.arrow + " " + classes.left}
            onClick={onClick}
        >
            <KeyboardArrowLeft style={{ color: "#5CDB95", fontSize: "3rem" }} />
        </div>
    ) : (
        <div></div>
    );
};

const RightArrow = (props) => {
    //Right arrow custom ui
    const { className, onClick } = props;
    return props.currentSlide !== 6 ? (
        <div
            className={className + " " + classes.arrow + " " + classes.right}
            onClick={onClick}
        >
            <KeyboardArrowRight
                style={{ color: "#5CDB95", fontSize: "3rem" }}
            />
        </div>
    ) : (
        <div></div>
    );
};

const Carousel = (props) => {
    //Carousel component
    let settings = {
        prevArrow: <LeftArrow />,
        nextArrow: <RightArrow />,
        infinite: false,
        arrows: true,
        slidesToShow: props.slidesToShow,
        slidesToScroll: 1,
        speed: 100,
        dots: false,
        initialSlide: 0,
    };
    return (
        <Slider {...settings}>
            {props.data.map((value) => {
                return props.className === "trendcard" ? (
                    <Card
                        key={value.postId}
                        className={props.className}
                        id={value.postId}
                        link={value.imageUrl}
                        title={value.postTitle}
                        content={value.postSummary}
                        theme={props.theme}
                    />
                ) : (
                    <Card
                        key={value}
                        className={props.className}
                        link={value.link}
                        title={value.title}
                        content={value.content}
                        theme={props.theme}
                    />
                );
            })}
        </Slider>
    );
};

export default Carousel;
