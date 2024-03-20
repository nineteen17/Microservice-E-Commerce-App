import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  itemId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem: CartItem) =>
        set((state: CartState) => {
          const index = state.items.findIndex(
            (item: CartItem) => item.itemId === newItem.itemId
          );
          if (index === -1) {
            // Item not in cart, add it
            return {
              items: [
                ...state.items,
                { itemId: newItem.itemId, quantity: newItem.quantity },
              ],
            };
          } else {

            const updatedItems = state.items.map((item, i) =>
              i === index
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
            return { items: updatedItems };
          }
        }),
      updateQuantity: (itemId: string, quantity: number) =>
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.itemId === itemId ? { ...item, quantity } : item
          ),
        })),
      removeItem: (itemId: string) =>
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.itemId !== itemId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      getStorage: () => localStorage,
    }
  ) as any
);
