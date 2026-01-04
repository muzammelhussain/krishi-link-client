import React from "react";
import logo from "../assets/logo-farmer.jpg";
import HeroSlider from "../components/home/HeroSlider";
import LatestCrops from "../components/home/LatestCrops";
import HowItWorks from "../components/home/HowItWorks";
import AgroNews from "../components/home/AgroNews";
import FeaturedServices from "../components/home/FeaturedServices";
import Testimonials from "../components/home/Testimonials";
import FeaturesSection from "../components/home/FeaturesSection ";
import ServicesSection from "../components/home/ServicesSection";
import CategoriesSection from "../components/home/CategoriesSection";
import PlatformHighlights from "../components/home/PlatformHighlights ";
import StatisticsSection from "../components/home/StatisticsSection ";
import BlogSection from "../components/home/BlogSection ";
import FAQSection from "../components/home/FAQSection";
import FinalCTA from "../components/home/FinalCTA";

const reviewsPromise = fetch("/review.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <StatisticsSection></StatisticsSection>
      <LatestCrops></LatestCrops>
      <FeaturesSection></FeaturesSection>
      <CategoriesSection></CategoriesSection>
      <ServicesSection></ServicesSection>
      <AgroNews></AgroNews>
      <HowItWorks></HowItWorks>
      <PlatformHighlights></PlatformHighlights>
      <BlogSection></BlogSection>
      <FinalCTA></FinalCTA>
      {/* <FeaturedServices></FeaturedServices> */}
      <Testimonials reviewsPromise={reviewsPromise}></Testimonials>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
