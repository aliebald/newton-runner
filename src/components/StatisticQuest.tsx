import React, { ReactElement, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { QuestProgress } from "../userdata";
import "./../css/style.statistics.css";
import TextProgressBar from "./TextProgressBar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface QuestStats {
	title: string;
	maxPoints: number;
	maxBonuspoints: number;
	maxTime: number;
}

type focusType = "" | "points" | "bonuspoints" | "time";

// Statistics for a single quest. Named StatisticQuest for better overview in components folder
export function StatisticQuest(props: {
	questProgress: QuestProgress;
	questStats: QuestStats;
}): ReactElement {
	const [focus, setFocus] = useState<focusType>("bonuspoints");
	const solved = props.questProgress.attempts.length >= 0;
	const attempts = props.questProgress.attempts.length;
	const [data, dataName] = getData(focus);

	// temporary index, only showing the first successful attempt
	const index = props.questProgress.solvedAt;
	if (index < 0) {
		return <></>;
	}

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
						now={props.questProgress.attempts[index].requiredTime}
						max={props.questStats.maxTime}
						label="Sekunden benötigt"
						onClick={() => setFocus("time")}
						prefix
						noColorCoding
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
					<div className="pb-2">
						{attempts} {attempts === 1 ? "Versuch" : "Versuche"} ben&ouml;tigt
					</div>
				</Col>
				<Col sm="8">
					<AttemptsVisualization data={data} yAxis={dataName} />
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
				dataName = "Zeit in s";
				props.questProgress.attempts.forEach((elem) => {
					data.push(elem.requiredTime);
				});
				break;
			}
		}
		return [data, dataName];
	}
}

function AttemptsVisualization(props: { data: number[]; yAxis: string }) {
	const options = {
		chart: {
			type: "spline",
			height: 300
		},
		title: {
			text: undefined
		},
		xAxis: {
			categories: props.data.map((_, i) => `Versuch ${i + 1}`),
			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: props.yAxis
			}
		},
		tooltip: {
			headerFormat: "{point.key}:<br/>",
			pointFormat:
				'<span style="color:{series.color};">{series.name}: </span>' +
				"<b>{point.y:.1f}</b>",
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [
			{
				name: props.yAxis,
				data: props.data,
				color: "#4c83e0"
			}
		]
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}
