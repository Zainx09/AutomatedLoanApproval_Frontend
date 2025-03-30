import React from "react";
import HomeFeatureCard from "./HomeFeatureCard";
import "../styles/homePage.css";

const features = [
  {
    title: "loan_calculator",
    description: "calculate_your_loan_options",
    route: "/loan-calculator",
  },
  {
    title: "smart_approval",
    description: "how_our_approval_works",
    route: "/guide",
  },
  {
    title: "fast_processing",
    description: "get_results_in_minutes",
    route: "/checkapproval",
  },
];

const HomeFeaturesSection = ({ t }) => (
  <div className="home-section">
    <h2>{t("our_features")}</h2>
    <div className="home-features-grid">
      {features.map((feature) => (
        <HomeFeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          route={feature.route}
          t={t}
        />
      ))}
    </div>
  </div>
);

export default HomeFeaturesSection;