import { useModalStore } from "../../stores/useModalStore";
import "./ActionButton.scss";
import { Plus } from "react-feather";

export function ActionButton() {
	const setModal = useModalStore((state) => state.setModal);

	return (
		<button
			className="action-button"
			onClick={() => {
				setModal("create");
			}}
		>
			<Plus size={35} />
		</button>
	);
}
