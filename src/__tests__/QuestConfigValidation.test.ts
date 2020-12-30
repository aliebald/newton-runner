import { QuestConfig } from "../components/Quest";
import { controlType, GameConfig } from "../gameLogic/GameConfig";

import exampleQuest1 from "../levels/exampleLevels/exampleQuest1";
import exampleQuest2 from "../levels/exampleLevels/exampleQuest2";
import level1Quest1 from "../levels/level1/level1Quest1";
import level1Quest2 from "../levels/level1/level1Quest2";
import level1Quest3 from "../levels/level1/level1Quest3";
import level2Quest1 from "../levels/level2/level2Quest1";
import level2Quest2 from "../levels/level2/level2Quest2";
import level2Quest3 from "../levels/level2/level2Quest3";

// Add each QuestConfig that should be testet to this array
const questConfigs = [
	exampleQuest1,
	exampleQuest2,
	level1Quest1,
	level1Quest2,
	level1Quest3,
	level2Quest1,
	level2Quest2,
	level2Quest3
];

const questIDs: string[] = [];
for (let i = 0; i < questConfigs.length; i++) {
	questIDs.push(questConfigs[i].id);
}
describe("Validate QuestConfig, including GraphInputConfig and GameConfig", () => {
	// Executes all tests for each QuestConfig in questConfigs
	questConfigs.map((quest) => {
		describe(`Checking QuestConfig for "${quest.title}", id: "${quest.id}"`, () => {
			checkQuestConfigID(quest);
			checkGraphInputConfig(quest);
			checkControls(quest);
			checkGameWorldSize(quest.game);
			checkCharacterSpawnXY(quest.game);
			checkCameraRide(quest.game);
		});
	});
});

function checkQuestConfigID(quest: QuestConfig) {
	test("Check if id is valid", () => {
		expect(quest.id.length).toBeGreaterThan(0);
		expect(questConfigs).not.toContain(quest.id);
	});
}

function checkGraphInputConfig(quest: QuestConfig) {
	test("GraphInputConfig: valid minY & maxY", () => {
		expect(quest.graph.minY).toBeGreaterThanOrEqual(0);
		expect(quest.graph.maxY).toBeGreaterThan(quest.graph.minY);
	});

	test("GraphInputConfig: valid data array", () => {
		expect(quest.graph.data.length).toBeGreaterThan(0);
		quest.graph.data.forEach((elem) => {
			expect(elem.y).toBeGreaterThanOrEqual(quest.graph.minY);
			expect(elem.y).toBeLessThanOrEqual(quest.graph.maxY);
		});
	});

	test("GraphInputConfig: valid xTitle & yTitle", () => {
		expect(quest.graph.xTitle.length).toBeGreaterThan(0);
		expect(quest.graph.yTitle.length).toBeGreaterThan(0);
	});
}

function checkControls(quest: QuestConfig) {
	if (quest.game.controls === controlType.t_x_graph) {
		test("Check maxY <= gameWorld.width/50 for t-x controls", () => {
			expect(quest.graph.maxY).toBeLessThanOrEqual(quest.game.gameWorld.width / 50);
		});
	}
}

function checkGameWorldSize(game: GameConfig) {
	test("GameConfig: Check width and hight of gameWorld", () => {
		// Size of Character is 100px, but the height should still be higher
		expect(game.gameWorld.height).toBeGreaterThanOrEqual(100);
		// Width of Character is 64px, but the width should still be higher
		expect(game.gameWorld.width).toBeGreaterThanOrEqual(64);
	});
}

function checkCharacterSpawnXY(game: GameConfig) {
	if (game.characterSpawnXY) {
		const x = game.characterSpawnXY.x;
		const y = game.characterSpawnXY.y;
		test("GameConfig: Check if characterSpawnXY is inside game world", () => {
			// Note: 32px is half character width
			expect(x).toBeGreaterThanOrEqual(32);
			expect(x).toBeLessThanOrEqual(game.gameWorld.width - 32);
			// Note: 60px is half character height
			expect(y).toBeGreaterThanOrEqual(50);
			expect(y).toBeLessThanOrEqual(game.gameWorld.height - 50);
		});
	}
}

function checkCameraRide(game: GameConfig) {
	if (game.cameraRide && game.cameraRide.length > 0) {
		const ride = game.cameraRide;
		test("GameConfig: Check if cameraRide is inside game world", () => {
			ride.forEach((elem) => {
				expect(elem.wait).toBeGreaterThanOrEqual(0);
				expect(elem.x).toBeGreaterThanOrEqual(0);
				expect(elem.y).toBeGreaterThanOrEqual(0);
				expect(elem.x).toBeLessThanOrEqual(game.gameWorld.width);
				expect(elem.y).toBeLessThanOrEqual(game.gameWorld.height);
			});
		});
	}
}
