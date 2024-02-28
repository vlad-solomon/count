import "./ModalOverlay.scss";
import { CreateCounterModal } from "../CreateCounterModal/CreateCounterModal";
import { ModifyCounterModal } from "../ModifyCounterModal/ModifyCounterModal";
import { useModalStore } from "../../stores/useModalStore";

const modals = {
	create: CreateCounterModal,
	modify: ModifyCounterModal,
};

export function ModalOverlay() {
	const modal = useModalStore((state) => state.modal);
	const SelectedModal = modals[modal];

	return <div className="modal-overlay">{modal && <SelectedModal />}</div>;
}
