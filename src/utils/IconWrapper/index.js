import * as Icons from "@ant-design/icons";

const Icon = ({ type, ...props }) => {
  try {
    if (!type) return null;

    // Convert "home" -> "HomeOutlined"
    const iconName = `${type.charAt(0).toUpperCase()}${type.slice(1)}Outlined`;

    // Try fetching the icon dynamically
    const AntIcon = Icons[`${type}`] || Icons[`${iconName}`] || 
    Icons[`${type.charAt(0).toUpperCase()}${type.slice(1)}Filled`] || 
    Icons[`${type.charAt(0).toUpperCase()}${type.slice(1)}TwoTone`];


    if (!AntIcon) {
      console.warn(`Icon "${type}" not found in @ant-design/icons.`);
      return <>?</>;
    }

    return <AntIcon {...props} />;
  } catch (error) {
    console.error(`Error rendering icon "${type}":`, error);
    return null; // Return nothing if any unexpected error occurs
  }
};

export default Icon;
