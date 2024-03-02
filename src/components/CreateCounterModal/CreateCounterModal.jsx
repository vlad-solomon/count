import "./CreateCounterModal.scss";
import { useRef, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { useCounterStore } from "../../stores/useCounterStore";
import { useModalStore } from "../../stores/useModalStore";
import { Input } from "../Input/Input";
import useIcon from "../../hooks/useIcon";

export function CreateCounterModal() {
	const setModal = useModalStore((state) => state.setModal);
	const groups = useCounterStore((state) => state.groups);
	const NEW_GROUP_OPTION = useCounterStore((state) => state.NEW_GROUP_OPTION);
	const addCounter = useCounterStore((state) => state.addCounter);
	const [isFocused, setIsFocused] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(NEW_GROUP_OPTION);
	const formRef = useRef();
	const dropdownRef = useClickAway(() => setIsFocused(false));

	// todo the dropdown goes offscreen sometimes -- need to set some height, this is css issue, the js is done

	return (
		<>
			<div className="modal__title">Create counter</div>
			<div className="modal">
				<form className="modal__form" id="form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
					<Input label="Counter name" name="counterName" />
					<Input label="Unit of measurement" name="unitOfMeasurement" optional={true} />
					<Input
						label="Group name"
						name="groupName"
						onFocus={() => setIsFocused(true)}
						value={selectedGroup.name}
						onChange={(e) => {
							const matchingGroup = groups.find((group) => group.name === e.target.value);
							setSelectedGroup({ id: matchingGroup ? matchingGroup.id : "new", name: e.target.value });
							setIsFocused(!matchingGroup);
						}}
					>
						{isFocused && (
							<ul className="input__dropdown" ref={dropdownRef}>
								{groups
									.filter((option) => option.name.includes(selectedGroup.name) && option.id !== selectedGroup.id)
									.map((group) => (
										<li
											key={group.id}
											onClick={() => {
												setSelectedGroup({ id: group.id, name: group.name });
												setIsFocused(false);
											}}
										>
											{group.name}
										</li>
									))}
							</ul>
						)}
					</Input>
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
