import "./Modal.scss";
import { useState, useRef } from "react";
import { useCounterStore } from "../../stores/useCounterStore";
import { ChevronDown, X as Close } from "react-feather";
import useIcon from "../../hooks/useIcon";
import classNames from "classnames";

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
				<form className="modal__form" id="new-counter-form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" name="counterName" placeholder="Name" spellCheck={false} autoComplete="off" />
					</div>
					<div className="modal__input">
						<label>unit of measurement (optional)</label>
						<input type="text" name="unitOfMeasurement" placeholder="Unit" spellCheck={false} autoComplete="off" />
					</div>
					<div className="modal__input">
						<label>group</label>
						<div className={classNames("modal__dropdown", !groups.length && "modal__dropdown--empty")} onClick={() => setIsDropdown((prev) => !prev)}>
							<input type="text" value={selectedGroup.name} readOnly={true} spellCheck={false} autoComplete="off" />
							{isDropdown ? <Close /> : <ChevronDown />}
							{isDropdown && (
								<ul className="modal__dropdown-options">
									{[NEW_GROUP_OPTION, ...groups]
										.filter((option) => option.id !== selectedGroup.id)
										.map(({ id, name }) => (
											<li className={classNames(id === "new" && "create-new")} key={id} onClick={() => setSelectedGroup({ id, name })}>
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
