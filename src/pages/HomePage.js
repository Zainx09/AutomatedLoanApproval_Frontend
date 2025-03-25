// pages/HomePage.js
import React from "react";
import { useTranslation } from "react-i18next";
import HomeHeroSection from "../components/HomeHeroSection";
import HomeFeaturesSection from "../components/HomeFeaturesSection";
import HomeStatsSection from "../components/HomeStatsSection";
import "../styles/homePage.css";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <HomeHeroSection t={t} />
      <HomeFeaturesSection t={t} />
      <HomeStatsSection t={t} />
    </div>
  );
};

export default HomePage;