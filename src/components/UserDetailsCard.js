import React from "react";
import { Button, Card, Typography } from "antd";
import Icon from "../utils/IconWrapper";
import { useTranslation } from "react-i18next";
import "../styles/userDetails.css";

const { Text } = Typography;

const UserDetailsCard = ({ user_info, generatePDF }) => {
  const { t } = useTranslation();
  if (!user_info) return null;

  return (
    <Card
      className="user-details-card"
      // title={<span><Icon type="UserOutlined" /> User Details</span>}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent:'space-between' }}
      >
        {/* <div
          style={{
            padding: "14px 16px",
            background: "#F9F9F9",
            borderRadius: "50%",
            marginRight: 10,
            marginTop: 2,
          }}
        >
          <Icon type="user" style={{ fontSize: 30 }} />
        </div> */}
        <div>
          <text style={{ fontSize: 55, fontWeight: 600, marginLeft: 10 }}>
            {user_info.first_name + " " + user_info.last_name}
          </text>
        </div>

        <div style={{ marginTop: 10 }}>
          <Button
            className="hide-in-pdf" // Class to hide in PDF
            type="primary"
            icon={<Icon type="download" style={{ fontSize: 18, paddingRight:8}} />}
            style={{ background: "#001529"}}
            onClick={generatePDF}
          >
            {t('exportPdf')}
          </Button>
        </div>
      </div>
      {/* <div className="user-info-item">
        <Icon type="SmileOutlined" className="user-info-icon" />
        <div>
          <Text strong>Last Name: </Text>
          <Text>{user_info.last_name || "N/A"}</Text>
        </div>
      </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="user-info-item" style={{ width: "60%" }}>
          <Icon type="MailOutlined" className="user-info-icon" />
          <div>
            <Text>{t("Email") + ": "}</Text>
            <Text strong>{user_info.email || "N/A"}</Text>
          </div>
        </div>
        <div className="user-info-item" style={{ width: "45%" }}>
          <Icon type="PhoneOutlined" className="user-info-icon" />
          <div>
            <Text>{t("Phone") + ": "}</Text>
            <Text strong>{user_info.phone_number || "N/A"}</Text>
          </div>
        </div>
        <div className="user-info-item" style={{ width: "100%" }}>
          <Icon type="HomeOutlined" className="user-info-icon" />
          <div>
            <Text>{t("Address") + ": "}</Text>
            <Text strong>{user_info.address || "N/A"}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserDetailsCard;
