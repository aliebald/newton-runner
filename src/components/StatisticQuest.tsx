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
	const [data, dataName] = getData(focus);
	const solved = props.questProgress.solvedAt >= 0;
	const attempts = props.questProgress.attempts.length;
	const metersWalked = props.questProgress.attempts
		.map((a) => a.metersWalked)
		.reduce((x1, x2) => x1 + x2, 0);

	// index of the attempt we show on the left side
	const index = solved ? props.questProgress.solvedAt : attempts - 1;
	let achievedPoints, timeSaved, bonuspoints;
	if (!solved && attempts === 0) {
		achievedPoints = 0;
		timeSaved = 0;
		bonuspoints = 0;
	} else {
		achievedPoints = props.questProgress.attempts[index].achievedPoints;
		timeSaved = props.questStats.maxTime - props.questProgress.attempts[index].requiredTime;
		bonuspoints = props.questProgress.attempts[index].achievedBonusPoints;
	}

	// Highcharts options
	const series = [
		{
			name: dataName,
			data: data.map((y, i) =>
				i === props.questProgress.solvedAt
					? {
							y: y,
							name: `<span style="color:green">Erster erfolgreicher Versuch (Gewertet)</span><br/>Versuch ${
								i + 1
							}`,
							color: "green"
					  }
					: y
			),
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
			data: timeRequired.map((y, i) =>
				i === props.questProgress.solvedAt
					? {
							y: y,
							name: `<span style="color:green">Erster erfolgreicher Versuch (Gewertet)</span><br/>Versuch ${
								i + 1
							}`,
							color: "green"
					  }
					: y
			),
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
				<Col sm="12" md="4">
					<TextProgressBar
						now={achievedPoints}
						max={props.questStats.maxPoints}
						label={props.questStats.maxPoints === 1 ? "Punkt" : "Punkten"}
						onClick={() => setFocus("points")}
						prefix
					/>
					<TextProgressBar
						now={timeSaved}
						max={props.questStats.maxTime - props.questStats.minTimePossible}
						label="Sekunden eingespart "
						onClick={() => setFocus("time")}
						prefix
					/>
					<TextProgressBar
						now={bonuspoints}
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
						{metersWalked.toFixed(2)} Meter gelaufen
					</div>
					<div className="pb-2 statisticsBox">
						{attempts} {attempts === 1 ? "Versuch" : "Versuche"} ben&ouml;tigt
					</div>
				</Col>
				<Col sm="12" md="8">
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
