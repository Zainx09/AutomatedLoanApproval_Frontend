import React, { useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import "../styles/loanCalculator.css";
import { useTranslation } from "react-i18next";

const LoanCalculator = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    amount: "",
    rate: "",
    months: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResult(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/calculate-loan",
        {
          amount: Number(formData.amount),
          rate: Number(formData.rate),
          months: Number(formData.months),
        }
      );
      setResult(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setResult(null);
    }
  };

  // ECharts Pie Chart Options
  const chartOptions = result
    ? {
        tooltip: {
          trigger: "item",
          formatter: "${b}: ${c} (${d}%)",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: { color: "#000" }, // Black text for legend
        },
        series: [
          {
            name: "Loan Breakdown",
            type: "pie",
            radius: ["40%", "70%"], // Donut style
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            data: [
              {
                value: Number(formData.amount),
                name: "Principal",
                color: "#52c41a",
              },
              {
                value: result.totalInterest,
                name: "Total Interest",
                color: "#ff4d4f",
              },
            ],
            color: ["#52c41a", "#ff4d4f"], // Green for Principal, Red for Interest
          },
        ],
      }
    : null;

  return (
    <div className="loan-calculator-container">
        {/* <h2 className="loan-calculator-title">Loan Calculator</h2>
      <div className="loan-calculator-intro-card">
        <p className="loan-calculator-intro-text">
          Welcome to our Loan Calculator! Easily determine your monthly
          payments, total interest, and overall cost for any loan. Use these
          insights to plan your budget, compare loan options, or prepare for
          your next financial step with confidence.
        </p>
      </div> */}

      <div className="mainHeading-container">
        <span className="mainHeading">{t("loanCalculator")}</span>
        <p className="mainParagraph">{t("loanParagraph")}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "row", width: '1260px', border:'0px solid', maxHeight:325}}>
        {/* Calculator Card */}
        <div 
        className="loan-calculator-card"
        >
          {/* <h2 style={{textAlign:'center', marginTop:-20}}>Enter Loan Details</h2> */}
          <h3 className="loan-calculator-chart-title">{t("enterLoanDetails")}</h3>
          <form className="loan-calculator-form" onSubmit={handleSubmit}>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Loan Amount ($)"
              className="loan-calculator-input"
              min="1"
              required
            />
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              placeholder="Annual Interest Rate (%)"
              className="loan-calculator-input"
              step="0.1"
              min="0.1"
              required
            />
            <input
              type="number"
              name="months"
              value={formData.months}
              onChange={handleChange}
              placeholder="Loan Term (Months)"
              className="loan-calculator-input"
              min="1"
              required
            />
            <button type="submit" className="loan-calculator-button">
              {t("calculate")}
            </button>
          </form>
          {result && (
            <div className="loan-calculator-result">
              <p>{t("monthlyPayment")}: ${result.monthlyPayment}</p>
              <p>{t("totalInterest")}: ${result.totalInterest}</p>
              <p>{t("totalPayment")}: ${result.totalPayment}</p>
            </div>
          )}
          {error && <p className="loan-calculator-error">{error}</p>}
        </div>

        {/* Pie Chart Section */}
        {result && (
          <div className="loan-calculator-chart-card">
            <h3 className="loan-calculator-chart-title">{t("loanBreakdown")}</h3>
            <ReactECharts
              option={chartOptions}
              style={{ height: "300px", width: "100%" }}
            />
          </div>
        )}
      </div>
      {/* Tips Section */}
      <div className="loan-calculator-tips-card">
        <h3 className="loan-calculator-tips-title">{t("loanTips")}</h3>
        <ul className="loan-calculator-tips-list">
          <li>{t("tip1")}</li>
          <li>{t("tip2")}</li>
          <li>{t("tip3")}</li>
          <li>{t("tip4")}</li>
        </ul>
      </div>
    </div>
  );
};

export default LoanCalculator;
