import React, { ReactElement, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { QuestProgress } from "../userdata";
import "./../css/style.statistics.css";
import TextProgressBar from "./TextProgressBar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface QuestStats {
	title: string;
	maxPoints: number;
	maxBonuspoints: number;
	/** Fastest possible attempt */
	minTimePossible: number;
	/** slowest possible attempt */
	maxTime: number;
}

type focusType = "" | "points" | "bonuspoints" | "time" | "distance";

// Statistics for a single quest. Named StatisticQuest for better overview in components folder
export function StatisticQuest(props: {
	questProgress: QuestProgress;
	questStats: QuestStats;
}): ReactElement {
	const [focus, setFocus] = useState<focusType>("bonuspoints");
	const solved = props.questProgress.attempts.length >= 0;
	const attempts = props.questProgress.attempts.length;
	const [data, dataName] = getData(focus);
	const metersWalked = props.questProgress.attempts
		.map((a) => a.metersWalked)
		.reduce((x1, x2) => x1 + x2, 0);

	// temporary index, only showing the first successful attempt
	const index = props.questProgress.solvedAt;
	if (index < 0) {
		return <></>;
	}

	// Highcharts options
	const series = [
		{
			name: dataName,
			data: data,
			color: "#4c83e0"
		}
	];

	if (focus === "time") {
		const timeRequired: number[] = [];
		props.questProgress.attempts.forEach((elem) => {
			timeRequired.push(elem.requiredTime);
		});
		series.push({
			name: "Benötigte Zeit",
			data: timeRequired,
			color: "grey"
		});
	}

	const options = {
		chart: {
			type: "spline",
			height: 300
		},
		title: {
			text: undefined
		},
		xAxis: {
			categories: data.map((_, i) => `Versuch ${i + 1}`),
			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: focus === "time" ? "Zeit in s" : dataName
			}
		},
		tooltip: {
			headerFormat: "{point.key}:<br/>",
			pointFormat:
				'<span style="color:{series.color};">{series.name}: </span>' +
				"<b>{point.y:.1f}<br/></b>",
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: series
	};

	return (
		<div className="separator">
			<div className="d-flex pt-4">
				<h4 className="mr-auto">{props.questStats.title}</h4>
				<div className={solved ? "infoBoxOuter correct" : "infoBoxOuter"}>
					<div className="infoBoxText">{solved ? "Gelöst" : "Ungelöst"}</div>
				</div>
			</div>
			<Row className="pt-2">
				<Col sm="4">
					<TextProgressBar
						now={props.questProgress.attempts[index].achievedPoints}
						max={props.questStats.maxPoints}
						label={props.questStats.maxPoints === 1 ? "Punkt" : "Punkten"}
						onClick={() => setFocus("points")}
						prefix
					/>
					<TextProgressBar
						now={
							props.questStats.maxTime -
							props.questProgress.attempts[index].requiredTime
						}
						max={props.questStats.maxTime - props.questStats.minTimePossible}
						label="Sekunden eingespart "
						onClick={() => setFocus("time")}
						prefix
					/>
					<TextProgressBar
						now={props.questProgress.attempts[index].achievedBonusPoints}
						max={props.questStats.maxBonuspoints}
						label={
							props.questStats.maxBonuspoints === 1 ? "Bonuspunkt" : "Bonuspunkten"
						}
						onClick={() => setFocus("bonuspoints")}
						prefix
					/>
					<div
						className="pb-2 statisticsBox statisticsBoxClickable"
						onClick={() => setFocus("distance")}
					>
						{metersWalked} Meter gelaufen
					</div>
					<div className="pb-2 statisticsBox">
						{attempts} {attempts === 1 ? "Versuch" : "Versuche"} ben&ouml;tigt
					</div>
				</Col>
				<Col sm="8">
					<HighchartsReact highcharts={Highcharts} options={options} />
				</Col>
			</Row>
		</div>
	);

	// Loads the correct data for the graph
	function getData(focus: focusType): [number[], string] {
		const data: number[] = [];
		let dataName = "";

		switch (focus) {
			case "points": {
				dataName = "Punkte";
				props.questProgress.attempts.forEach((elem) => {
					data.push(elem.achievedPoints);
				});
				break;
			}
			case "bonuspoints": {
				dataName = "Bonuspunkte";
				props.questProgress.attempts.forEach((elem) => {
					data.push(elem.achievedBonusPoints);
				});
				break;
			}
			case "time": {
				dataName = "Zeit eingespart";
				props.questProgress.attempts.forEach((elem) => {
					data.push(props.questStats.maxTime - elem.requiredTime);
				});
				break;
			}
			case "distance": {
				dataName = "Gelaufene Distanz in m";
				props.questProgress.attempts.forEach((elem) => {
					data.push(elem.metersWalked);
				});
				break;
			}
		}
		return [data, dataName];
	}
}
