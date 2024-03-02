import "./Counter.scss";
import classNames from "classnames";
import { useCounterStore } from "../../stores/useCounterStore";
import { useModalStore } from "../../stores/useModalStore";
import { useLongPress } from "@uidotdev/usehooks";

export function Counter({ id, name, unit, icon, value, isActive }) {
	const setModal = useModalStore((state) => state.setModal);
	const setModifiedCounterId = useCounterStore((state) => state.setModifiedCounterId);
	const setActiveCounterId = useCounterStore((state) => state.setActiveCounterId);
	const setValue = useCounterStore((state) => state.setValue);
	const longPressAttrs = useLongPress(handleModifyCounter, { threshold: 500 });

	function handleModifyCounter(e) {
		if (e.cancelable) e.preventDefault();
		setModal("modify");
		setModifiedCounterId(id);
	}

	// todo handle long names
	// todo handle dragging onto groups (try: only the active counter should display a drag handle and be draggable also)

	return (
		<div {...longPressAttrs} className={classNames("counter", isActive && "counter--active")} onClick={() => setActiveCounterId(id)} onContextMenu={(e) => handleModifyCounter(e)}>
			<div className="counter__icon">{icon}</div>
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
