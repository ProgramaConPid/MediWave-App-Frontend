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
  transactionId: string;
  blockId: string;
}

export interface TraceCardProps {
  timeline: TraceStep[];
}

export interface TraceStep {
  type: "origin" | "transit" | "destination";
  place: string;     
  city?: string;
  country: string;
  datetime: string;
  temperature?: number;
}