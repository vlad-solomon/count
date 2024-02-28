import { create } from "zustand";

export const useModalStore = create((set) => ({
	modal: null,
	setModal: (modal) => set({ modal }),
}));
