import styles from "@/styles/components/RoundedButton.module.scss";

const RoundedButton = ({
  text,
  buttonColor,
  textColor,
  action = () => {},
  type = "button",
  disabled = false,
  className = "",
}) => (
  <button
    className={`${styles.buttonContainer} ${className}`}
    style={{ backgroundColor: buttonColor, color: textColor }}
    onClick={action}
    type={type}
    disabled={disabled}
  >
    {text}
  </button>
);

export default RoundedButton;
