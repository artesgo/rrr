import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme";
import styles from "./header.module.css";

export function Header() {
  const theme = useContext(ThemeContext);

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <h1>Header Component</h1>
    </header>
  );
}
