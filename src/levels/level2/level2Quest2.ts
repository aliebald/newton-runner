import { GameConfig, controlType, character } from "../../gameLogic/GameConfig";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";
import Game from "../../gameLogic/game";

// TODO adjust GraphInputConfig
const graph: GraphInputConfig = {
	xTitle: "time in s",
	yTitle: "velocity in m/s",
	minY: 0,
	maxY: 5,
	data: convertDataArray([0, 0, 0, 0, 0, 0, 0, 0, 0])
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
	controls: controlType.t_v_graph,
	character: character.hiker
};

// This is the settings json we export
const settings: QuestConfig = {
	title: "Level 2 Quest 2",
	id: "level2Quest2",
	graph: graph,
	description:
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", // cspell: disable-line
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
