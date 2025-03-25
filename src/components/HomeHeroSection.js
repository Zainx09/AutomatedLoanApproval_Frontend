import React from "react";
import { motion } from "framer-motion";
import "../styles/homePage.css";

const HomeHeroSection = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="home-section"
  >
    <h1 className="home-hero-title">{t("welcome_to_loanify")}</h1>
    <p className="home-hero-subtitle">{t("smart_loan_approval_made_simple")}</p>
    <motion.button
      className="home-button"
      whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(82, 196, 26, 0.7)" }}
    >
      {t("get_started")}
    </motion.button>
  </motion.div>
);

export default HomeHeroSection;