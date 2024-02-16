import { create } from "zustand";

export const useCounterStore = create((set) => ({
	counters: [
		{
			id: 1,
			name: "name 1",
			unit: "unit",
			value: 0,
		},
		{
			id: 2,
			name: "name 2",
			unit: "unit",
			value: 1,
		},
		{
			id: 3,
			name: "name 3",
			unit: "unit",
			value: 2,
		},
	],
	activeCounter: 1,
	setActiveCounter: (id) => set({ activeCounter: id }),
	setValue: (id, action) =>
		set((state) => ({ counters: state.counters.map((counter) => (counter.id === id ? { ...counter, value: action === "increment" ? counter.value + 1 : counter.value - 1 } : counter)) })),
}));
