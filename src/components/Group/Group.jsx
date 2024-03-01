import "./Group.scss";
import { Counter } from "../Counter/Counter";
import { ChevronDown } from "react-feather";
import { useCounterStore } from "../../stores/useCounterStore";
import classNames from "classnames";

export function Group({ id, name, isExpanded }) {
	const activeCounterId = useCounterStore((state) => state.activeCounterId);
	const toggleGroup = useCounterStore((state) => state.toggleGroup);
	const counters = useCounterStore((state) => state.counters);

	const groupCounters = counters.filter((counter) => counter.groupId === id);

	return (
		<div className={classNames("group", isExpanded && "group--is-expanded")}>
			<div className="group__title" onClick={() => toggleGroup(id)}>
				{name}
				<ChevronDown size={12} style={{ rotate: !isExpanded ? "-90deg" : "0deg" }} />
			</div>
			<div className="group__counters" style={{ display: !isExpanded ? "none" : "flex" }}>
				{/* //todo empty state for empty groups */}
				{groupCounters.map((counter) => (
					<Counter key={counter.id} groupId={id} {...counter} isActive={counter.id === activeCounterId} />
				))}
			</div>
		</div>
	);
}

export function Groups() {
	const groups = useCounterStore((state) => state.groups);

	return groups.map(({ id, name, isExpanded }) => <Group key={id} id={id} name={name} isExpanded={isExpanded} />);
}
