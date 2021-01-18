import React, { ReactElement, useState } from "react";
import { Col, Row } from "react-bootstrap";
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

export default function Leaderboard(): ReactElement {
	const [requestedData, setRequestedData] = useState(false);
	// TODO: Remove sample data
	const [data, setData] = useState<LeaderboardType>({
		position: -1,
		entries: []
	});

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
	} else {
		list.push(
			isLoggedIn() ? (
				<p className="text-center px-3 error">
					Es wurde keine Bestenliste f&uuml;r deine Klasse gefunden.
				</p>
			) : (
				<p className="text-center px-3 error">Melde dich an um die Bestenliste zu sehen</p>
			)
		);
	}

	// Request data from server
	if (!requestedData) {
		setRequestedData(true);
		getLeaderboard().then((leaderboard) => {
			if (leaderboard && leaderboard.entries.length > 0) {
				setData(leaderboard);
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
				sm={{ span: 6, order: 1 }}
				md={{ span: 3, order: 1 }}
				lg="2"
				className="d-flex pl-2 my-auto"
			>
				<div className={`rank ${topCss}`}>{props.position}</div>
				{medal ? <div className="mr-2">{medal}</div> : ""}
				<div className="leaderboardName">{props.entry.name}</div>
			</Col>

			<Col
				xs={{ span: 12, order: 2 }}
				sm={{ span: 12, order: 3 }}
				md={{ span: 5, order: 2 }}
				lg="6"
				className="d-flex pl-2 ml-0 leaderboardAchievements"
			>
				{achievements}
			</Col>

			<Col
				className="d-flex"
				xs={{ span: 12, order: 3 }}
				sm={{ span: 6, order: 2 }}
				md={{ span: 4, order: 3 }}
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
