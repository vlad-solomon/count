import "./Counter.scss";
import classNames from "classnames";
import { useCounterStore } from "../../stores/useCounterStore";
import { useModalStore } from "../../stores/useModalStore";
import { useCounter, useLongPress } from "@uidotdev/usehooks";

export function Counter({ id, groupId, name, unit, icon, value, isActive }) {
	const setModal = useModalStore((state) => state.setModal);
	const setModifiedCounterId = useCounterStore((state) => state.setModifiedCounterId);
	const setActiveCounterId = useCounterStore((state) => state.setActiveCounterId);
	const setValue = useCounterStore((state) => state.setValue);
	const longPressAttrs = useLongPress(
		() => {
			setModal("modify");
			setModifiedCounterId(groupId, id);
		},
		{ threshold: 500 }
	);

	return (
		<div
			{...longPressAttrs}
			className={classNames("counter", isActive && "counter--active")}
			onClick={() => setActiveCounterId(id)}
			onContextMenu={(e) => {
				e.preventDefault();
				setModal("modify");
				setModifiedCounterId(groupId, id);
			}}
		>
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
