import cn from "classnames";
import styles from "./auth-form-template.module";

function AuthFormTemplate({ className, children }) {
  return (
    <div className={cn(styles.authFormTemplate, className)}>{children}</div>
  );
}

function Title({ className, children }) {
  return <div className={cn(styles.title, className)}>{children}</div>;
}

function Content({ className, children }) {
  return <div className={cn(styles.content, className)}>{children}</div>;
}

function Footer({ className, children }) {
  return <div className={cn(styles.footer, className)}>{children}</div>;
}

export default Object.assign(AuthFormTemplate, {
  Title,
  Content,
  Footer,
});
