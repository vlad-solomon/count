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
	const [count, setCount] = useState(0);
	const [selectedGroup, setSelectedGroup] = useState(NEW_GROUP_OPTION);
	const formRef = useRef();

	// todo set isDropdown to false when dismissing the Modal
	// todo add clicking on the modal__wrapper to close it | stopPropagation
	// todo only create a counter when a name and a group name (if applicable) is available
	// todo add tabindex's
	//? monospace font for numbers?

	if (!isCreatingCounter) return;

	return (
		<div className="modal__wrapper" onClick={() => setIsCreatingCounter(false)}>
			<div className="modal__title">Create counter</div>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<form className="modal__form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" name="counterName" spellCheck={false} autoComplete="off" autoFocus />
					</div>
					<div className="modal__input">
						<label>unit of measurement (optional)</label>
						<input type="text" name="unitOfMeasurement" spellCheck={false} autoComplete="off" />
					</div>
					<div className="modal__input">
						<label>group</label>
						<div className={classNames("modal__dropdown", !groups.length && "modal__dropdown--empty")} onClick={() => setIsDropdown((prev) => !prev)}>
							<input type="text" value={selectedGroup.name} readOnly={true} spellCheck={false} autoComplete="off" />
							{isDropdown ? <Close /> : <ChevronDown name="chevron" />}
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
							<input type="text" name="groupName" />
						</div>
					)}
					<div className="modal__preview-counter">
						<button onClick={() => setCount((prev) => Math.max(0, --prev))}> - </button>
						<input
							type="text"
							placeholder={0}
							value={count === 0 ? "" : count}
							onChange={(e) => setCount(e.target.value.replace(/\D/, ""))}
							onBlur={() => setCount(count.length ? parseInt(count) : 0)}
						/>
						<button onClick={() => setCount((prev) => ++prev)}> + </button>
					</div>
					<div className="modal__controls">
						<button
							type="submit"
							onClick={() => {
								const formData = new FormData(formRef.current);
								const counter = {
									id: crypto.randomUUID(),
									name: formData.get("counterName").trim(),
									unit: formData.get("unitOfMeasurement").trim(),
									icon: useIcon(formData.get("counterName").trim()),
									value: count,
								};

								// if (!formData.get("counterName").trim() || (selectedGroup.id === "new" && !formData.get("groupName").trim())) return;
								setIsCreatingCounter(false);
								addCounter({ groupId: selectedGroup.id, groupName: formData.get("groupName"), counter });
							}}
						>
							accept
						</button>
						<button type="button" onClick={() => setIsCreatingCounter(false)}>
							cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
