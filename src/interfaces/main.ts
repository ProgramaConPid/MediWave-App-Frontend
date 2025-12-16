import { JSX } from "react";

export interface CardItemInfoProps {
  icon: JSX.Element;
  iconBg: "green" | "blue" | "glacier";
  title: string;
  productInfo: string | number;
  productDetails: string;
}

export interface CardProductDetailsProps {
  productId: string;
  productName: string;
  productTag: string;
  currentTemp: string;
}

export interface CardBlockchainProps {
  onVerify: (value: string) => void;
  loading: boolean;
  blockId?: string;
}

