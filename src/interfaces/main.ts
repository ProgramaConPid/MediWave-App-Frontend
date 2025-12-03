import { JSX } from "react";

export interface CardItemInfoProps {
  icon: JSX.Element;
  iconBg: "green" | "blue";
  title: string;
  productInfo: string | number;
  productDetails: string;
}