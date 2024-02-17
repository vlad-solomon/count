import "./Group.scss";
import { Counter } from "../Counter/Counter";
import { ChevronDown } from "react-feather";
import { useCounterStore } from "../../stores/useCounterStore";
import classNames from "classnames";

export function Group({ id, title, isExpanded }) {
	const counters = useCounterStore((state) => state.counters);
	const activeCounter = useCounterStore((state) => state.activeCounter);
	const toggleGroup = useCounterStore((state) => state.toggleGroup);
	const groupedCounters = counters.filter((counter) => counter.groupId === id);

	return (
		<div className={classNames("group", isExpanded && "group--is-expanded")}>
			<div className="group__title" onClick={() => toggleGroup(id)}>
				{title}
				<ChevronDown size={12} style={{ rotate: !isExpanded ? "-90deg" : "0deg" }} />
			</div>
			<div className="group__counters" style={{ display: !isExpanded ? "none" : "flex" }}>
				{groupedCounters.map((counter) => (
					<Counter key={counter.id} {...counter} isActive={counter.id === activeCounter} />
				))}
			</div>
		</div>
	);
}
