import React, { ReactElement } from "react";
import { ProgressBar } from "react-bootstrap";
import { QuestProgress, QuizProgress } from "../userdata";
import { QuizConfig } from "./Quiz";
import { QuestStats, StatisticQuest } from "./StatisticQuest";
import StatisticQuiz from "./StatisticQuiz";

export default function StatisticLevel(props: {
	quests: { progress: QuestProgress; stats: QuestStats }[];
	quizzes: { progress: QuizProgress | undefined; config: QuizConfig }[];
	level: number;
}): ReactElement {
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
		<div className="mx-auto mt-3 px-3">
			<h3 className="text-center">Level {props.level}</h3>
			<ProgressBar
				animated={completion / maxCompletion < 0.998}
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
