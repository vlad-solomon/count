import "./Group.scss";
import { Counter } from "../Counter/Counter";
import { ChevronDown } from "react-feather";
import { useCounterStore } from "../../stores/useCounterStore";
import { useModalStore } from "../../stores/useModalStore";
import classNames from "classnames";

export function Group({ id, name, isExpanded }) {
	const activeCounterId = useCounterStore((state) => state.activeCounterId);
	const toggleGroup = useCounterStore((state) => state.toggleGroup);
	const counters = useCounterStore((state) => state.counters);
	const removeGroup = useCounterStore((state) => state.removeGroup);
	const setModal = useModalStore((state) => state.setModal);

	const groupCounters = counters.filter((counter) => counter.groupId === id);

	return (
		<div className={classNames("group", isExpanded && "group--is-expanded")}>
			<div className="group__title" onClick={() => toggleGroup(id)}>
				{name}
				<ChevronDown size={12} style={{ rotate: !isExpanded ? "-90deg" : "0deg" }} />
			</div>
			<div className="group__counters" style={{ display: !isExpanded ? "none" : "flex" }}>
				{groupCounters.map((counter) => (
					<Counter key={counter.id} groupId={id} {...counter} isActive={counter.id === activeCounterId} />
				))}
				{!groupCounters.length && (
					<span className="group__empty">
						This group is currently empty.
						<br />
						<span onClick={() => setModal("create")}>Add a counter</span> or <span onClick={() => removeGroup(id)}>Remove the group</span>
					</span>
				)}
			</div>
		</div>
	);
}

export function Groups() {
	const groups = useCounterStore((state) => state.groups);

	if (!groups.length)
		return (
			<span className="app__empty">
				Welcome to count!
				<br />
				<br /> Use the create button to start adding counters
			</span>
		);

	return groups.map(({ id, name, isExpanded }) => <Group key={id} id={id} name={name} isExpanded={isExpanded} />);
}
