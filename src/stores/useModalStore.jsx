import { create } from "zustand";

export const useModalStore = create((set) => ({
	modal: "create",
	setModal: (modal) => set({ modal }),
}));
