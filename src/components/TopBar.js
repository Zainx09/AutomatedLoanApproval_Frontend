import React, { useContext } from "react";
import { Button, Menu, Modal, Input, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../utils/IconWrapper";
import "../styles/topbar.css";

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const { user, login, logout } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const handleLogin = () => {
    if (username && password) {
      login(username);
      setVisible(false);
      setUsername("");
      setPassword("");
    }
  };

  const menuItems = [
    { key: "/home", label: t("home"), icon: <Icon type="Home" /> },
    ...(user
      ? [{ key: "/admin", label: t("admin"), icon: <Icon type="Setting" /> }]
      : []),
    {
      key: "/checkapproval",
      label: t("check_approval_menu"),
      icon: <Icon type="FileSearch" />,
    },
  ];

  const LanguageMenu = ({ changeLanguage }) => (
    <Menu className="topbar-language-menu">
      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        <Icon type="Global" style={{ marginRight: 10 }} /> English
      </Menu.Item>
      <Menu.Item key="fr" onClick={() => changeLanguage("fr")}>
        <Icon type="Global" style={{ marginRight: 10 }} /> Français
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="topbar-container">
      <Menu
        className="topbar-nav-menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />

      {/* <div className="topbar-actions">
        {user ? (
          <>
            <span className="topbar-user-info">
              <Icon type="User" className="topbar-user-icon" />
              {user}
            </span>
            <Button
              className="topbar-logout-btn"
              onClick={logout}
            >
              {t("logout")}
            </Button>
          </>
        ) : (
          <Button
            className="topbar-login-btn"
            type="primary"
            onClick={() => setVisible(true)}
          >
            {t("login")}
          </Button>
        )}

        <Dropdown
          overlay={<LanguageMenu changeLanguage={changeLanguage} />}
          trigger={["click"]}
        >
          <Button
            className="topbar-language-btn"
            icon={<Icon type="Global" />}
          >
            {currentLanguage.toUpperCase()}
          </Button>
        </Dropdown>
      </div> */}

      <div style={{ color: "black" }}>
        {/* User Info or Login Button */}
        {user ? (
          <>
            <span style={{ marginRight: "10px", color: "white" }}>
              <Icon
                type={"User"}
                style={{ marginRight: "5px", color: "white" }}
              />
              {user} {/* Assuming user object has a username field */}
            </span>
            <Button
              color="danger"
              variant="solid"
              onClick={logout}
              style={{ color: "#fff" }}
            >
              {t("logout")}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setVisible(true)}
            // style={{ color: "white"}}
            type="primary"
          >
            {t("login")}
          </Button>
        )}

        {/* Language Icon Button with Dropdown */}
        <Dropdown
          overlay={<LanguageMenu changeLanguage={changeLanguage} />}
          trigger={["click"]}
        >
          <Button
            icon={<Icon type={"Global"} />}
            style={{ marginLeft: "10px", color: "black", borderColor: "#fff" }}
          >
            {currentLanguage}
          </Button>
        </Dropdown>
      </div>

      <Modal
        className="topbar-login-modal"
        title={t("login")}
        visible={visible}
        onOk={handleLogin}
        onCancel={() => setVisible(false)}
        okText={t("login")}
        cancelText={t("cancel")}
      >
        <Input
          placeholder={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default TopBar;

// import React, { useContext } from "react";
// import { Button, Menu, Modal, Input, Dropdown } from "antd";
// import { useTranslation } from "react-i18next";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import Icon from "../utils/IconWrapper";
// import "../styles/topBar.css"

// const TopBar = () => {
//   const { t, i18n } = useTranslation();
//   const { user, login, logout } = useContext(AuthContext);
//   const [visible, setVisible] = React.useState(false);
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const navigate = useNavigate();

//   // Get the current language
//   const currentLanguage = i18n.language;

//   const changeLanguage = (lng) => i18n.changeLanguage(lng);

//   const handleLogin = () => {
//     if (username && password) {
//       login(username);
//       setVisible(false);
//       setUsername("");
//       setPassword("");
//     }
//   };

//   const menuItems = [
//     { key: "/home", label: t("home") },
//     ...(user ? [{ key: "/admin", label: t("admin") }] : []),
//     { key: "/checkapproval", label: t("check_approval") },
//     // { key: "/guide", label: t("guide") },

//   ];

//   const LanguageMenu = ({ changeLanguage }) => (
//     <Menu>
//       <Menu.Item key="en" onClick={() => changeLanguage("en")}>
//         <Icon type={"Global"} style={{marginRight:10}}/> English
//       </Menu.Item>
//       <Menu.Item key="fr" onClick={() => changeLanguage("fr")}>
//         <Icon type={"Global"} style={{marginRight:10}}/> French
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#001529",
//         color: "#fff",
//       }}
//     >
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         items={menuItems}
//         onClick={({ key }) => navigate(key)}
//         style={{ flex: 1, background: "transparent" }}
//       />
// <div style={{ color: "black" }}>
//   {/* User Info or Login Button */}
//   {user ? (
//     <>
//       <span style={{ marginRight: "10px", color: "white" }}>
//         <Icon
//           type={"User"}
//           style={{ marginRight: "5px", color: "white" }}
//         />
//         {user} {/* Assuming user object has a username field */}
//       </span>
//       <Button
//         color="danger"
//         variant="solid"
//         onClick={logout}
//         style={{ color: "#fff" }}
//       >
//         {t("logout")}
//       </Button>
//     </>
//   ) : (
//     <Button
//       onClick={() => setVisible(true)}
//       // style={{ color: "white"}}
//       type="primary"
//     >
//       {t("login")}
//     </Button>
//   )}

//   {/* Language Icon Button with Dropdown */}
//   <Dropdown
//     overlay={<LanguageMenu changeLanguage={changeLanguage} />}
//     trigger={["click"]}
//   >
//     <Button
//       icon={<Icon type={"Global"} />}
//       style={{ marginLeft: "10px", color: "black", borderColor: "#fff" }}
//     >
//       {currentLanguage}
//     </Button>
//   </Dropdown>
// </div>

//       <Modal
//         title={t("login")}
//         visible={visible}
//         onOk={handleLogin}
//         onCancel={() => setVisible(false)}
//         okText={t("login")}
//       >
//         <Input
//           placeholder={t("username")}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{ marginBottom: "10px" }}
//         />
//         <Input.Password
//           placeholder={t("password")}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default TopBar;
