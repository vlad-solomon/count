import "./Modal.scss";

export function Modal() {
	return (
		<div className="modal__wrapper">
			<div className="modal__title">Create counter</div>
			<div className="modal">
				<div className="modal__form">
					<div className="modal__icon">
						<div className="modal__icon-picker">⭐</div>
						<button>icon</button>
					</div>
					<div className="modal__input">
						<label>counter name</label>
						<input type="text" placeholder="..." />
					</div>
					<div className="modal__input">
						<label>unit of measurement</label>
						<input type="text" placeholder="..." />
					</div>
					<div className="modal__input">
						<label>group</label>
						<input type="text" placeholder="..." />
					</div>
					<div className="modal__input">
						<label>group name</label>
						<input type="text" placeholder="..." />
					</div>
				</div>
				<div className="modal__preview-counter"></div>
				<div className="modal__controls">
					<button>cancel</button>
					<button>accept</button>
				</div>
			</div>
		</div>
	);
}
