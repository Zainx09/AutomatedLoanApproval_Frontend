import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Tooltip, Typography, Button } from "antd";

const { Text } = Typography;

// Define color codes for credit score ranges
const CREDIT_SCORE_COLORS = {
  low: "#ff4d4f", // Red for scores < 600
  mid: "#faad14", // Yellow for scores 600-699
  high: "#52c41a", // Green for scores >= 700
};

// Define color codes for Employment Status
const EMPLOYMENT_STATUS_COLORS = {
  2: "#52c41a", // Green for Full-Time
  1: "#faad14", // Yellow for Part-Time
  0: "#ff4d4f", // Red for Unemployed
};

// Define color codes for Payment History
const PAYMENT_HISTORY_COLORS = {
  3: "#52c41a", // Green for On Time
  2: "#faad14", // Yellow for Late<30
  1: "#fa8c16", // Orange for Late 30-60
  0: "#ff4d4f", // Red for Late>60
};

// Define color codes for application Status
const APPLICATION_STATUS_COLORS = {
  Pending: "#fa8c16",
  "Under Review": "#faad14",
  Approved: "#52c41a", // Green for Full-Time
  Rejected: "#ff4d4f", // Red for Unemployed
};

// Define color codes for application approval
const APPLICATION_APPROVAL_COLORS = {
  0: "#52c41a", // Green for Full-Time
  1: "#fa8c16", // Red for Unemployed
};

// Define reusable styles
const styles = {
  container: {
    width: "100%",
    marginBottom: "20px",
  },
  tableCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#484848",
  },
  tableCountNumber: {
    fontSize: 18,
    fontWeight: 900,
    color: "#108EE9",
    margin: "0px 7px",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  statsContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    border: "0px solid",
    alignItems: "center",
  },
  indicatorTitle: {
    color: "#484848",
    fontWeight: "bold",
    fontSize: 15,
  },
  statBox: {
    background: "#F9F9F9",
    padding: "5px 10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  colorIndicator: {
    //   width: "18px",
    //   height: "18px",
    padding: "2px 8px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    cursor: "pointer",
  },
  search: {
    width: "300px",
  },
};

