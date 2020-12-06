import { User } from './user.model';

export interface Order {
  orderId: number;
  orderStart: string;
  orderEnd: string;
  orderRealEnd: string;
  custId: number;
  vehicleNumber: number;
  empRegister: number;
  customer: User;
}

export class OrderClass implements Order{
  orderId: number;
  orderStart: string;
  orderEnd: string;
  orderRealEnd: string;
  custId: number;
  vehicleNumber: number;
  empRegister: number;
  customer: User;
}