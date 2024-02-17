import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCounterStore = create(
	// persist(
	(set) => ({
		counters: [
			{
				id: 1,
				name: "name 1",
				unit: "unit",
				value: 0,
				groupId: 1,
			},
			{
				id: 2,
				name: "name 2",
				unit: "unit",
				value: 1,
				groupId: 1,
			},
			{
				id: 3,
				name: "name 3",
				unit: "unit",
				value: 2,
				groupId: 2,
			},
		],
		activeCounter: 1,
		setActiveCounter: (id) => set({ activeCounter: id }),
		setValue: (id, action) =>
			// todo create a function to get the value easier, for more actions, to limit values, and so on
			set((state) => ({
				counters: state.counters.map((counter) => (counter.id === id ? { ...counter, value: action === "increment" ? counter.value + 1 : Math.max(0, counter.value - 1) } : counter)),
			})),
		groups: [
			{
				id: 1,
				name: "group 1",
				isExpanded: true,
			},
			{
				id: 2,
				name: "group 2",
				isExpanded: true,
			},
		],
		setExpandedGroup: (id) => set((state) => ({ groups: state.groups.map((group) => (group.id === id ? { ...group, isExpanded: !group.isExpanded } : group)) })),
	})
	// {
	// 	name: "counters-storage",
	// }
	// )
);
