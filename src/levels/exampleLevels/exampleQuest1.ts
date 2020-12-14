import { GameConfig, controlType, character } from "../../gameLogic/GameConfig";
import Game from "../../gameLogic/game";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";

/*
 * The settings constant represents contains all settings required for a single quest.
 * In This file all necessary functions for a single quest should be defined.
 * The App component loads this into a Quest component.
 */

const graph: GraphInputConfig = {
	xTitle: "time in s",
	yTitle: "velocity in m/s",
	minY: 0,
	maxY: 5,
	data: convertDataArray([2, 2, 0, 0, 0, 0, 0])
};

const width = 1200;

const game: GameConfig = {
	gameWorld: {
		height: 600,
		width: width
	},
	onPreload: onPreload,
	preCreate: preCreate,
	afterCreate: afterCreate,
	controls: controlType.t_v_graph_interpolated,
	character: character.hiker,
	characterSpawnXY: {
		x: 100,
		y: 400
	},
	cameraRide: [
		// First move to (400,0) and wait a second
		{
			x: 400,
			y: 0,
			wait: 1000
		},
		// Then move back to (150,0) and wait a second
		{
			x: 150,
			y: 0,
			wait: 1000
		}
	]
};

const settings: QuestConfig = {
	title: "Beispiel Quest 1",
	id: "exampleLevelQuest1",
	description:
		"Diese Quest ist zur Erklärung unseres Frameworks gedacht und wird nicht Teil des fertigen Spiels sein. Du darfst es heute trotzdem anspielen! Sammle einfach den Schlüssel am Ende des Levels ein.",
	graph: graph,
	game: game
};

/*
 * onPreload gets executed with the preload function of phaser.
 * The preload function is the first function that gets executed, before create and update.
 * For more information see GameConfig (just hover over the variables in a GameConfig variable, e.g. game)
 */
function onPreload(this: Phaser.Scene): void {
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");
	this.load.image("ground", "assets/platform.png");

	this.load.image("grassMid", "assets/PlatformerAssetsBase/Tiles/grassMid.png");
	this.load.image("grassCenter", "assets/PlatformerAssetsBase/Tiles/grassCenter.png");
	this.load.image("signRight", "assets/PlatformerAssetsBase/Tiles/signRight.png");
	this.load.image("fence", "assets/PlatformerAssetsBase/Tiles/fence.png");
	this.load.image("fenceBroken", "assets/PlatformerAssetsBase/Tiles/fenceBroken.png");

	this.load.image("cloud1", "assets/PlatformerAssetsBase/Items/cloud1.png");
	this.load.image("cloud2", "assets/PlatformerAssetsBase/Items/cloud2.png");
	this.load.image("cloud3", "assets/PlatformerAssetsBase/Items/cloud3.png");
	this.load.image("coinGold", "assets/PlatformerAssetsBase/Items/coinGold.png");
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");
}

/*
 * preCreate gets executed at the beginning of the create function of phaser.
 * The create function is the second function that gets executed, after preload and before update.
 * For more information see GameConfig (just hover over the variables in a GameConfig variable, e.g. game)
 */
function preCreate(this: Phaser.Scene): void {
	// Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
	}

	// Add clouds
	this.add.image(100, 120, "cloud1");
	this.add.image(430, 100, "cloud2");
	this.add.image(730, 110, "cloud3");
	this.add.image(1030, 90, "cloud3");

	// Add signRight
	this.add.image(270, 430, "signRight");

	// Add some fences
	this.add.image(0, 430, "fence");
	this.add.image(60, 430, "fence");
	this.add.image(120, 430, "fenceBroken").setScale(-1, 1); // flip this image on the x axis
	this.add.image(180, 430, "fenceBroken");
}

/*
 * afterCreate gets executed at the end of the create function of phaser.
 * The create function is the second function that gets executed, after preload and before update.
 * For more information see GameConfig (just hover over the variables in a GameConfig variable, e.g. game)
 */
function afterCreate(this: Game): void {
	// Add platforms / ground
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		this.platforms.create(35 + tileWidth * i, 500, "grassMid");
		this.platforms.create(35 + tileWidth * i, 570, "grassCenter");
	}

	// Add coinGold as points
	this.points.create(350, 60, "coinGold");
	this.points.create(500, 60, "coinGold");
	this.dynamicGoals.create(880, 60, "keyYellow");

	// Add a sample trap
	this.dynamicGoals.create(1400, 500, "keyYellow");

	// Set random bounce on points
	Game.setRandomBounce.call(this, this.points);

	// Set random bounce on dynamicGoals
	Game.setRandomBounce.call(this, this.dynamicGoals);
}

export default settings;
