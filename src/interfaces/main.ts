import { JSX } from "react";

// Interfaces for the main component
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
  optimalRange?: {
    min: number;
    max: number;
  };
}

export interface CardBlockchainProps {
  onVerify: (value: string) => void;
  loading: boolean;
  blockId?: string;
}

