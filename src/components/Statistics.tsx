import React, { ReactElement, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import {
	find,
	getUserId,
	isLoggedIn,
	loadAndSyncUserdata,
	loadUserdataLocal,
	QuestProgress,
	QuizProgress
} from "../userdata";
import { QuestStats } from "./StatisticQuest";
import "./../css/style.statistics.css";

import { questStatistics as level1QuestStats1 } from "../levels/level1/level1Quest1";
import { questStatistics as level1QuestStats2 } from "../levels/level1/level1Quest2";
import { questStatistics as level1QuestStats3 } from "../levels/level1/level1Quest3";
import { questStatistics as level2QuestStats1 } from "../levels/level2/level2Quest1";
import { questStatistics as level2QuestStats2 } from "../levels/level2/level2Quest2";
// TODO import { questStatistics as level2QuestStats3 } from "../levels/level1/level2Quest3";
import level1Quiz1 from "../levels/level1/level1Quiz1";
import level1Quiz2 from "../levels/level1/level1Quiz2";
import { QuizConfig } from "./Quiz";
import StatisticLevel from "./StatisticLevel";
import Leaderboard from "./Leaderboard";

type levelStatistics = {
	quests: { progress: QuestProgress; stats: QuestStats }[];
	quizzes: {
		progress: QuizProgress | undefined;
		config: QuizConfig;
	}[];
};

export function Statistics(): ReactElement {
	const [loaded, setLoaded] = useState(false);
	const localData = loadUserdataLocal();
	const [levelOne, setLevelOne] = useState<levelStatistics>({
		quests: loadQuestLevelOne(localData.quests),
		quizzes: loadQuizzesLevelOne(localData.quizzes)
	});
	const [levelTwo, setLevelTwo] = useState<levelStatistics>({
		quests: loadQuestLevelTwo(localData.quests),
		quizzes: []
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

			setLevelTwo({
				quests: loadQuestLevelTwo(userdata.quests),
				quizzes: []
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

	function loadQuestLevelTwo(quests: QuestProgress[]) {
		const ret: { progress: QuestProgress; stats: QuestStats }[] = [];
		ret.push(getQuest("level2Quest1", quests, level2QuestStats1));
		ret.push(getQuest("level2Quest2", quests, level2QuestStats2));
		// TODO: ret.push(getQuest("level2Quest3", quests, level2QuestStats3));
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
		<Container fluid="lg" className="my-3 boxWrapper">
			<Tab.Container defaultActiveKey="leaderboard">
				<Nav
					justify
					variant="tabs"
					defaultActiveKey="statisticsLevel1"
					className="tabNavWrapper px-sm-2 px-lg-5"
				>
					<Nav.Item className="tabNav">
						<Nav.Link className="tabNavElem" eventKey="statisticsLevel1">
							Level&nbsp;1
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="tabNav">
						<Nav.Link className="tabNavElem" eventKey="statisticsLevel2">
							Level&nbsp;2
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="tabNav">
						<Nav.Link className="tabNavElem" eventKey="leaderboard">
							Bestenliste
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="statisticsLevel1">
						<StatisticLevel
							quests={levelOne.quests}
							quizzes={levelOne.quizzes}
							level={1}
						/>
					</Tab.Pane>
					<Tab.Pane eventKey="statisticsLevel2">
						<StatisticLevel
							quests={levelTwo.quests}
							quizzes={levelTwo.quizzes}
							level={2}
						/>
					</Tab.Pane>
					<Tab.Pane eventKey="leaderboard">
						<Leaderboard />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Container>
	);
}
