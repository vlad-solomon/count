import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useCounterStore = create((set, get) => ({
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
	counters: [
		{
			id: 1,
			groupId: 1,
			name: "name 1",
			unit: "unit",
			icon: "na",
			value: 0,
		},
		{
			id: 2,
			groupId: 1,
			name: "name 2",
			unit: "unit",
			icon: "na",
			value: 0,
		},
		{
			id: 3,
			groupId: 2,
			name: "name 3",
			unit: "unit",
			icon: "na",
			value: 0,
		},
	],
	activeCounterId: 1,
	toggleGroup: (id) => set((state) => ({ groups: state.groups.map((group) => (group.id === id ? { ...group, isExpanded: !group.isExpanded } : group)) })),
	setActiveCounterId: (id) => set({ activeCounterId: id }),
	setValue: (id, action) => {
		function getValue(prev, action) {
			switch (action) {
				case "increment":
					return prev + 1;
				case "decrement":
					return Math.max(0, prev - 1);
			}
		}
		set((state) => ({ counters: state.counters.map((counter) => (counter.id === id ? { ...counter, value: getValue(counter.value, action) } : counter)) }));
	},
	addCounter: ({ groupId, groupName, counter }) => {
		if (groupId === "new") {
			const newGroupId = crypto.randomUUID();
			set((state) => ({ groups: [...state.groups, { id: newGroupId, name: groupName, isExpanded: true }], counters: [...state.counters, { groupId: newGroupId, ...counter }] }));
		} else {
			set((state) => ({ counters: [...state.counters, { groupId, ...counter }] }));
		}
	},
	// modifiedCounterId: [null, null],
	// setModifiedCounterId: (groupId, counterId) => set({ modifiedCounterId: [groupId, counterId] }),
	// modifyCounter: ({ groupId, counterId, modifiedCounter }) =>
	// 	set((state) => ({
	// 		groups: state.groups.map((group) =>
	// 			group.id === groupId ? { ...group, counters: group.counters.map((counter) => (counter.id === counterId ? { ...counter, ...modifiedCounter } : counter)) } : group
	// 		),
	// 	})),
	NEW_GROUP_OPTION: { id: "new", name: "Create new group..." },
}));
