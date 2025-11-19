import { useContext } from "react";
import { ThemeContext, UserContext } from "../../contexts";
import styles from "./header.module.css";

export function Header() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <h1>Hello {user.name}</h1>
    </header>
  );
}
