import React, { ReactElement, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Achievement from "./Achievement";
import { getLeaderboard, isLoggedIn } from "../userdata";
import "../css/style.leaderboard.css";

export type LeaderboardType = {
	position: number;
	entries: LeaderboardEntry[];
};

type LeaderboardEntry = {
	name: string;
	points: number;
	bonusPoints: number;
	achievements: string[];
};

const sampleData = {
	position: -1,
	entries: [
		{
			name: "Max Mustermann",
			points: 72,
			bonusPoints: 4,
			achievements: [
				"PointCollectorLevel1",
				"PointCollectorLevel2",
				"BonusCollectorLevel1",
				"BonusCollectorLevel2",
				"QuizmasterLevel1",
				"QuizmasterLevel2"
			]
		},
		{
			name: "Yvonne Fisher",
			points: 64,
			bonusPoints: 3,
			achievements: [
				"PointCollectorLevel1",
				"PointCollectorLevel2",
				"BonusCollectorLevel1",
				"QuizmasterLevel1"
			]
		},
		{
			name: "Erika Mustermann",
			points: 72,
			bonusPoints: 3,
			achievements: ["PointCollectorLevel1", "BonusCollectorLevel1", "QuizmasterLevel1"]
		},
		{
			name: "Leonie Mueller",
			points: 55,
			bonusPoints: 3,
			achievements: ["PointCollectorLevel1", "BonusCollectorLevel1"]
		},
		{
			name: "Jan Janssen",
			points: 35,
			bonusPoints: 1,
			achievements: ["BonusCollectorLevel2", "QuizmasterLevel1", "QuizmasterLevel2"]
		},
		{
			name: "Swen Baumgaertner",
			points: 19,
			bonusPoints: 1,
			achievements: ["QuizmasterLevel1", "BonusCollectorLevel2"]
		},
		{
			name: "Mathias Bieber",
			points: 15,
			bonusPoints: 3,
			achievements: ["BonusCollectorLevel1", "QuizmasterLevel1"]
		},
		{
			name: "Lisa Amsel",
			points: 12,
			bonusPoints: 3,
			achievements: ["BonusCollectorLevel1"]
		},
		{
			name: "Thorsten Kunze",
			points: 10,
			bonusPoints: 1,
			achievements: ["QuizmasterLevel1"]
		},
		{
			name: "Daniela Meier",
			points: 4,
			bonusPoints: 0,
			achievements: []
		}
	]
};

export default function Leaderboard(): ReactElement {
	const [requestedData, setRequestedData] = useState(false);
	const [isSampleData, setIsSampleData] = useState(true);
	const [data, setData] = useState<LeaderboardType>(
		isLoggedIn() ? { position: -1, entries: [] } : sampleData
	);

	const list = [];
	if (data.entries.length > 0) {
		let position = 1;
		let lastPoints = data.entries[0].points + data.entries[0].bonusPoints;
		for (let i = 0; i < data.entries.length; i++) {
			// Increase user position if he has more points than the last user
			const pointsSum = data.entries[i].points + data.entries[i].bonusPoints;
			if (lastPoints > pointsSum) {
				position++;
				lastPoints = pointsSum;
			}
			list.push(
				<Entry entry={data.entries[i]} position={position} key={"leaderboardEntry-" + i} />
			);
		}
		if (isSampleData) {
			list.push(
				<p key="leaderboardEntry-error" className="text-center px-3 mt-2 mb-0">
					Beispieldaten. Melde dich an um die Bestenliste deiner Klasse zu sehen.
				</p>
			);
		}
	} else {
		list.push(
			isLoggedIn() && isSampleData ? (
				<div key="leaderboardLoading" className="pt-3 d-flex justify-content-center">
					<Spinner animation="border" className="colorSecondary" />
				</div>
			) : (
				<p key="leaderboardEntry-error" className="text-center px-3 error">
					Es wurde keine Bestenliste f&uuml;r deine Klasse gefunden.
				</p>
			)
		);
	}

	// Request data from server
	if (!requestedData && isLoggedIn()) {
		setRequestedData(true);
		getLeaderboard().then((leaderboard) => {
			if (leaderboard && leaderboard.entries.length > 0) {
				setData(leaderboard);
				setIsSampleData(false);
			}
		});
	}

	return <div className="py-2">{list}</div>;
}

function Entry(props: { position: number; entry: LeaderboardEntry }) {
	let topCss = "";
	let medal;
	switch (props.position) {
		case 1: {
			topCss += "first";
			medal = <Achievement type="first" />;
			break;
		}
		case 2: {
			topCss += "second";
			medal = <Achievement type="second" />;
			break;
		}
		case 3: {
			topCss += "third";
			medal = <Achievement type="third" />;
			break;
		}
	}

	const achievements = props.entry.achievements.map((achievement, index) => (
		<Achievement key={"achievement-" + props.position + "-" + index} type={achievement} />
	));

	return (
		<Row className={`leaderboardEntry d-flex mx-2 ${topCss}`}>
			<Col
				xs={{ span: 12, order: 1 }}
				sm={{ span: 7, order: 1 }}
				md={{ span: 6, order: 1 }}
				lg={{ span: 4, order: 1 }}
				className="d-flex pl-2 my-auto"
			>
				<div className={`my-auto rank ${topCss}`}>{props.position}</div>
				{medal ? <div className="mr-2">{medal}</div> : ""}
				<div className="leaderboardName">
					{props.entry.name ? props.entry.name : "Anonym"}
				</div>
			</Col>

			<Col
				xs={{ span: 12, order: 2 }}
				sm={{ span: 12, order: 3 }}
				md={{ span: 6, order: 3 }}
				lg={{ span: 4, order: 2 }}
				className="d-flex pl-2 ml-0 leaderboardAchievements"
			>
				{achievements}
			</Col>

			<Col
				className="d-flex"
				xs={{ span: 12, order: 3 }}
				sm={{ span: 5, order: 2 }}
				md={{ span: 6, order: 2 }}
				lg={{ span: 4, order: 3 }}
			>
				<div className="text-center w-33">
					<div>{props.entry.points + props.entry.bonusPoints}</div>
					<div className="valueDescription">Gesamt</div>
				</div>
				<div className="text-center w-33">
					<div>{props.entry.points}</div>
					<div className="valueDescription">Punkte</div>
				</div>
				<div className="text-center w-33">
					<div>{props.entry.bonusPoints}</div>
					<div className="valueDescription">Bonuspunkte</div>
				</div>
			</Col>
		</Row>
	);
}
