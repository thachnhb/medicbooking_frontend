import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import TopNews from "./Section/TopNews";
import Speciality from "./Section/Speciality";
import MedicalCentre from "./Section/MedicalCentre";
import Doctor from "./Section/Doctor";
import Handbook from "./Section/Handbook";
import ForDoctorCentre from "./Section/ForDoctorCentre";
import HomeFooter from "./HomeFooter";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {
    let setting1Auto = {
      dots: false,
      infinite: true,
      speed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 1,
      useCSS: true,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    let setting2Auto = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 1,
      useCSS: true,
      autoplay: false,
      speed: 1500,
      autoplaySpeed: 4500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            speed: 1500,
            autoplaySpeed: 4500,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
      ],
    };
    let setting2 = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 1,
      useCSS: true,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <TopNews settings={setting1Auto} />
        <Speciality settings={setting2Auto} />
        <MedicalCentre settings={setting2Auto} />
        <Doctor settings={setting2Auto} />
        <Handbook settings={setting2} />
        <ForDoctorCentre settings={setting2} />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
