import React from "react";
import { motion } from "framer-motion";
import { Progress } from "antd";
import "../styles/homePage.css";

const stats = {
  applicationsProcessed: 12500,
  approvalRate: 92,
  averageProcessingTime: 3,
  accuracy: 98,
};

const HomeStatsSection = ({ t }) => {
  return (
    <div className="home-section">
      <h2>{t("our_impact")}</h2>
      <div className="home-stats-grid">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div
            key={key}
            className="home-stat-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * Object.keys(stats).indexOf(key) }}
          >
            <Progress
              type="circle"
              percent={key === "applicationsProcessed" ? 100 : value} // Full circle for count, percentage for others
              width={100}
              strokeColor="#0b0445"
              format={() =>
                <span style={{color:'black', fontWeight:'bold'}}>{key === "applicationsProcessed" ? value.toLocaleString() : key === "averageProcessingTime" ? `${value.toLocaleString()} min` : `${value}%`}</span>
                
              }
              strokeWidth={8}
            />
            <div className="home-stat-label">{t(key)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeStatsSection;