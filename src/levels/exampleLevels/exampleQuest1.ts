import { GameConfig, controlType, character } from "../../GameLogic/GameConfig";
import Game from "../../GameLogic/game";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";

/*
 * The settings constant represents contains all settings required for a single quest.
 * In This file all necessary functions for a single quest should be defined.
 * The App component loads this into a Quest component.
 */

const graph: GraphInputConfig = {
	title: "Test",
	minY: 0,
	maxY: 100,
	data: convertDataArray([0, 50, 100, 100, 50, 100, 75, 50])
};

const game: GameConfig = {
	gameWorld: {
		height: 600,
		width: 800 * 2
	},
	onPreload: onPreload,
	preCreate: preCreate,
	afterCreate: afterCreate,
	controls: controlType.t_v_graph_interpolated,
	character: character.hiker
};

const settings: QuestConfig = {
	title: "Beispiel Quest 1",
	graph: graph,
	game: game
};

// TODO documentation
function onPreload(this: Phaser.Scene): void {
	console.log("onPreload called");

	this.load.image("sky", "assets/sky.png");
	this.load.image("ground", "assets/platform.png");

	this.load.image("grassMid", "assets/PlatformerAssetsBase/Tiles/grassMid.png");
	this.load.image("cloud1", "assets/PlatformerAssetsBase/Items/cloud1.png");
	this.load.image("cloud2", "assets/PlatformerAssetsBase/Items/cloud2.png");
	this.load.image("cloud3", "assets/PlatformerAssetsBase/Items/cloud3.png");
	this.load.image("coinGold", "assets/PlatformerAssetsBase/Items/coinGold.png");
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");
}

// TODO documentation
function preCreate(this: Phaser.Scene): void {
	console.log("preCreate called");

	// Add background
	for (let i = 0; i < 2; i++) {
		this.add.image(800 * i, 0, "sky").setOrigin(0);
	}

	// Add clouds
	this.add.image(100, 120, "cloud1");
	this.add.image(430, 100, "cloud2");
	this.add.image(730, 110, "cloud3");
	this.add.image(1030, 90, "cloud3");
	this.add.image(1400, 100, "cloud3");
}

function afterCreate(this: Game): void {
	console.log("afterCreate called");

	// Add platforms / ground
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < 800 * 2; i++) {
		this.platforms.create(35 + tileWidth * i, 570, "grassMid");
	}

	// Add stars as points
	this.points.create(300, 60, "coinGold");
	this.points.create(500, 60, "coinGold");
	this.points.create(880, 60, "coinGold");

	// Add a sample trap
	this.goals.create(1400, 500, "keyYellow");

	// Set random bounce on points
	this.points.children.iterate((c) => {
		const child = (c as unknown) as Phaser.Physics.Arcade.Body;
		child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));
	});
}

export default settings;
