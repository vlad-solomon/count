import "./Counter.scss";

export function Counter() {
	return (
		<div className="counter">
			<div className="counter__icon">👋</div>
			<div className="counter__details">
				<div className="counter__title">Item name</div>
				<div className="counter__unit">unit of measurement</div>
			</div>
			<div className="counter__counter-display">
				<button>-</button>
				<div className="counter__value">13</div>
				<button>+</button>
			</div>
		</div>
	);
}
