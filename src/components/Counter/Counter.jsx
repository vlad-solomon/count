import "./Counter.scss";
import classNames from "classnames";
import { useCounterStore } from "../../stores/useCounterStore";

export function Counter({ id, groupId, name, unit, icon, value, isActive }) {
	const setActiveCounterId = useCounterStore((state) => state.setActiveCounterId);
	const setValue = useCounterStore((state) => state.setValue);

	return (
		<div className={classNames("counter", isActive && "counter--active")} onClick={() => setActiveCounterId(id)}>
			<div className="counter__icon">{icon}</div>
			<div className="counter__details">
				<div className="counter__title">{name}</div>
				{unit && <div className="counter__unit">{unit}</div>}
			</div>
			<div className="counter__counter-display">
				<button onClick={() => setValue(groupId, id, "decrement")}> - </button>
				<div className="counter__value">{value}</div>
				<button onClick={() => setValue(groupId, id, "increment")}> + </button>
			</div>
		</div>
	);
}