const UserStatsHeader = ({
  title,
  data,
  handleSearch,
  applicationHeader,
  t,
  handleFilter,
}) => {
  const [isFitlerSelected, setIsFilterSelected] = useState(false);
  // Calculate counts for Credit Score
  const creditScoreCounts = {
    high: data.filter((user) => (user.credit_score || 0) >= 700).length,
    mid: data.filter(
      (user) =>
        (user.credit_score || 0) >= 600 && (user.credit_score || 0) < 700
    ).length,
    low: data.filter((user) => (user.credit_score || 0) < 600).length,
  };

  // Calculate counts for Employment Status
  const employmentStatusCounts = {
    2: data.filter((user) => user.employment_status === 2).length,
    1: data.filter((user) => user.employment_status === 1).length,
    0: data.filter((user) => user.employment_status === 0).length,
  };

  // Calculate counts for Payment History
  const paymentHistoryCounts = {
    3: data.filter((user) => user.payment_history === 3).length,
    2: data.filter((user) => user.payment_history === 2).length,
    1: data.filter((user) => user.payment_history === 1).length,
    0: data.filter((user) => user.payment_history === 0).length,
  };

  // Calculate counts for Application Status
  const applicationStatusCounts = {
    Pending: data.filter((user) => user.status === "Pending")?.length,
    "Under Review": data.filter((user) => user.status === "Under Review")
      ?.length,
    Approved: data.filter((user) => user.status === "Approved")?.length,
    Rejected: data.filter((user) => user.status === "Rejected")?.length,
  };

  // Calculate counts for Application Status
  const approvedCounts = {
    0: data.filter((user) => user.status === "Approved")?.length,
    1: data.filter((user) => user.status != "Approved")?.length,
  };

  const handleFilterClick = (key, value) => {
    setIsFilterSelected(!!key);
    handleFilter?.(key, value);
  };

  return (
    <div style={styles.container}>
      {/* Stats Row */}
      <div style={styles.statsRow}>
        {/* Total Record Count */}
        <div style={styles.statBox}>
          <Text strong style={styles.tableCount}>
            {title} :
            <Text strong style={styles.tableCountNumber}>
              {data.length}
            </Text>
          </Text>
        </div>

        {/* Stats Container */}
        <div style={styles.statsContainer}>
          {!!applicationHeader ? (
            <>
              {!!isFitlerSelected && (
                <Button
                  type="primary"
                  onClick={() => {
                    handleFilterClick();
                  }}
                >
                  Clear Filter
                </Button>
              )}
              {/* Employment Status Stats */}
              <div style={styles.statBox}>
                <Text strong style={styles.indicatorTitle}>
                  {t("application_status")}
                </Text>
                <Tooltip
                  title={`Pending: ${applicationStatusCounts["Pending"]}`}
                >
                  <span
                    onClick={() => handleFilterClick("status", "Pending")}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: APPLICATION_STATUS_COLORS["Pending"],
                    }}
                  >
                    {applicationStatusCounts["Pending"]}
                  </span>
                </Tooltip>
                <Tooltip
                  title={`Under Review: ${applicationStatusCounts["Under Review"]}`}
                >
                  <span
                    onClick={() => handleFilterClick("status", "Under Review")}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor:
                        APPLICATION_STATUS_COLORS["Under Review"],
                    }}
                  >
                    {applicationStatusCounts["Under Review"]}
                  </span>
                </Tooltip>
                <Tooltip
                  title={`Approved: ${applicationStatusCounts["Approved"]}`}
                >
                  <span
                    onClick={() => handleFilterClick("status", "Approved")}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: APPLICATION_STATUS_COLORS["Approved"],
                    }}
                  >
                    {applicationStatusCounts["Approved"]}
                  </span>
                </Tooltip>
                <Tooltip
                  title={`Rejected: ${applicationStatusCounts["Rejected"]}`}
                >
                  <span
                    onClick={() => handleFilterClick("status", "Rejected")}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: APPLICATION_STATUS_COLORS["Rejected"],
                    }}
                  >
                    {applicationStatusCounts["Rejected"]}
                  </span>
                </Tooltip>
              </div>

              {/* Payment History Stats */}
              {/* <div style={styles.statBox}>
                <Text strong style={styles.indicatorTitle}>
                  {t("approved")}
                </Text>
                <Tooltip title={`Approved: ${approvedCounts[0]}`}>
                  <span
                    onClick={() => handleFilterClick("status", )}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: APPLICATION_APPROVAL_COLORS[0],
                    }}
                  >
                    {approvedCounts[0]}
                  </span>
                </Tooltip>
                <Tooltip title={`Not Approved: ${approvedCounts[1]}`}>
                  <span
                    onClick={() => handleFilterClick("approved", 0)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: APPLICATION_APPROVAL_COLORS[1],
                    }}
                  >
                    {approvedCounts[1]}
                  </span>
                </Tooltip>
              </div> */}
            </>
          ) : (
            <>
              {!!isFitlerSelected && (
                <Button
                  type="primary"
                  onClick={() => {
                    handleFilterClick();
                  }}
                >
                  Clear Filter
                </Button>
              )}
              {/* Credit Score Stats */}
              <div style={styles.statBox}>
                <Text strong style={styles.indicatorTitle}>
                  {t("Credit_Score")}
                </Text>
                <Tooltip title={`High (700+): ${creditScoreCounts.high}`}>
                  <span
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: CREDIT_SCORE_COLORS.high,
                    }}
                  >
                    {creditScoreCounts.high}
                  </span>
                </Tooltip>
                <Tooltip title={`Mid (600-699): ${creditScoreCounts.mid}`}>
                  <span
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: CREDIT_SCORE_COLORS.mid,
                    }}
                  >
                    {creditScoreCounts.mid}
                  </span>
                </Tooltip>
                <Tooltip title={`Low (<600): ${creditScoreCounts.low}`}>
                  <span
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: CREDIT_SCORE_COLORS.low,
                    }}
                  >
                    {creditScoreCounts.low}
                  </span>
                </Tooltip>
              </div>

              {/* Employment Status Stats */}
              <div style={styles.statBox}>
                <Text strong style={styles.indicatorTitle}>
                  {t("Employment_Status")}
                </Text>
                <Tooltip title={`Full-Time: ${employmentStatusCounts[2]}`}>
                  <span
                    onClick={() => handleFilterClick("employment_status", 2)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: EMPLOYMENT_STATUS_COLORS[2],
                    }}
                  >
                    {employmentStatusCounts[2]}
                  </span>
                </Tooltip>
                <Tooltip title={`Part-Time: ${employmentStatusCounts[1]}`}>
                  <span
                    onClick={() => handleFilterClick("employment_status", 1)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: EMPLOYMENT_STATUS_COLORS[1],
                    }}
                  >
                    {employmentStatusCounts[1]}
                  </span>
                </Tooltip>
                <Tooltip title={`Unemployed: ${employmentStatusCounts[0]}`}>
                  <span
                    onClick={() => handleFilterClick("employment_status", 0)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: EMPLOYMENT_STATUS_COLORS[0],
                    }}
                  >
                    {employmentStatusCounts[0]}
                  </span>
                </Tooltip>
              </div>

              {/* Payment History Stats */}
              <div style={styles.statBox}>
                <Text strong style={styles.indicatorTitle}>
                  {t("Payment_History")}
                </Text>
                <Tooltip title={`On Time: ${paymentHistoryCounts[3]}`}>
                  <span
                    onClick={() => handleFilterClick("payment_history", 3)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: PAYMENT_HISTORY_COLORS[3],
                    }}
                  >
                    {paymentHistoryCounts[3]}
                  </span>
                </Tooltip>
                <Tooltip title={`Late <30: ${paymentHistoryCounts[2]}`}>
                  <span
                    onClick={() => handleFilterClick("payment_history", 2)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: PAYMENT_HISTORY_COLORS[2],
                    }}
                  >
                    {paymentHistoryCounts[2]}
                  </span>
                </Tooltip>
                <Tooltip title={`Late 30-60: ${paymentHistoryCounts[1]}`}>
                  <span
                    onClick={() => handleFilterClick("payment_history", 1)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: PAYMENT_HISTORY_COLORS[1],
                    }}
                  >
                    {paymentHistoryCounts[1]}
                  </span>
                </Tooltip>
                <Tooltip title={`Late >60: ${paymentHistoryCounts[0]}`}>
                  <span
                    onClick={() => handleFilterClick("payment_history", 0)}
                    style={{
                      ...styles.colorIndicator,
                      backgroundColor: PAYMENT_HISTORY_COLORS[0],
                    }}
                  >
                    {paymentHistoryCounts[0]}
                  </span>
                </Tooltip>
              </div>
            </>
          )}

          {/* Search Component */}
          <Input.Search
            placeholder={
              applicationHeader ? t("search_app") : t("search_users")
            }
            onSearch={handleSearch}
            style={styles.search}
            enterButton={<SearchOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default UserStatsHeader;
