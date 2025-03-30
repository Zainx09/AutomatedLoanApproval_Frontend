import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Input, Button } from "antd";
import ApplicationResultView from "../components/ApplicationResultView";
import "../styles/application.css";

const ApplicationPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Get optional :id from URL
  const [applicantId, setApplicantId] = useState("");
  const [result, setResult] = useState(null);

  // Fetch application if ID is in URL
  useEffect(() => {
    if (id) {
      fetchApplication(id);
    }
  }, [id]);

  const fetchApplication = async (applicantId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/application/${applicantId}`);
      setResult(response.data);
    } catch (error) {
      setResult({ found: 0 });
    }
  };

  const handleSubmit = () => {
    if (applicantId) {
      fetchApplication(applicantId);
    }
  };

  return (
    <div className="application-container">
      {!id && (
        <Card className="application-input-card">
          <Input
            placeholder={t("applicant_id_placeholder")}
            value={applicantId}
            onChange={(e) => setApplicantId(e.target.value)}
            style={{ width: "300px", marginRight: "10px" }}
          />
          <Button type="primary" onClick={handleSubmit}>
            {t("submit")}
          </Button>
        </Card>
      )}
      {result && <ApplicationResultView result={result} />}
    </div>
  );
};

export default ApplicationPage;