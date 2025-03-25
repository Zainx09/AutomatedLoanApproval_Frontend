import React, { useState, useMemo } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
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
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({});

  const onFinish = async (values) => {
    try {
      const response = await predictLoan(values);
      if (response.approval_status !== undefined) {
        setResult(response);
        setFormData(values); // Store form data in state
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      message.error(t("error"));
      console.error("API Error:", error);
    }
  };

  // Memoize PDFDocument to prevent redefinition
  const PDFDocument = useMemo(
    () =>
      formData && result
        ? ({ formData, result }) => (
            <Document>
              <Page size="A4" style={{ padding: 30 }}>
                <View>
                  <Text style={{ fontSize: 20, marginBottom: 10 }}>
                    Loan Approval Report
                  </Text>
                  <Text>Credit Score: {formData.credit_score}</Text>
                  <Text>Annual Income: ${formData.annual_income}</Text>
                  <Text>Requested Amount: ${formData.requested_amount}</Text>
                  <Text>
                    Approval Status:{" "}
                    {result.approval_status === 1 ? t("approved") : t("denied")}
                  </Text>
                  {result.approval_status === 1 && (
                    <>
                      <Text>Approved Amount: ${result.approved_amount}</Text>
                      <Text>Interest Rate: {result.interest_rate}%</Text>
                    </>
                  )}
                </View>
              </Page>
            </Document>
          )
        : null,
    [formData, result, t] // Dependencies for memoization
  );

  return (
    <div style={{ padding: "19px 50px", maxWidth: "100%", border: "0px solid red" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50%", border: "0px solid red" }}>
          <Title level={2} style={{ textAlign: "center", color: "#001529" }}>
            {t("check_approval")}
          </Title>

          <LoanForm onFinish={onFinish} />
        </div>

        {result && <div style={{ borderLeft: "1px solid lightgrey", height: 520, marginTop: 40 }} />}

        {result && (
          <div
            style={{
              width: "35%",
              border: "0px solid red",
              paddingLeft: 60,
              // marginTop: 60,
            }}
          >
            <Title level={2} style={{ textAlign: "center", color: "#001529", marginBottom:40}}>
              {t("result_approval")}
            </Title>
            <ResultCard result={result} />
          </div>
        )}
      </div>

      {/* {result && (
        <Card
          style={{
            marginTop: "20px",
            borderColor: result.approval_status === 1 ? "#52c41a" : "#ff4d4f",
          }}
        >
          <Title level={4}>
            {result.approval_status === 1 ? t("approved") : t("denied")}
          </Title>
          {result.approval_status === 1 ? (
            <>
              <Text>
                {t("amount")}: ${result.approved_amount}
              </Text>
              <br />
              <Text>
                {t("interest_rate")}: {result.interest_rate}%
              </Text>
              <br />
              <PDFDownloadLink
                document={
                  <PDFDocument
                    formData={formData}
                    result={result}
                  />
                }
                fileName="loan_approval.pdf"
                style={{ marginTop: "10px", display: "inline-block" }}
              >
                {({ loading }) => (
                  <Button
                    type="primary"
                    disabled={loading}
                    style={{ background: "#001529", borderColor: "#001529" }}
                  >
                    {loading ? "Generating..." : t("download_pdf")}
                  </Button>
                )}
              </PDFDownloadLink>
              <Button
                type="primary"
                // disabled={loading}
                style={{ background: "#001529", borderColor: "#001529" }}
              >
                {t("download_pdf")}
              </Button>
            </>
          ) : (
            <>
              <Text>{t("denial_reasons")}:</Text>
              <ul>
                {result.denial_reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
      )} */}
    </div>
  );
};

export default CheckApproval;
