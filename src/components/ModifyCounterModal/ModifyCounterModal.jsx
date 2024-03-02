import "./ModifyCounterModal.scss";
import { useModalStore } from "../../stores/useModalStore";
import { useCounterStore } from "../../stores/useCounterStore";
import { useRef } from "react";
import { Trash as Remove } from "react-feather";
import useIcon from "../../hooks/useIcon";
import { Input } from "../Input/Input";

export function ModifyCounterModal() {
	const counters = useCounterStore((state) => state.counters);
	const modifiedCounterId = useCounterStore((state) => state.modifiedCounterId);
	const modifyCounter = useCounterStore((state) => state.modifyCounter);
	const removeCounter = useCounterStore((state) => state.removeCounter);
	const setModal = useModalStore((state) => state.setModal);
	const formRef = useRef();

	const selectedCounter = counters.find((counter) => counter.id === modifiedCounterId);

	return (
		<>
			<div className="modal__title">
				Modify counter
				<button
					onClick={() => {
						setModal(null);
						removeCounter(selectedCounter.id);
					}}
				>
					<Remove size={18} />
				</button>
			</div>
			<div className="modal">
				<form className="modal__form" id="form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<Input label="Counter name" defaultValue={selectedCounter.name} name="counterName" />
					<Input label="Unit of measurement" defaultValue={selectedCounter.unit} name="unitOfMeasurement" optional={true} />
				</form>
			</div>
			<div className="modal__controls">
				<button
					type="submit"
					form="form"
					onClick={() => {
						const formData = new FormData(formRef.current);
						const counter = {
							name: formData.get("counterName").trim(),
							unit: formData.get("unitOfMeasurement").trim(),
							icon: useIcon(formData.get("counterName").trim()),
						};

						if (!counter.name) return;
						modifyCounter({ id: modifiedCounterId, modifiedCounter: counter });
						setModal(null);
					}}
				>
					accept
				</button>
				<button type="button" onClick={() => setModal(null)}>
					cancel
				</button>
			</div>
		</>
	);
}
