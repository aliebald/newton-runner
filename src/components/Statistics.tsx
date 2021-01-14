import React, { ReactElement, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import {
	find,
	getUserId,
	isLoggedIn,
	loadAndSyncUserdata,
	loadQuestProgress,
	loadQuizProgress,
	loadUserdataLocal,
	QuestProgress,
	QuizProgress
} from "../userdata";
import { StatisticQuest, QuestStats } from "./StatisticQuest";
import StatisticQuiz from "./StatisticQuiz";
import "./../css/style.statistics.css";

import { questStatistics as level1QuestStats1 } from "../levels/level1/level1Quest1";
import { questStatistics as level1QuestStats2 } from "../levels/level1/level1Quest2";
import { questStatistics as level1QuestStats3 } from "../levels/level1/level1Quest3";
import level1Quiz1 from "../levels/level1/level1Quiz1";
import level1Quiz2 from "../levels/level1/level1Quiz2";
import { QuizConfig } from "./Quiz";
import StatisticLevel from "./StatisticLevel";

type levelStatistics = {
	quests: { progress: QuestProgress; stats: QuestStats }[];
	quizzes: {
		progress: QuizProgress | undefined;
		config: QuizConfig;
	}[];
};

export function Statistics(): ReactElement {
	// const [level1, setLevel1] = useState();
	const [loaded, setLoaded] = useState(false);
	const localData = loadUserdataLocal();
	const [levelOne, setLevelOne] = useState<levelStatistics>({
		quests: loadQuestLevelOne(localData.quests),
		quizzes: loadQuizzesLevelOne(localData.quizzes)
	});

	const loggedIn = isLoggedIn();

	if (loggedIn && !loaded) {
		setLoaded(true);
		const userId = getUserId();
		loadAndSyncUserdata(userId).then((userdata) => {
			console.log("loadAndSyncUserdata returned: ", userdata);

			// Add level 1
			setLevelOne({
				quests: loadQuestLevelOne(userdata.quests),
				quizzes: loadQuizzesLevelOne(userdata.quizzes)
			});
		});
	}

	function loadQuestLevelOne(quests: QuestProgress[]) {
		const ret: { progress: QuestProgress; stats: QuestStats }[] = [];
		ret.push(getQuest("level1Quest1", quests, level1QuestStats1));
		ret.push(getQuest("level1Quest2", quests, level1QuestStats2));
		ret.push(getQuest("level1Quest3", quests, level1QuestStats3));
		return ret;
	}

	function loadQuizzesLevelOne(quizzes: QuizProgress[]) {
		const ret: {
			progress: QuizProgress | undefined;
			config: QuizConfig;
		}[] = [];
		ret.push({
			progress: quizzes[find("level1Quiz1", quizzes)],
			config: level1Quiz1
		});
		ret.push({
			progress: quizzes[find("level1Quiz2", quizzes)],
			config: level1Quiz2
		});
		return ret;
	}

	function loadQuizzesLocal() {
		const quizzes: {
			progress: QuizProgress | undefined;
			config: QuizConfig;
		}[] = [];
		const userdata = loadUserdataLocal();
		// TODO
		return quizzes;
	}

	/** Loads the quest with the given id from quests and packs it in an object together with stats */
	function getQuest(
		questId: string,
		quests: QuestProgress[],
		stats: QuestStats
	): {
		progress: QuestProgress;
		stats: QuestStats;
	} {
		let quest;
		const index = find(questId, quests);
		if (index !== -1) {
			quest = quests[index];
		} else {
			quest = {
				id: questId,
				lastSave: Date.now(),
				solvedAt: -1,
				attempts: []
			};
		}

		return {
			progress: quest,
			stats: stats
		};
	}

	return (
		<Container fluid="lg" className="mb-5">
			<StatisticLevel quests={levelOne.quests} quizzes={levelOne.quizzes} level={1} />
		</Container>
	);
}
