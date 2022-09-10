import React, { useEffect } from "react";
import classes from "./Content.module.css";
import Left from "./left/Left";
import Right from "./right/Right";
import section1 from "../../assets/images/main-1.png";
import section2 from "../../assets/images/section2.png";
import section3 from "../../assets/images/section3.png";
import Footer from "../footer/Footer";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Content = (props) => {
    // All these triggers for the css part
    const [ref1, inView1] = useInView({ triggerOnce: true });
    const animation1 = useAnimation();

    const [ref2, inView2] = useInView({ triggerOnce: true });
    const animation2 = useAnimation();

    const [ref3, inView3] = useInView({ triggerOnce: true });
    const animation3 = useAnimation();

    const [ref4, inView4] = useInView({ triggerOnce: true });
    const animation4 = useAnimation();
    // This effects is used to trigger the animations appropriately
    useEffect(() => {
        if (inView1) {
            animation1.start({
                x: 0,
                transition: {
                    type: "spring",
                    duration: 1,
                    bounce: 0.3,
                },
            });
        }
        if (!inView1) {
            animation1.start({ x: "-100vw" });
        }
    }, [inView1, animation1]);
    useEffect(() => {
        if (inView2) {
            animation2.start({
                x: 0,
                transition: {
                    type: "spring",
                    duration: 1,
                    bounce: 0.3,
                },
            });
        }
        if (!inView2) {
            animation2.start({ x: "100vw" });
        }
    }, [inView2, animation2]);
    useEffect(() => {
        if (inView3) {
            animation3.start({
                x: 0,
                transition: {
                    type: "spring",
                    duration: 1,
                    bounce: 0.3,
                },
            });
        }
        if (!inView3) {
            animation3.start({ x: "-100vw" });
        }
    }, [inView3, animation3]);
    useEffect(() => {
        if (inView4) {
            animation4.start({
                y: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    duration: 1,
                    bounce: 0.3,
                },
            });
        }
        if (!inView4) {
            animation4.start({ y: "20vh", opacity: 0 });
        }
    }, [inView4, animation4]);
    return (
        <>
            <div className={`container-fluid`}>
                <div className="row">
                    <div className={`col-md-7 ${classes.left}`}>
                        <Left nav={props.nav} />
                    </div>
                    <div className={`col-md-5 ${classes.right}`}>
                        <Right />
                    </div>
                </div>
            </div>
            <motion.div
                className={`container-fluid ${classes.section1}`}
                ref={ref1}
                animate={animation1}
            >
                <div className="row">
                    <div className="col-md-3">
                        <img src={section1} alt="qna" />
                    </div>
                    <div className="col-md-3"></div>
                    <div className={"col-md-6 " + classes.content}>
                        <h1>Questions? to share and ask</h1>
                        <p>
                            Search various answered questions and share your
                            thoughts on others questions as well.
                        </p>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className={`container-fluid ${classes.section2}`}
                ref={ref2}
                animate={animation2}
            >
                <div className="row">
                    <div className={"col-md-6 " + classes.content}>
                        <h1>Post what's on your mind</h1>
                        <p>
                            Got something on your mind? Well share them with
                            others and grow your followers. You can create posts
                            that interests other users.
                        </p>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <img src={section2} alt="qna" />
                    </div>
                </div>
            </motion.div>
            <motion.div
                className={`container-fluid ${classes.section3}`}
                ref={ref3}
                animate={animation3}
            >
                <div className="row">
                    <div className="col-md-3">
                        <img src={section3} alt="qna" />
                    </div>
                    <div className="col-md-3"></div>
                    <div className={"col-md-6 " + classes.content}>
                        <h1>Connect with people you like</h1>
                        <p>
                            Know someone? Search them and follow them to recieve
                            notifications for their content and other updates
                            about them.
                        </p>
                    </div>
                </div>
            </motion.div>
            <motion.footer ref={ref4} animate={animation4}>
                <Footer />
            </motion.footer>
        </>
    );
};

export default Content;
