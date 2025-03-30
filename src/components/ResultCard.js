import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Spin,
  notification,
} from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Icon from "../utils/IconWrapper";
import { PDFDownloadLink, Document, Page, View } from "@react-pdf/renderer";
import { setApplication } from "../agent/api";

const { Title, Text } = Typography;

const ResultCardView = ({ result, applicantId }) => {
  // Added applicant_id as a prop
  const { t } = useTranslation();
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendApplication = async (data) => {
    try {
      setIsLoading(true);
      const res = await setApplication(data);
      if (res?.msg) {
        setIsApplicationSubmitted(true);
        setMsg(res.msg);
      } else if (res.error) {
        setMsg("Failed to save your application. Please try again later.");
        // showNotification(false, "Failed to save your application. Please try again later.");
      }
    } catch (e) {
      setMsg("Failed to save your application. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsApplicationSubmitted(false);
  }, []);

  if (!result) {
    return null;
  }

  // Handle case where an application is already submitted
  if (result.found === 1 || isApplicationSubmitted) {
    return (
      <Card
        className="checkApproval-form-card"
        style={{ paddingTop: 15, marginTop: -22, width: "100%" }}
      >
        <Title
          style={{
            textAlign: "center",
            color: "#001529",
            fontSize: "1.7rem",
            fontWeight:600,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            marginTop: -20,
          }}
        >
          {t("result_approval")}
        </Title>{" "}
        {/* Blue for info */}
        <Title level={4}>{t("already_submitted")}</Title>
        <Button
          type="primary"
          style={{
            background: "#001529",
            borderColor: "#001529",
            marginTop: "10px",
          }}
          onClick={() => window.open(`/application/${applicantId}`, "_blank")}
        >
          <Icon type="LinkOutlined" style={{ marginRight: "5px" }} />{" "}
          {/* Link icon */}
          {t("visit_application")}
        </Button>
      </Card>
    );
  }

  // Handle case where an application is already submitted
  if (result.mismatch === 1) {
    return (
      <Card
        className="checkApproval-form-card"
        style={{
          paddingTop: 0,
          marginTop: -22,
          width: "100%",
          borderColor:
            result.mismatch === 1
              ? "#faad14" // Yellow for mismatch
              : result.approval_status === 1
              ? "#52c41a" // Green for approved
              : "#ff4d4f", // Red for denied
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          <>
            <Title level={3}>{t("info_mismatch")}</Title>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {result.msg}
            </Text>
            <ul style={{ marginTop: 20 }}>
              {result.mismatchFields.map((field, index) => (
                <li key={index}>
                  {t(field.field)}: {t("provided")} {field.provided},{" "}
                  {t("expected")} {field.expected}
                </li>
              ))}
            </ul>
            <Button
              type="primary"
              style={{
                background: "#001529",
                borderColor: "#001529",
                marginTop: "15px",
              }}
              // onClick={() => window.open(`/application/${applicantId}`, "_blank")}
              onClick={() => {
                const data = {
                  applicant_id: applicantId,
                };
                sendApplication(data);
              }}
            >
              {/* Link icon */}
              {t("submit_manual_application")}
              <Icon type="SendOutlined" style={{ marginLeft: "5px" }} />{" "}
            </Button>
          </>
        )}
      </Card>
    );
  }

  // Existing logic for mismatch or approval/denial
  return (
    <Card
      className="checkApproval-form-card"
      style={{
        // marginTop: "20px",
        paddingTop: 0,
        marginTop: -22,
        width: "100%",
        borderColor:
          result.mismatch === 1
            ? "#faad14" // Yellow for mismatch
            : result.approval_status === 1
            ? "#52c41a" // Green for approved
            : "#ff4d4f", // Red for denied
      }}
    >
      <>
        <Title level={3}>
          {result.approval_status === 1 ? t("approved") : t("denied")}
        </Title>
        <Text style={{ fontSize: 15 }}>DTI: {result.DTI?.toFixed(2)}%</Text>
        <br />
        {result.approval_status === 1 ? (
          <>
            <Text style={{ fontSize: 15 }}>
              {t("amount")}: ${result.approved_amount?.toFixed(2)}
            </Text>
            <br />
            <Text style={{ fontSize: 15 }}>
              {t("interest_rate")}: {result.interest_rate?.toFixed(2)}%
            </Text>
            <div style={{ marginBottom: 10 }} />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {
                "Your provied information has been verified. Submit Application to get instant approval."
              }
            </Text>
            <br />
            <Button
              type="primary"
              style={{
                background: "#001529",
                borderColor: "#001529",
                marginTop: "15px",
              }}
              // onClick={() => window.open(`/application/${applicantId}`, "_blank")}
              onClick={() => {
                const data = {
                  applicant_id: applicantId,
                  approved_amount: result.approved_amount?.toFixed(2),
                  approved: 1,
                  interest_rate: result.interest_rate?.toFixed(2),
                  dti: result.DTI?.toFixed(2),
                  status: "Approved",
                  admin_notes: "Auto Approved by System",
                };
                sendApplication(data);
              }}
            >
              {/* Link icon */}
              {t("submit_application")}
              <Icon type="SendOutlined" style={{ marginLeft: "5px" }} />{" "}
            </Button>
            {/* <Button
                type="primary"
                style={{ background: "#001529", borderColor: "#001529" }}
              >
                {t("download_pdf")}
              </Button> */}
          </>
        ) : (
          <>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {t("denial_reasons")}:
            </Text>
            <ul>
              {result.denial_reasons.map((reason, index) => (
                <li style={{ fontSize: 15 }} key={index}>
                  {reason}
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    </Card>
  );
};

export default ResultCardView;
