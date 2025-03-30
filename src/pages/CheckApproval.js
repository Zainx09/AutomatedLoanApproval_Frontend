import React, { useState, useMemo } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Span,
  Spin,
} from "antd";
import { useTranslation } from "react-i18next";
import { predictLoan, generatePDF } from "../agent/api";
import { PDFDownloadLink, Document, Page, View } from "@react-pdf/renderer";
import LoanForm from "../components/LoanForm";
import ResultCard from "../components/ResultCard";

const { Title, Text } = Typography;

const testData = {
  credit_score: 780,
  annual_income: 95000,
  self_reported_debt: 2000,
  self_reported_expenses: 2500,
  requested_amount: 20000,
  age: 42,
  province: 1,
  employment_status: 1,
  months_employed: 48,
  total_credit_limit: 40000,
  credit_utilization: 20,
  num_open_accounts: 3,
  num_credit_inquiries: 1,
  payment_history: 3,
};

const CheckApproval = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [applicantId, setApplicantId] = useState();
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      setApplicantId(values.applicant_id);
      const response = await predictLoan(values);
      // if (response.approval_status !== undefined) {
      //   setResult(response);
      //   setFormData(values); // Store form data in state
      // } else {
      //   throw new Error("Invalid response");
      // }
      setErrorMsg(null);
      setResult(response);
      setFormData(values); // Store form data in state
    } catch (error) {
      setResult(null);
      setErrorMsg(error?.response?.data?.error);
      message.error(t("error"));
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        // padding: "19px 50px",
        // maxWidth: "100%",
        // border: "0px solid red",
        // display:'flex', flexDirection:'column', alignItems:'center',
      }}
      className="checkApproval-container"
    >
      <div className="mainHeading-container">
        <span className="mainHeading">{t("checkApprovalHeading")}</span>
        <p className="mainParagraph">{t("checkApprovalParagraph")}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            border: "0px solid red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Title level={2} style={{ textAlign: "center", color: "#001529" }}>
            {t("check_approval")}
            {!!isLoading && <Spin style={{marginLeft:10}}/>}
          </Title> */}

          <LoanForm
            onFinish={onFinish}
            isLoading={isLoading}
            result={errorMsg}
          />
        </div>

        {result && !isLoading && (
          <div
            style={{
              borderLeft: "1px solid lightgrey",
              height: 600,
              marginTop: 20,
            }}
          />
        )}

        {result && !isLoading && (
          <div
            style={{
              width: "35%",
              border: "0px solid red",
              paddingLeft: 40,
              paddingTop: 20,
              // marginTop: 60,
            }}
          >
            {/* <Title level={2} style={{ textAlign: "center", color: "#001529", marginBottom:40}}>
              {t("result_approval")}
            </Title> */}
            <ResultCard result={result} applicantId={applicantId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckApproval;
