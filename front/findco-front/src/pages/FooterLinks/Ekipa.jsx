import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";
import coverVID from "./../../assets/cover.mp4";
import Majster from "./../../assets/majster.jpg";
import classes from "./FooterLinks.module.scss";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useScrollToTop from "../../hooks/useScrollToTop";

// Univerzalen Class

const EkipaText = () => {
    return (
        <Fragment>
            <h1 className={classes.hero__content__title}>Ekipa</h1>
            <span className={classes.hero__content__tagline}>
                NAJ VAM DO TEGA POMAGAMO
            </span>
            <p className={classes.hero__content__description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere beatae itaque ea
                ducimus, mollitia voluptate laudantium.
            </p>
        </Fragment>
    );
};

const Ekipa = () => {
    useScrollToTop();
    return (
        <>
        <Header/>
        <div className={classes.container}>
            <img
                src={Majster}
                alt={"Hisa1"}
                className={classes.photo}
            ></img>
            <div className={classes.hero}>
                <div className={classes.hero__content}>
                    <EkipaText/>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Ekipa;