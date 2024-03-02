import "./Input.scss";
import classNames from "classnames";

export function Input({ className, label, name, value, optional, children, readOnly, onChange, onFocus, onBlur }) {
	const settings = {
		autoComplete: "off",
		autoCorrect: "on",
		spellCheck: false,
	};

	return (
		<div className={classNames("input", className)}>
			{label && (
				<label>
					{label} {optional && <span>optional</span>}
				</label>
			)}
			<input type="text" value={value} name={name} onChange={onChange} readOnly={readOnly} onFocus={onFocus} onBlur={onBlur} {...settings} />
			{children}
		</div>
	);
}
