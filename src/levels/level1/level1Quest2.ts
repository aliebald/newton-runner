import { GameConfig, controlType, character } from "../../GameLogic/GameConfig";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";
import Game from "../../GameLogic/game";

// TODO adjust GraphInputConfig
const graph: GraphInputConfig = {
	title: "Quest 2",
	xTitle: "time in s",
	yTitle: "velocity in m/s",
	minY: 0,
	maxY: 100,
	data: convertDataArray([50, 50, 50, 50, 50, 50, 50, 50, 50])
};

const width = 1200;

// TODO adjust GameConfig
const game: GameConfig = {
	gameWorld: {
		height: 600,
		width: width
	},
	onPreload: onPreload,
	preCreate: preCreate,
	afterCreate: afterCreate,
	controls: controlType.t_v_graph_interpolated,
	character: character.hiker
};

// This is the settings json we export
const settings: QuestConfig = {
	title: "Quest 2",
	graph: graph,
	game: game
};

function onPreload(this: Phaser.Scene): void {
	// TODO: Load all required images
}

function preCreate(this: Phaser.Scene): void {
	// TODO: Add background
}

function afterCreate(this: Game): void {
	// TODO: add platforms / ground, coins, goals, traps etc.
}

export default settings;
