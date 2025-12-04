import React from "react";
import logo from "../assets/logo-farmer.jpg";
import HeroSlider from "../components/home/HeroSlider";
import LatestCrops from "../components/home/LatestCrops";
import HowItWorks from "../components/home/HowItWorks";
import AgroNews from "../components/home/AgroNews";
import FeaturedServices from "../components/home/FeaturedServices";
import Testimonials from "../components/home/Testimonials";

const reviewsPromise = fetch("/review.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <LatestCrops></LatestCrops>
      <HowItWorks></HowItWorks>
      <AgroNews></AgroNews>
      <FeaturedServices></FeaturedServices>
      <Testimonials reviewsPromise={reviewsPromise}></Testimonials>
    </div>
  );
};

export default Home;
