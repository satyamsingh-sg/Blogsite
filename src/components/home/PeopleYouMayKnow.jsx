import React from "react";
import Carousel from "../navigation/trending/carousel/Carousel";
import profileData from "../../helpers/profileData.json";

const PeopleYouMayKnow = () => {
    return (
        <div
            className="offcanvas offcanvas-bottom"
            tabindex="-1"
            id="offcanvasBottom"
            aria-labelledby="offcanvasBottomLabel"
            style={{ height: "40vh" }}
        >
            <div className="offcanvas-body small">
                <Carousel
                    className={"profileCard"}
                    data={profileData}
                    slidesToShow={6}
                />
            </div>
        </div>
    );
};

export default PeopleYouMayKnow;
