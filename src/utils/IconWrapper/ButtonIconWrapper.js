import * as Icons from "@ant-design/icons";

const BtnIcon = (type) => {
  const IconComponent = Icons[`${type.charAt(0).toUpperCase()}${type.slice(1)}Outlined`] || 
      Icons[`${type.charAt(0).toUpperCase()}${type.slice(1)}Filled`] || 
      Icons[`${type.charAt(0).toUpperCase()}${type.slice(1)}TwoTone`];
  return IconComponent ? <IconComponent /> : null;
};

export default BtnIcon;
