import { create } from "zustand";

// Simple UI flag so any component can open the cart drawer.
interface CartDrawerState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCartDrawer = create<CartDrawerState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
