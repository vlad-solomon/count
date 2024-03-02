import "./ModifyCounterModal.scss";
import { useModalStore } from "../../stores/useModalStore";
import { useCounterStore } from "../../stores/useCounterStore";
import { useRef } from "react";
import useIcon from "../../hooks/useIcon";

export function ModifyCounterModal() {
	const counters = useCounterStore((state) => state.counters);
	const modifiedCounterId = useCounterStore((state) => state.modifiedCounterId);
	const modifyCounter = useCounterStore((state) => state.modifyCounter);
	const setModal = useModalStore((state) => state.setModal);
	const formRef = useRef();

	const selectedCounter = counters.find((counter) => counter.id === modifiedCounterId);

	return (
		<>
			<div className="modal__title">
				Modify counter <br />
			</div>
			<div className="modal">
				<form className="modal__form" id="form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" name="counterName" defaultValue={selectedCounter.name} />
					</div>
					<div className="modal__input">
						<label>unit of measurement (optional)</label>
						<input type="text" name="unitOfMeasurement" defaultValue={selectedCounter.unit} />
					</div>
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
