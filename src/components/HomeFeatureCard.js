import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css";

const HomeFeatureCard = ({ title, description, route, t }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="home-card"
      whileHover={{ translateY: -5 }}
      // initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.1 }}
      onClick={() => navigate(route)}
    >
      <h3 className="home-card-title">{t(title)}</h3>
      <p className="home-card-desc">{t(description)}</p>
    </motion.div>
  );
};

export default HomeFeatureCard;