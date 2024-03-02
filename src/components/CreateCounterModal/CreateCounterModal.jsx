import "./CreateCounterModal.scss";
import { useRef, useState } from "react";
import { useCounterStore } from "../../stores/useCounterStore";
import { useModalStore } from "../../stores/useModalStore";
import { ChevronDown, X as Close } from "react-feather";
import classNames from "classnames";
import useIcon from "../../hooks/useIcon";

export function CreateCounterModal() {
	const setModal = useModalStore((state) => state.setModal);
	const groups = useCounterStore((state) => state.groups);
	const NEW_GROUP_OPTION = useCounterStore((state) => state.NEW_GROUP_OPTION);
	const addCounter = useCounterStore((state) => state.addCounter);

	const formRef = useRef();

	// todo dismiss dropdown when clicking outside it
	// todo disable spellcheck and autocomplete / suggestions

	const [selectedGroup, setSelectedGroup] = useState(NEW_GROUP_OPTION);
	const [isDropdown, setIsDropdown] = useState(false);

	return (
		<>
			<div className="modal__title">Create counter</div>
			<div className="modal">
				<form className="modal__form" id="form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" name="counterName" />
					</div>
					<div className="modal__input">
						<label>unit of measurement (optional)</label>
						<input type="text" name="unitOfMeasurement" />
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
				</form>
			</div>
			<div className="modal__controls">
				<button
					type="submit"
					form="form"
					onClick={() => {
						const formData = new FormData(formRef.current);

						const groupName = formData.get("groupName")?.trim();
						const counter = {
							id: crypto.randomUUID(),
							name: formData.get("counterName").trim(),
							unit: formData.get("unitOfMeasurement").trim(),
							icon: useIcon(formData.get("counterName").trim()),
							value: 0,
						};

						if (!counter.name || (selectedGroup.id === "new" && !groupName)) return;

						addCounter({ groupId: selectedGroup.id, groupName, counter });
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
