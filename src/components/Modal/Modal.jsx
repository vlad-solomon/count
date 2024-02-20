import "./Modal.scss";
import { useState, useRef } from "react";
import { useCounterStore } from "../../stores/useCounterStore";
import { ChevronDown, X as Close } from "react-feather";

export function Modal() {
	const isCreatingCounter = useCounterStore((state) => state.isCreatingCounter);
	const setIsCreatingCounter = useCounterStore((state) => state.setIsCreatingCounter);
	const groups = useCounterStore((state) => state.groups);
	const addCounter = useCounterStore((state) => state.addCounter);

	const NEW_GROUP_OPTION = { id: "new", name: "Create new group..." };
	const [isDropdown, setIsDropdown] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(NEW_GROUP_OPTION);

	// todo refactor with formData, give labels and input their proper attributes
	const nameRef = useRef();
	const unitRef = useRef();
	const groupNameRef = useRef();

	if (!isCreatingCounter) return;

	return (
		// todo add clicking on the modal__wrapper to close it | stopPropagation
		<div className="modal__wrapper">
			<div className="modal__title">Create counter</div>
			<div className="modal">
				<form className="modal__form" onSubmit={(event) => event.preventDefault()}>
					{/* //todo refactor icon -- use the first letter/letters of the counter? */}
					{/* <div className="modal__icon">
						<div className="modal__icon-picker">⭐</div>
						<button>icon</button>
					</div> */}
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" placeholder="Name" ref={nameRef} />
					</div>
					<div className="modal__input">
						<label>unit of measurement (optional)</label>
						<input type="text" placeholder="Unit" ref={unitRef} />
					</div>
					<div className="modal__input">
						<label>group</label>
						<div className="modal__dropdown" onClick={() => setIsDropdown((prev) => !prev)}>
							<input type="text" value={selectedGroup.name} readOnly={true} />
							{isDropdown ? <Close /> : <ChevronDown />}
							{isDropdown && (
								<ul className="modal__dropdown-options">
									{[NEW_GROUP_OPTION, ...groups]
										.filter((option) => option.id !== selectedGroup.id)
										.map(({ id, name }) => (
											<li key={id} onClick={() => setSelectedGroup({ id, name })}>
												{name}
											</li>
										))}
								</ul>
							)}
						</div>
					</div>
					{selectedGroup.id === "new" && (
						<div className="modal__input">
							<label>group name</label>
							<input type="text" placeholder="Group name" ref={groupNameRef} />
						</div>
					)}
				</form>
				{/* <div className="modal__preview-counter"></div> */}
				<div className="modal__controls">
					<button onClick={() => setIsCreatingCounter(false)}>cancel</button>
					<button
						onClick={() => {
							const counter = {
								id: crypto.randomUUID(),
								name: nameRef.current.value,
								unit: unitRef.current.value,
								icon: "💀",
								value: 0,
							};

							setIsCreatingCounter(false);
							addCounter({ groupId: selectedGroup.id, groupName: groupNameRef?.current?.value, counter });
						}}
					>
						accept
					</button>
				</div>
			</div>
		</div>
	);
}
