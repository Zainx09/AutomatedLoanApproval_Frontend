import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { PDFDownloadLink, Document, Page, View } from "@react-pdf/renderer";

const { Title, Text } = Typography;

const ResultCardView = ({ result }) => {
  const { t } = useTranslation();

  if (!result) {
    return null;
  }
  return (
    <Card
      style={{
        marginTop: "20px",
        borderColor:
          result.mismatch === 1
            ? "#faad14" // Yellow for mismatch
            : result.approval_status === 1
            ? "#52c41a" // Green for approved
            : "#ff4d4f", // Red for denied
      }}
    >
      {result.mismatch === 1 ? (
        <>
          <Title level={4}>{t("info_mismatch")}</Title>
          <Text>{result.msg}</Text>
          <ul>
            {result.mismatchFields.map((field, index) => (
              <li key={index}>
                {t(field.field)}: {t('provided')} {field.provided}, {t('expected')}{" "}
                {field.expected}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <Title level={4}>
            {result.approval_status === 1 ? t("approved") : t("denied")}
          </Title>
          <Text>DTI: {result.DTI?.toFixed(2)}%</Text>
            <br />
          {result.approval_status === 1 ? (
            <>
              <Text>
                {t("amount")}: ${result.approved_amount?.toFixed(2)}
              </Text>
              <br />
              <Text>
                {t("interest_rate")}: {result.interest_rate?.toFixed(2)}%
              </Text>
              <br />
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
        </>
      )}
    </Card>
  );
};

export default ResultCardView;
