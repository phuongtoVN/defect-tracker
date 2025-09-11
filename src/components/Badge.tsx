import React from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  text: string;
  color?: "gray" | "blue" | "amber" | "green" | "red";
};

export default function Badge({ text, color = "gray" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{text}</span>;
}
