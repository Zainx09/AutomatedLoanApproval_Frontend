import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeHeroSection from "../components/HomeHeroSection";
import HomeFeaturesSection from "../components/HomeFeaturesSection";
import HomeStatsSection from "../components/HomeStatsSection";
import "../styles/home.css";
import Icon from "../utils/IconWrapper";

const features = [
  {
    title: "loan_calculator",
    description: "calculate_your_loan_options",
    route: "loan-calculator",
    icon: "CalculatorOutlined",
    color: "#117d88",
  },
  {
    title: "fast_processing",
    description: "get_results_in_minutes",
    route: "checkapproval",
    icon: "ThunderboltOutlined",
    color: "orange",
  },
];

const results = [
  {
    title: "ninetyEightPercent",
    description: "approvalRate",
    icon: "CheckCircleOutlined",
    color: "#0f6b13",
  },
  {
    title: "oneThousandPlus",
    description: "applicationsProcessed",
    icon: "FileDoneOutlined",
    color: "#117d88",
  },
  {
    title: "lessThanOneMin",
    description: "avgProcessingTime",
    icon: "FieldTimeOutlined",
    color: "orange",
  },
  {
    title: "greaterThanNinetyFivePercent",
    description: "approvalAccuracy",
    icon: "BulbOutlined",
    color: "#d18616",
  },
];

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 30px",
        backgroundColor: "white",
      }}
    >
      <section className="home-new-hero">
        <div className="home-new-hero-container">
          <div className="home-new-hero-content">
            <h1 className="home-new-hero-title">
              {t("welcomeTo")}
              <br />
              <span className="home-new-hero-highlight">
                {t("autoApprovalPlatform")}
              </span>
            </h1>
            <p className="home-new-hero-description">
              {t("welcomeDescription")}
            </p>
            <button
              className="home-new-hero-button"
              onClick={() => navigate("/checkapproval")}
            >
              {t("getStarted")}
            </button>
          </div>
        </div>
      </section>

      <section className="home-new-feature">
        <div className="home-new-hero-container">
          <div className="home-new-hero-content">
            <h1 className="home-new-hero-title" style={{ fontSize: "3.5rem" }}>
              {t("perfectFeatures")}
              <br />
              <span
                className="home-new-hero-highlight"
                style={{ fontSize: "4rem" }}
              >
                {t("approvalFaster")}
              </span>
            </h1>
            <p className="home-new-hero-description">
              {t("featuresDescription")}
            </p>
            <div className="home-new-grid-container">
              {features.map((feature) => (
                <motion.div
                  className="home-new-card"
                  whileHover={{ translateY: -5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => {
                    const url = `/${feature.route}`;
                    window.open(url, "_blank");
                  }}
                  style={{ border: "1px solid", borderColor: feature.color }}
                >
                  <Icon
                    type={feature.icon}
                    style={{ color: feature.color }}
                    className="home-new-card-icon"
                  />
                  <h3 className="home-new-card-title">{t(feature.title)}</h3>
                  <p className="home-new-card-desc">{t(feature.description)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-new-results">
        <div className="home-new-hero-container">
          <div className="home-new-hero-content">
            <h1 className="home-new-hero-title">
              <span
                className="home-new-hero-highlight"
                style={{ fontSize: "4rem" }}
              >
                {t("ourPerfections")}
              </span>
            </h1>
            <p className="home-new-hero-description">
              {t("resultsDriven")}
            </p>
            <div className="home-new-grid-container">
              {results.map((feature) => (
                <motion.div
                  className="home-new-card"
                  whileHover={{ translateY: -5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ border: "1px solid", borderColor: feature.color }}
                >
                  <Icon
                    type={feature.icon}
                    style={{ color: feature.color }}
                    className="home-new-card-icon"
                  />
                  <h3
                    className="home-new-card-title"
                    style={{ fontSize: "3.8rem" }}
                  >
                    {t(feature.title)}
                  </h3>
                  <p className="home-new-card-desc" style={{ marginTop: -25 }}>
                    {t(feature.description)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;