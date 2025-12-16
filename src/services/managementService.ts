import axiosInstance from '@/lib/axios';
import {
  MedicinePayload,
  BatchPayload,
  ShipmentPayload,
  UserPayload,
} from "@/interfaces/management";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createMedicine = async (data: MedicinePayload) => {
  const response = await axiosInstance.post(`/medications`, data);
  return response.data;
};

export const createBatch = async (data: BatchPayload) => {
  const response = await axiosInstance.post(`/batchs`, data);
  return response.data;
};

export const createShipment = async (data: ShipmentPayload) => {
  const response = await axiosInstance.post(`${NEXT_PUBLIC_API_URL}/shipments`, data);
  return response.data;
};

export const registerUser = async (data: UserPayload) => {
  const response = await axiosInstance.post(`/auth/register`, data);
  return response.data;
};
