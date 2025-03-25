import React from "react";
import { Form, InputNumber, Select, Button, Row, Col, Input } from "antd";
import { dataPointMetaData } from "../commons"; // Adjust the import path
import { useTranslation } from "react-i18next";

const { Option } = Select;

const LoanForm = ({ onFinish }) => {
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
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: "0 auto" }}
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
                  <Form.Item
                    label={" "}
                  >
                    <Button style={{width:'100%'}} type="primary" htmlType="submit">
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
  );
};

export default LoanForm;
