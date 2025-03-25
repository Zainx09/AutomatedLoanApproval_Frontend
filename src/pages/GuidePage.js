import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/guide.css";
import Icon from "../utils/IconWrapper";

const GuidePage = () => {
  const { t } = useTranslation();

  return (
    <div className="guide-container">
      {/* Hero Section */}
      <section className="guide-hero">
        <h1 className="guide-title">
          <Icon type="MergeOutlined" className="guide-icon" /> {t("guide_title")}
        </h1>
        <p className="guide-subtitle">{t("guide_subtitle")}</p>
      </section>

      {/* Introduction Section */}
      <section className="guide-section guide-intro">
        <div className="guide-card">
          <h2 className="guide-section-title">{t("what_is_smart_approval")}</h2>
          <p className="guide-text">{t("smart_approval_intro")}</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="guide-section guide-process">
        <h2 className="guide-section-title">{t("how_it_works")}</h2>
        <div style={{borderTop:"2px solid lightgray", width:'90%', margin:'-20px 0px 20px 0px'}}/>
        <div className="guide-steps">
          <div className="guide-step">
            <Icon type="CheckCircleOutlined" className="guide-step-icon" />
            <h3>{t("step_1_title")}</h3>
            <p>{t("step_1_desc")}</p>
          </div>
          <div className="guide-step">
            <Icon type="GoldOutlined" className="guide-step-icon" />
            <h3>{t("step_2_title")}</h3>
            <p>{t("step_2_desc")}</p>
          </div>
          <div className="guide-step">
            <Icon type="PieChartOutlined" className="guide-step-icon" />
            <h3>{t("step_3_title")}</h3>
            <p>{t("step_3_desc")}</p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="guide-section guide-features">
        <h2 className="guide-section-title">{t("key_features")}</h2>
        <div style={{borderTop:"2px solid lightgray", width:'90%', margin:'-20px 0px 20px 0px'}}/>
        <div className="guide-features-grid">
          <div className="guide-feature">
            <Icon type="RocketOutlined" className="guide-feature-icon" />
            <h3>{t("feature_fast_processing_title")}</h3>
            <p>{t("feature_fast_processing_desc")}</p>
          </div>
          <div className="guide-feature">
            <Icon type="MergeFilled" className="guide-feature-icon" />
            <h3>{t("feature_smart_predictions_title")}</h3>
            <p>{t("feature_smart_predictions_desc")}</p>
          </div>
          <div className="guide-feature">
            <Icon type="PieChartOutlined" className="guide-feature-icon" />
            <h3>{t("feature_visual_insights_title")}</h3>
            <p>{t("feature_visual_insights_desc")}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="guide-section guide-benefits">
        <h2 className="guide-section-title">{t("why_choose_smart_approval")}</h2>
        <div style={{borderTop:"2px solid lightgray", width:'90%', margin:'-20px 0px 20px 0px'}}/>
        <div className="guide-card">
          <ul className="guide-benefits-list">
            <li>
              <Icon type="CheckCircleOutlined" className="guide-list-icon" />
              <span>{t("benefit_fair_unbiased_title")}</span> {t("benefit_fair_unbiased_desc")}
            </li>
            <li>
              <Icon type="CheckCircleOutlined" className="guide-list-icon" />
              <span>{t("benefit_time_saving_title")}</span> {t("benefit_time_saving_desc")}
            </li>
            <li>
              <Icon type="CheckCircleOutlined" className="guide-list-icon" />
              <span>{t("benefit_transparent_title")}</span> {t("benefit_transparent_desc")}
            </li>
            <li>
              <Icon type="CheckCircleOutlined" className="guide-list-icon" />
              <span>{t("benefit_user_friendly_title")}</span> {t("benefit_user_friendly_desc")}
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="guide-section guide-cta">
        <h2 className="guide-cta-title">{t("ready_to_get_started")}</h2>
        <p className="guide-text">{t("cta_text")}</p>
        <a href="/loan-calculator" className="guide-cta-button">
          {t("cta_button")}
        </a>
      </section>
    </div>
  );
};

export default GuidePage;