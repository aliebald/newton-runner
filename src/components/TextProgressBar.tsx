import React, { ReactElement } from "react";
import { ProgressBar } from "react-bootstrap";
import "./../css/style.statistics.css";

export default function TextProgressBar(props: {
	now: number;
	max: number;
	label: string;
	/**
	 * If True, `now von max` will show before `label`
	 */
	prefix?: boolean;
	/**
	 * Fixes color of progress bar to green
	 */
	noColorCoding?: boolean;
	onClick?: () => void;
}): ReactElement {
	const text = props.prefix ? `${props.now} von ${props.max} ${props.label}` : <>props.label</>;
	const progress = props.now / props.max;
	let variant = "danger";
	if (progress >= 0.75 || props.noColorCoding) {
		variant = "success";
	} else if (progress >= 0.25) {
		variant = "warning";
	}

	const css = `textProgressBar${props.onClick !== undefined ? " textProgressBarClickable" : ""}`;

	return (
		<div onClick={props.onClick} className={css}>
			<div>{text}</div>
			<ProgressBar
				variant={variant}
				now={props.now}
				max={props.max}
				className="smallProgress"
			/>
		</div>
	);
}
