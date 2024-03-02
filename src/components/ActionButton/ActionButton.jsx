import { useCounterStore } from "../../stores/useCounterStore";
import { useModalStore } from "../../stores/useModalStore";
import "./ActionButton.scss";
import { Plus } from "react-feather";
import classNames from "classnames";

export function ActionButton() {
	const setModal = useModalStore((state) => state.setModal);
	const counters = useCounterStore((state) => state.counters);

	return (
		<button
			className={classNames("action-button", !counters.length && "action-button--animation")}
			onClick={() => {
				setModal("create");
			}}
		>
			<Plus size={35} />
		</button>
	);
}
