import "./Modal.scss";
import { useState } from "react";
import { useCounterStore } from "../../stores/useCounterStore";
import { ChevronDown } from "react-feather";

export function Modal() {
	const setIsCreatingCounter = useCounterStore((state) => state.setIsCreatingCounter);
	const groups = useCounterStore((state) => state.groups);
	const [isDropdown, setIsDropdown] = useState(false);
	const [isNewGroup, setIsNewGroup] = useState(true);
	const [groupValue, setGroupValue] = useState("Create new...");

	return (
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
						<input type="text" />
					</div>
					<div className="modal__input">
						<label>unit of measurement</label>
						<input type="text" />
					</div>
					<div className="modal__input">
						<label>group</label>
						<div className="modal__dropdown" onClick={() => setIsDropdown((prev) => !prev)}>
							<input type="text" value={groupValue} readOnly />
							<ChevronDown />
							{isDropdown && (
								<div className="modal__dropdown-options">
									<ul>
										{groups.map((group) => (
											<li
												key={group.id}
												onClick={() => {
													setIsNewGroup(false);
													setGroupValue(group.name);
												}}
											>
												{group.name}
											</li>
										))}
										<li
											onClick={() => {
												setIsNewGroup(true);
												setGroupValue("Create new...");
											}}
										>
											Create new...
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
					{isNewGroup && (
						<div className="modal__input">
							<label>group name*</label>
							<input type="text" />
						</div>
					)}
				</form>
				{/* <div className="modal__preview-counter"></div> */}
				<div className="modal__controls">
					<button onClick={() => setIsCreatingCounter(false)}>cancel</button>
					<button
						onClick={() => {
							setIsCreatingCounter(false);
						}}
					>
						accept
					</button>
				</div>
			</div>
		</div>
	);
}
