import styles from "./Page.module.scss";

type Props = {
  children: React.ReactNode;
};

export const Page = ({ children }: Props) => {
  return <div className={styles.pageContainer}>{children}</div>;
};
