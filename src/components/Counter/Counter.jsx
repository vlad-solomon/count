import "./Counter.scss";
import { useState } from "react";
import classNames from "classnames";

export function Counter({ isActive }) {
	const [count, setCount] = useState(0);

	return (
		<div className={classNames("counter", isActive && "counter--active")}>
			<div className="counter__icon">👋</div>
			<div className="counter__details">
				<div className="counter__title">Item name</div>
				<div className="counter__unit">unit of measurement</div>
			</div>
			<div className="counter__counter-display">
				<button onClick={() => setCount((prev) => --prev)}>-</button>
				<div className="counter__value">{count}</div>
				<button onClick={() => setCount((prev) => ++prev)}>+</button>
			</div>
		</div>
	);
}
