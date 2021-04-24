import { OrderItem } from './order_item.models';

export interface Order {
  totalPrice: number;
  customer_phone: string;
  id_user: string;
  orderItem: OrderItem[];
}
