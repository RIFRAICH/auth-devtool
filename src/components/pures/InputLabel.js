import { useState } from "react";
import styles from "@/styles/components/InputLabel.module.scss";

const InputLabel = ({
  id,
  type,
  placeholder,
  example,
  required = false,
  className = "",
  value = "",
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (event) => {
    setIsFocused(false);
    setHasText(event.target.value.length > 0);
  };

  const handleChange = (event) => {
    setHasText(event.target.value.length > 0);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <section className={className}>
      <section
        className={`${styles.container} ${hasText || isFocused ? styles.active : ""} ${isFocused ? styles.focused : ""}`}
      >
        <label className={styles.label}>{placeholder}</label>
        <input
          className={styles.input}
          type={type}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          required={required}
          id={id}
        />
      </section>
      {example && <p className={styles.exampleText}>Ex : {example}</p>}
    </section>
  );
};

export default InputLabel;
