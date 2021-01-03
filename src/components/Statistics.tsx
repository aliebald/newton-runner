import React, { ReactElement } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { loadQuestProgress, loadQuizProgress, QuestProgress, QuizProgress } from "../userdata";
import { StatisticQuest, QuestStats } from "./StatisticQuest";
import StatisticQuiz from "./StatisticQuiz";
import "./../css/style.statistics.css";

import { questStatistics as level1Quest1 } from "../levels/level1/level1Quest1";
import { questStatistics as level1Quest2 } from "../levels/level1/level1Quest2";
import { questStatistics as level1Quest3 } from "../levels/level1/level1Quest3";
import level1Quiz1 from "../levels/level1/level1Quiz1";
import level1Quiz2 from "../levels/level1/level1Quiz2";
import { QuizConfig } from "./Quiz";

export function Statistics(): ReactElement {
	const quests: { progress: QuestProgress; stats: QuestStats }[] = [];
	quests.push({
		progress: loadQuestProgress("level1Quest1"),
		stats: level1Quest1
	});
	quests.push({
		progress: loadQuestProgress("level1Quest2"),
		stats: level1Quest2
	});
	quests.push({
		progress: loadQuestProgress("level1Quest3"),
		stats: level1Quest3
	});

	const quizzes: { progress: QuizProgress | undefined; config: QuizConfig }[] = [];
	quizzes.push({
		progress: loadQuizProgress("level1Quiz1"),
		config: level1Quiz1
	});
	quizzes.push({
		progress: loadQuizProgress("level1Quiz2"),
		config: level1Quiz2
	});

	return (
		<Container className="mb-5">
			<StatisticsLevel quests={quests} quizzes={quizzes} level={1} />
		</Container>
	);
}

function StatisticsLevel(props: {
	quests: { progress: QuestProgress; stats: QuestStats }[];
	quizzes: { progress: QuizProgress | undefined; config: QuizConfig }[];
	level: number;
}): JSX.Element {
	let completion = 0;
	const maxCompletion = props.quests.length + props.quizzes.length;
	// Count solved quests
	for (let i = 0; i < props.quests.length; i++) {
		if (props.quests[i].progress.solvedAt >= 0) {
			completion++;
		}
	}
	// Count solved questions. Each Quest is 1 point for completion
	for (let i = 0; i < props.quizzes.length; i++) {
		if (props.quizzes[i].progress) {
			const progress = props.quizzes[i].progress as QuizProgress;
			const questionValue = 1 / progress.questions.length;
			for (let j = 0; j < progress.questions.length; j++) {
				if (progress.questions[j].state !== "unsolved") {
					completion += questionValue;
				}
			}
		}
	}

	const quests = props.quests.map((elem) => (
		<StatisticQuest
			questProgress={elem.progress}
			questStats={elem.stats}
			key={"stat-lvl-" + elem.progress.id}
		/>
	));

	const quizzes = props.quizzes.map((elem) => (
		<StatisticQuiz
			quizProgress={elem.progress}
			quizConfig={elem.config}
			key={"stat-lvl-" + elem.config.id}
		/>
	));

	return (
		<div className="mx-auto mt-3 px-3 boxWrapper">
			<h3 className="text-center">Level {props.level}</h3>
			<ProgressBar
				animated
				striped
				variant="success"
				now={completion}
				max={maxCompletion}
				key={1}
				label={((completion / maxCompletion) * 100).toFixed(2) + "%"}
			/>
			{quests}
			{quizzes}
		</div>
	);
}
