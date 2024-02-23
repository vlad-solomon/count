import "./Group.scss";
import { Counter } from "../Counter/Counter";
import { ChevronDown } from "react-feather";
import { useCounterStore } from "../../stores/useCounterStore";
import classNames from "classnames";

export function Group({ id, title, isExpanded, counters }) {
	const activeCounterId = useCounterStore((state) => state.activeCounterId);
	const toggleGroup = useCounterStore((state) => state.toggleGroup);

	return (
		<div className={classNames("group", isExpanded && "group--is-expanded")}>
			<div className="group__title" onClick={() => toggleGroup(id)}>
				{title}
				<ChevronDown size={12} style={{ rotate: !isExpanded ? "-90deg" : "0deg" }} />
			</div>
			<div className="group__counters" style={{ display: !isExpanded ? "none" : "flex" }}>
				{/* //todo empty state for empty groups */}
				{counters.map((counter) => (
					<Counter key={counter.id} groupId={id} {...counter} isActive={counter.id === activeCounterId} />
				))}
			</div>
		</div>
	);
}

export function Groups() {
	const groups = useCounterStore((state) => state.groups);

	return groups.map(({ id, name, isExpanded, counters }) => <Group key={id} id={id} title={name} isExpanded={isExpanded} counters={counters} />);
}
