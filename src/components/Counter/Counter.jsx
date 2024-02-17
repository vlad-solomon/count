import "./Counter.scss";
import classNames from "classnames";
import { useCounterStore } from "../../stores/useCounterStrore";

export function Counter({ id, name, unit, icon, value, isActive }) {
	const setActiveCounter = useCounterStore((state) => state.setActiveCounter);
	const setValue = useCounterStore((state) => state.setValue);

	return (
		<div className={classNames("counter", isActive && "counter--active")} onClick={() => setActiveCounter(id)}>
			<div className="counter__icon">👋</div>
			<div className="counter__details">
				<div className="counter__title">{name}</div>
				{unit && <div className="counter__unit">{unit}</div>}
			</div>
			<div className="counter__counter-display">
				<button onClick={() => setValue(id, "decrement")}>-</button>
				<div className="counter__value">{value}</div>
				<button onClick={() => setValue(id, "increment")}>+</button>
			</div>
		</div>
	);
}
