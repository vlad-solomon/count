import "./ActionButton.scss";
import { Plus } from "react-feather";

export function ActionButton() {
	return (
		<button className="action-button">
			<Plus size={35} />
		</button>
	);
}
