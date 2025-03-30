import React from "react";
import {
  Form,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Input,
  Typography,
  Spin,
} from "antd";
import { dataPointMetaData } from "../commons"; // Adjust the import path
import { useTranslation } from "react-i18next";
import "../styles/checkApproval.css";

const { Title, Text } = Typography;

const { Option } = Select;

const LoanForm = ({ onFinish, isLoading, result }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Filter metadata to include only fields with man: 1
  const mandatoryFields = dataPointMetaData.filter(
    (dataPoint) => dataPoint.man === 1
  );

  // Constant to control fields per row
  const FIELDS_PER_ROW = 2;

  // Split fields into rows (array of arrays)
  const fieldRows = [];
  for (let i = 0; i < mandatoryFields.length; i += FIELDS_PER_ROW) {
    fieldRows.push(mandatoryFields.slice(i, i + FIELDS_PER_ROW));
  }

  return (
    <div className="checkApproval-form-card">
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
        {t("check_approval")}
        {!!isLoading && <Spin style={{ marginLeft: 20, fontSize:20 }} />}
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ margin: "0 auto", width: "80%" }}
        initialValues={{
          applicant_id: 100001,
          credit_score: 800,
          self_reported_expenses: 1,
          annual_income: 20000,
          self_reported_debt: 1,
          employment_status: 2,
          months_employed: 1,
          credit_utilization: 1,
          num_open_accounts: 1,
          payment_history: 3,
          total_credit_limit: 1000,
          requested_amount:2000
        }}
      >
        {fieldRows.map((rowFields, rowIndex) => (
          <Row key={rowIndex} gutter={16}>
            {rowFields.map((dataPoint) => (
              <>
                <Col key={dataPoint.key} span={24 / FIELDS_PER_ROW}>
                  <Form.Item
                    name={dataPoint.key}
                    label={
                      dataPoint.range
                        ? `${t(dataPoint.name)} (${dataPoint.range.from} - ${
                            dataPoint.range.to
                          })`
                        : `${t(dataPoint.name)}`
                    }
                    rules={[
                      {
                        required: true,
                        message: `${t(dataPoint.name)} is required`,
                      },
                    ]}
                  >
                    {dataPoint.fieldType === "inputNumber" ? (
                      <InputNumber
                        min={dataPoint.range?.from}
                        max={dataPoint.range?.to}
                        style={{ width: "100%" }}
                        placeholder={`${t(dataPoint.name)}`}
                      />
                    ) : dataPoint.fieldType === "string" ? (
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder={`${t(dataPoint.name)}`}
                      />
                    ) : dataPoint.fieldType === "select" ? (
                      <Select
                        style={{ width: "100%" }}
                        placeholder={`Select ${t(dataPoint.name)}`}
                      >
                        {dataPoint.options.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    ) : null}
                  </Form.Item>
                </Col>

                {rowIndex === fieldRows.length - 1 && (
                  <Col key={"submitBtn"} span={24 / FIELDS_PER_ROW}>
                    <Form.Item label={" "}>
                      <Button
                        style={{
                          width: "100%",
                          background: "#001529",
                          fontWeight: "bold",
                        }}
                        type="primary"
                        htmlType="submit"
                        disabled={isLoading}
                      >
                        {t("submit")?.toUpperCase()}
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </>
            ))}
          </Row>
        ))}
        {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("submit")}
        </Button>
      </Form.Item> */}
      </Form>

      <div style={{ width: "100%", textAlign: "center" }}>
        {!!result && (
          <text style={{ color: "red", fontWeight: "bold", fontSize: 14 }}>
            {result}
          </text>
        )}
      </div>
    </div>
  );
};

export default LoanForm;
