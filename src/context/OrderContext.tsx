import { createContext, useContext, useState, ReactNode } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'placed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[], total: number) => void;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: OrderItem[], total: number) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      status: 'placed',
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
