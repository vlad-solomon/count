import "./Modal.scss";
import { useState, useRef } from "react";
import { useCounterStore } from "../../stores/useCounterStore";
import { ChevronDown, X as Close } from "react-feather";
import useIcon from "../../hooks/useIcon";

export function Modal() {
	const isCreatingCounter = useCounterStore((state) => state.isCreatingCounter);
	const setIsCreatingCounter = useCounterStore((state) => state.setIsCreatingCounter);
	const groups = useCounterStore((state) => state.groups);
	const addCounter = useCounterStore((state) => state.addCounter);

	const NEW_GROUP_OPTION = { id: "new", name: "Create new group..." };
	const [isDropdown, setIsDropdown] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(NEW_GROUP_OPTION);
	const formRef = useRef();

	// todo set isDropdown to false when dismissing the Modal
	// todo add clicking on the modal__wrapper to close it | stopPropagation

	if (!isCreatingCounter) return;

	return (
		<div className="modal__wrapper">
			<div className="modal__title">Create counter</div>
			<div className="modal">
				<form className="modal__form" id="new-counter-form" ref={formRef} onSubmit={(event) => event.preventDefault()}>
					{/* //todo refactor icon -- use the first letter/letters of the counter? */}
					{/* <div className="modal__icon">
						<div className="modal__icon-picker">⭐</div>
						<button>icon</button>
					</div> */}
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" name="counterName" placeholder="Name" />
					</div>
					<div className="modal__input">
						<label>unit of measurement (optional)</label>
						<input type="text" name="unitOfMeasurement" placeholder="Unit" />
					</div>
					<div className="modal__input">
						<label>group</label>
						<div className="modal__dropdown" onClick={() => setIsDropdown((prev) => !prev)}>
							<input type="text" value={selectedGroup.name} readOnly={true} />
							{isDropdown ? <Close /> : <ChevronDown />}
							{isDropdown && (
								// todo make dropdown unavailable if only one option is available
								<ul className="modal__dropdown-options">
									{[NEW_GROUP_OPTION, ...groups]
										.filter((option) => option.id !== selectedGroup.id)
										.map(({ id, name }) => (
											<li key={id} onClick={() => setSelectedGroup({ id, name })}>
												{name}
												{/* //todo display icon next to the option that creates a new group. this way it handles the edge of someone naming their group "Create new group..." */}
												{id === "new" && "⭐"}
											</li>
										))}
								</ul>
							)}
						</div>
					</div>
					{selectedGroup.id === "new" && (
						<div className="modal__input">
							<label>group name</label>
							<input type="text" name="groupName" placeholder="Group name" />
						</div>
					)}
				</form>
				{/* <div className="modal__preview-counter"></div> */}
				<div className="modal__controls">
					<button onClick={() => setIsCreatingCounter(false)}>cancel</button>
					<button
						type="submit"
						form="new-counter-form"
						onClick={() => {
							const formData = new FormData(formRef.current);
							const counter = {
								id: crypto.randomUUID(),
								name: formData.get("counterName"),
								unit: formData.get("unitOfMeasurement"),
								icon: useIcon(formData.get("counterName")),
								value: 0,
							};
							setIsCreatingCounter(false);
							addCounter({ groupId: selectedGroup.id, groupName: formData.get("groupName"), counter });
						}}
					>
						accept
					</button>
				</div>
			</div>
		</div>
	);
}
