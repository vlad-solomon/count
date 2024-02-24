import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useCounterStore = create((set) => ({
	groups: [
		{
			id: 1,
			name: "group 1",
			isExpanded: true,
			counters: [
				{
					id: 1,
					name: "name 1",
					unit: "unit",
					icon: "na",
					value: 0,
				},
				{
					id: 2,
					name: "name 2",
					unit: "unit",
					icon: "na",
					value: 1,
				},
			],
		},
		{
			id: 2,
			name: "group 2",
			isExpanded: true,
			counters: [
				{
					id: 3,
					name: "name 3",
					unit: "unit",
					icon: "na",
					value: 2,
				},
			],
		},
	],
	// groups: [],
	toggleGroup: (id) => set((state) => ({ groups: state.groups.map((group) => (group.id === id ? { ...group, isExpanded: !group.isExpanded } : group)) })),
	activeCounterId: 1,
	setActiveCounterId: (id) => set({ activeCounterId: id }),
	setValue: (groupId, id, action) => {
		function getValue(prev, action) {
			switch (action) {
				case "increment":
					return prev + 1;
				case "decrement":
					return Math.max(0, prev - 1);
			}
		}

		set((state) => ({
			groups: state.groups.map((group) =>
				group.id === groupId ? { ...group, counters: group.counters.map((counter) => (counter.id === id ? { ...counter, value: getValue(counter.value, action) } : counter)) } : group
			),
		}));
	},
	isCreatingCounter: true,
	setIsCreatingCounter: (boolean) => set(() => ({ isCreatingCounter: boolean })),
	addCounter: ({ groupId, groupName, counter }) => {
		if (groupId === "new") {
			set((state) => ({ groups: [...state.groups, { id: crypto.randomUUID(), name: groupName, isExpanded: true, counters: [counter] }] }));
		} else {
			set((state) => ({ groups: state.groups.map((group) => (group.id === groupId ? { ...group, counters: [...group.counters, counter] } : group)) }));
		}
	},
}));
