import React, { ReactElement } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { loadQuestProgress, QuestProgress } from "../userdata";
import "./../css/style.statistics.css";

import { questStatistics as level1Quest1 } from "../levels/level1/level1Quest1";
import { questStatistics as level1Quest2 } from "../levels/level1/level1Quest2";
import { questStatistics as level1Quest3 } from "../levels/level1/level1Quest3";
import QuestStatistic from "./StatisticQuest";

export interface QuestStatistics {
	title: string;
	maxPoints: number;
	maxBonuspoints: number;
	maxTime: number;
}

export function Statistics(): ReactElement {
	const stats: { progress: QuestProgress; stats: QuestStatistics }[] = [];
	stats.push({
		progress: getProgress("level1Quest1"),
		stats: level1Quest1
	});
	stats.push({
		progress: getProgress("level1Quest2"),
		stats: level1Quest2
	});
	stats.push({
		progress: getProgress("level1Quest3"),
		stats: level1Quest3
	});

	return (
		<Container className="mb-5">
			<StatisticsLevel quests={stats} level={1} />
		</Container>
	);

	function getProgress(questId: string) {
		const progress = loadQuestProgress(questId);
		if (!progress) {
			//TODO do sth useful
			return {
				id: questId,
				solved: false,
				attempts: 0,
				requiredTime: 0,
				achievedPoints: 0,
				achievedBonusPoints: 0
			};
		}
		return progress;
	}
}

function StatisticsLevel(props: {
	quests: { progress: QuestProgress; stats: QuestStatistics }[];
	level: number;
}): JSX.Element {
	let completion = 0;
	for (let i = 0; i < props.quests.length; i++) {
		if (props.quests[i].progress.solved) {
			completion++;
		}
	}

	const quests = props.quests.map((elem) => (
		<QuestStatistic
			questProgress={elem.progress}
			questStats={elem.stats}
			key={"stat-lvl-" + elem.progress.id}
		/>
	));

	return (
		<div className="mx-auto mt-3 px-3 boxWrapper">
			<h3 className="text-center">Level {props.level}</h3>
			<div className="d-flex align-items-center">
				<div>Vorschritt:&nbsp;</div>
				<div className="w-100">
					<ProgressBar
						animated
						striped
						variant="success"
						now={completion}
						max={props.quests.length}
						key={1}
						label={((completion / props.quests.length) * 100).toFixed(2) + "%"}
					/>
				</div>
			</div>
			{quests}
		</div>
	);
}
