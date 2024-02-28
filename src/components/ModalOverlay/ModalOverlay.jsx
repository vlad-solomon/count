import "./ModalOverlay.scss";
import { CreateCounterModal } from "../CreateCounterModal/CreateCounterModal";
import { ModifyCounterModal } from "../ModifyCounterModal/ModifyCounterModal";
import { useModalStore } from "../../stores/useModalStore";
import { useClickAway } from "@uidotdev/usehooks";

const modals = {
	create: CreateCounterModal,
	modify: ModifyCounterModal,
};

export function ModalOverlay() {
	const modal = useModalStore((state) => state.modal);
	const setModal = useModalStore((state) => state.setModal);
	const ref = useClickAway(() => setModal(null));
	const SelectedModal = modals[modal];

	return (
		<div className="modal-overlay">
			<div className="modal-overlay__children" ref={ref}>
				{modal && <SelectedModal />}
			</div>
		</div>
	);
}
