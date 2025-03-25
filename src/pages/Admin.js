import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Typography, Card, Divider, Progress, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { getAdminUsers, predictLoanById } from "../agent/api";
import { dataPointMetaData } from "../commons"; // Adjust import path
import UserStatsHeader from "../components/UserStatsHeader";

const { Title, Text } = Typography;
const { Search } = Input;

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

const getCreditScoreColor = (score) => {
  if (score >= 700) return CREDIT_SCORE_COLORS.high;
  if (score >= 600) return CREDIT_SCORE_COLORS.mid;
  return CREDIT_SCORE_COLORS.low;
};

const AdminPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isPredictModalVisible, setIsPredictModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // List of datapoint names to include in columns
  const selectedDataPoints = ["Credit_Score", "Annual_Income", "Employment_Status", "Credit_Utilization", "Payment_History"];

  // Fetch data from /admin/users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle search filter
  const handleSearch = (value) => {
    const filtered = users.filter(
      (user) =>
        user.applicant_id.toString().includes(value) ||
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle predict button click
  const handlePredict = async (applicantId, event) => {
    event.stopPropagation(); // Prevent row click event from firing
    try {
      const response = await predictLoanById(applicantId);
      setPrediction(response);
      setIsPredictModalVisible(true);
    } catch (error) {
      console.error("Prediction Error:", error);
    }
  };

  // Handle row click to show details
  const handleRowClick = (record) => {
    setSelectedUser(record);
    setIsDetailsModalVisible(true);
  };

  // // Table columns
  // const columns = [
  //   {
  //     title: t("applicant_id"),
  //     dataIndex: "applicant_id",
  //     key: "applicant_id",
  //     sorter: (a, b) => a.applicant_id - b.applicant_id,
  //   },
  //   {
  //     title: t("username"),
  //     dataIndex: "username",
  //     key: "username",
  //     sorter: (a, b) => a.username.localeCompare(b.username),
  //   },
  //   {
  //     title: t("email"),
  //     dataIndex: "email",
  //     key: "email",
  //     sorter: (a, b) => a.email.localeCompare(b.email),
  //   },
  //   ...dataPointMetaData
  //     .filter((dataPoint) => selectedDataPoints.includes(dataPoint.name))
  //     .map((dataPoint) => ({
  //       title: t(dataPoint.name),
  //       key: dataPoint.key,
  //       dataIndex: dataPoint.key,
  //       sorter: (a, b) => {
  //         const aValue = a[dataPoint.key] || "";
  //         const bValue = b[dataPoint.key] || "";
  //         return aValue.toString().localeCompare(bValue.toString());
  //       },
  //       render: (_, record) => (
  //         <div>
  //           <p>{dataPoint?.options?.length > 0 ? dataPoint.options.find(opt => opt.value === record[dataPoint.key])?.label : record?.[dataPoint.key] ?? "N/A"}</p>
  //         </div>
  //       ),
  //     })),
  //   {
  //     title: t("action"),
  //     key: "action",
  //     render: (_, record) => (
  //       <Button
  //         type="primary"
  //         onClick={(event) => handlePredict(record.applicant_id, event)} // Pass event to handler
  //         style={{ background: "#001529", borderColor: "#001529" }}
  //       >
  //         {t("check_approval")}
  //       </Button>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: t("applicant_id"),
      dataIndex: "applicant_id",
      key: "applicant_id",
      sorter: (a, b) => a.applicant_id - b.applicant_id,
    },
    {
      title: t("username"),
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    ...dataPointMetaData
    .filter((dataPoint) => selectedDataPoints.includes(dataPoint.name))
    .map((dataPoint) => ({
      title: t(dataPoint.name),
      key: dataPoint.key,
      dataIndex: dataPoint.key,
      sorter: (a, b) => {
        const aValue = a[dataPoint.key] || "";
        const bValue = b[dataPoint.key] || "";
        return aValue.toString().localeCompare(bValue.toString());
      },
      render: (_, record) => {
        if (dataPoint.key === "credit_score") {
          const score = record[dataPoint.key] || 0;
          const percent = (score / 900) * 100;
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Progress
                percent={percent}
                showInfo={false}
                strokeColor={getCreditScoreColor(score)}
                style={{ width: "70%" }}
              />
              <span>{score}</span>
            </div>
          );
        }
        if (dataPoint.key === "employment_status") {
          const value = record[dataPoint.key];
          const label = dataPoint.options.find((opt) => opt.value === value)?.label || "N/A";
          return (
            <Tag
              color={EMPLOYMENT_STATUS_COLORS[value] || "#d9d9d9"} // Default gray if value missing
              style={{ color: "white", borderRadius: "5px", padding: "2px 8px", fontWeight:'bold' }}
            >
              {label}
            </Tag>
          );
        }
        if (dataPoint.key === "payment_history") {
          const value = record[dataPoint.key];
          const label = dataPoint.options.find((opt) => opt.value === value)?.label || "N/A";
          return (
            <Tag
              color={PAYMENT_HISTORY_COLORS[value] || "#d9d9d9"} // Default gray if value missing
              style={{ color: "white", borderRadius: "5px", padding: "2px 8px", fontWeight:'bold' }}
            >
              {label}
            </Tag>
          );
        }
        return (
          <div>
            <p>
              {dataPoint?.options?.length > 0
                ? dataPoint.options.find((opt) => opt.value === record[dataPoint.key])?.label
                : record?.[dataPoint.key] ?? "N/A"}
            </p>
          </div>
        );
      },
    })),
    {
      title: t("action"),
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={(event) => handlePredict(record.applicant_id, event)}
          style={{ background: "#001529", borderColor: "#001529" }}
        >
          {t("check_approval")}
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowX: "hidden",
      }}
    >
      <Title level={2}>{t("admin_users")}</Title>
      <UserStatsHeader data={filteredUsers} handleSearch={handleSearch} t={t} />
      {/* <Search
        placeholder={t("search_users")}
        onSearch={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      /> */}
      <div
        style={{
          overflowX: "auto",
          // maxWidth: "95%",
        }}
      >
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="applicant_id"
          scroll={{ x: "max-content" }}
          bordered
          style={{cursor: 'pointer'}}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      {/* Prediction Modal */}
      <Modal
        title={t("prediction_result")}
        visible={isPredictModalVisible}
        onCancel={() => setIsPredictModalVisible(false)}
        footer={null}
      >
        {prediction && (
          <Card
            style={{
              borderColor:
                prediction.approval_status === 1 ? "#52c41a" : "#ff4d4f",
            }}
          >
            <Title level={4}>
              {prediction.approval_status === 1 ? t("approved") : t("denied")}
            </Title>
            <Text>DTI: {prediction.DTI.toFixed(2)}%</Text>
            <br />
            {prediction.approval_status === 1 ? (
              <>
                <Text>
                  {t("amount")}: ${prediction.approved_amount?.toFixed(2)}
                </Text>
                <br />
                <Text>
                  {t("interest_rate")}: {prediction.interest_rate?.toFixed(2)}%
                </Text>
              </>
            ) : (
              <>
                <Text>{t("denial_reasons")}:</Text>
                <ul>
                  {prediction.denial_reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </>
            )}
          </Card>
        )}
      </Modal>

      {/* User Details Modal */}
      <Modal
        title={<text style={{ fontSize: 20 }}>{t("user_details")}</text>}
        visible={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <div>
            <Text strong>{t('applicant_id')}: </Text>
            <Text>{selectedUser.applicant_id}</Text>
            <br />
            <Text strong>{t('username')}: </Text>
            <Text>{selectedUser.username}</Text>
            <br />
            <Text strong>{t('email')}: </Text>
            <Text>{selectedUser.email}</Text>
            <br />
            <Divider />
            <Title level={4}>{t("credit_details")}</Title>
            {dataPointMetaData.map((dataPoint) => (
              <div key={dataPoint.key}>
                <Text strong>{t(dataPoint.name)}: </Text>
                <Text>
                  {dataPoint.fieldType === "select"
                    ? dataPoint.options.find(
                        (opt) => opt.value === selectedUser[dataPoint.key]
                      )?.label || "N/A"
                    : selectedUser[dataPoint.key] ?? "N/A"}
                </Text>
                <br />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPage;

// import React, { useState, useEffect } from "react";
// import { Table, Input, Button, Modal, Typography, Card } from "antd";
// import { useTranslation } from "react-i18next";
// import { getAdminUsers, predictLoanById } from "../agent/api";
// import {dataPointMetaData} from '../commons'

// const { Title, Text } = Typography;
// const { Search } = Input;

// const AdminPage = () => {
//   const { t } = useTranslation();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [selectedApplicantId, setSelectedApplicantId] = useState(null);

//   // Fetch data from /admin/users on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getAdminUsers();
//         setUsers(data);
//         setFilteredUsers(data);
//       } catch (error) {
//         console.error("Error fetching admin users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Handle search filter
//   const handleSearch = (value) => {
//     const filtered = users.filter(
//       (user) =>
//         user.applicant_id.toString().includes(value) ||
//         user.username.toLowerCase().includes(value.toLowerCase()) ||
//         user.email.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   };

//   // Handle predict button click
//   const handlePredict = async (applicantId) => {
//     setSelectedApplicantId(applicantId);
//     try {
//       const response = await predictLoanById(applicantId);
//       setPrediction(response);
//       setIsModalVisible(true);
//     } catch (error) {
//       console.error("Prediction Error:", error);
//     }
//   };

//   // Table columns
//   const columns = [
//     {
//       title: t("applicant_id"),
//       dataIndex: "applicant_id",
//       key: "applicant_id",
//     },
//     {
//       title: t("username"),
//       dataIndex: "username",
//       key: "username",
//       sorter: (a, b) => a.username.localeCompare(b.username),
//     },
//     {
//       title: t("email"),
//       dataIndex: "email",
//       key: "email",
//     },
//     ...dataPointMetaData?.map(dataPoint => (
//       {
//         title: t(dataPoint.name),
//         key: dataPoint.key,
//         dataIndex: dataPoint.key,
//         sorter: (a, b) => a[dataPoint.key].localeCompare(b[dataPoint.key]),
//         render: (_, record) => (
//           <div>
//             <p>{record?.[dataPoint.key] || "N/A"}</p>
//           </div>
//         ),
//       }
//   )),
//     // {
//     //   title: t("credit_details"),
//     //   key: "credit_details",
//     //   render: (_, record) => (
//     //     <div>
//     //       <p>Credit Score: {record.credit_score || "N/A"}</p>
//     //       <p>Annual Income: ${record.annual_income || "N/A"}</p>
//     //       <p>Requested Amount: ${record.requested_amount || "N/A"}</p>
//     //     </div>
//     //   ),
//     // },
//     {
//       title: t("action"),
//       key: "action",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           onClick={() => handlePredict(record.applicant_id)}
//           style={{ background: "#001529", borderColor: "#001529" }}
//         >
//           {t("predict")}
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div
//       style={{
//         padding: "50px 10px",
//         width: "100%", // Fix container to 100% of viewport width
//         overflowX: "hidden", // Prevent page-level horizontal scroll
//       }}
//     >
//       <Title level={2}>{t("admin_users")}</Title>
//       <Search
//         placeholder={t("search_users")}
//         onSearch={handleSearch}
//         style={{ marginBottom: "20px", width: "300px" }}
//       />
//       <div
//         style={{
//           overflowX: "auto", // Enable horizontal scroll only for table
//           maxWidth: "100%", // Ensure table wrapper respects container width
//         }}
//       >
//         <Table
//           dataSource={filteredUsers}
//           columns={columns}
//           rowKey="applicant_id"
//           scroll={{ x: "max-content" }} // Ensure table scrolls horizontally
//         />
//       </div>

//       {/* Prediction Modal */}
//       <Modal
//         title={t("prediction_result")}
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         {prediction && (
//           <Card
//             style={{
//               borderColor: prediction.approval_status === 1 ? "#52c41a" : "#ff4d4f",
//             }}
//           >
//             <Title level={4}>
//               {prediction.approval_status === 1 ? t("approved") : t("denied")}
//             </Title>
//             <Text>DTI: {prediction.DTI.toFixed(2)}%</Text>
//             <br />
//             {prediction.approval_status === 1 ? (
//               <>
//                 <Text>{t("amount")}: ${prediction.approved_amount}</Text>
//                 <br />
//                 <Text>{t("interest_rate")}: {prediction.interest_rate}%</Text>
//               </>
//             ) : (
//               <>
//                 <Text>{t("denial_reasons")}:</Text>
//                 <ul>
//                   {prediction.denial_reasons.map((reason, index) => (
//                     <li key={index}>{reason}</li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </Card>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AdminPage;
