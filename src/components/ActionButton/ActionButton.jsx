import "./ActionButton.scss";
import { Plus } from "react-feather";
import { useCounterStore } from "../../stores/useCounterStore";

export function ActionButton() {
	const setIsCreatingCounter = useCounterStore((state) => state.setIsCreatingCounter);

	return (
		<button
			className="action-button"
			onClick={() => {
				setIsCreatingCounter(true);
			}}
		>
			<Plus size={35} />
		</button>
	);
}
