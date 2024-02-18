import "./Modal.scss";
import { useState, useRef } from "react";
import { useCounterStore } from "../../stores/useCounterStore";
import { ChevronDown } from "react-feather";

export function Modal() {
	const setIsCreatingCounter = useCounterStore((state) => state.setIsCreatingCounter);
	const groups = useCounterStore((state) => state.groups);
	const addCounter = useCounterStore((state) => state.addCounter);
	const initialGroupState = { state: true, value: "Create new group..." };
	const [isDropdown, setIsDropdown] = useState(false);
	const [isNewGroup, setIsNewGroup] = useState(initialGroupState);

	const nameRef = useRef();
	const unitRef = useRef();
	const groupNameRef = useRef();

	return (
		// todo add clicking on the modal__wrapper to close it | stopPropagation
		<div className="modal__wrapper">
			<div className="modal__title">Create counter</div>
			<div className="modal">
				<form
					className="modal__form"
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<div className="modal__icon">
						<div className="modal__icon-picker">⭐</div>
						<button>icon</button>
					</div>
					<div className="modal__input">
						<label>counter name*</label>
						<input type="text" placeholder="Name" ref={nameRef} />
					</div>
					<div className="modal__input">
						<label>unit of measurement</label>
						<input type="text" placeholder="Unit" ref={unitRef} />
					</div>
					<div className="modal__input">
						<label>group</label>
						<div className="modal__dropdown" onClick={() => setIsDropdown((prev) => !prev)}>
							<input type="text" value={isNewGroup.value} readOnly={true} />
							<ChevronDown />
							{isDropdown && (
								<div className="modal__dropdown-options">
									<ul>
										<li onClick={() => setIsNewGroup(initialGroupState)}>{initialGroupState.value}</li>
										{groups.map((group) => (
											<li key={group.id} onClick={() => setIsNewGroup({ state: false, value: group.name, groupId: group.id })}>
												{group.name}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
					{isNewGroup.state && (
						<div className="modal__input">
							<label>group name*</label>
							<input type="text" placeholder="Group name" ref={groupNameRef} />
						</div>
					)}
				</form>
				{/* <div className="modal__preview-counter"></div> */}
				<div className="modal__controls">
					<button onClick={() => setIsCreatingCounter(false)}>cancel</button>
					<button
						onClick={() => {
							setIsCreatingCounter(false);
							addCounter(
								isNewGroup.groupId,
								groupNameRef?.current?.value,
								{ id: crypto.randomUUID(), name: nameRef.current.value, unit: unitRef.current.value, icon: "💀", value: 0 },
								crypto.randomUUID()
							);
						}}
					>
						accept
					</button>
				</div>
			</div>
		</div>
	);
}
