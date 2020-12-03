import { GameConfig, controlType, character } from "../../GameLogic/GameConfig";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";
import Game from "../../GameLogic/game";

// TODO adjust GraphInputConfig
const graph: GraphInputConfig = {
	xTitle: "time in s",
	yTitle: "velocity in m/s",
	minY: 0,
	maxY: 100,
	data: convertDataArray([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50])
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
	character: character.hiker,
	characterSpawnXY: {
		x: 100,
		y: 400
	}
};

// This is the settings json we export
const settings: QuestConfig = {
	title: "Quest 2",
	description:
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", // cspell: disable-line
	graph: graph,
	game: game
};

function onPreload(this: Phaser.Scene): void {
	console.log("onPreload called");

	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("grassMid", "assets/PlatformerAssetsBase/Tiles/grassMid.png");
	this.load.image("grassCenter", "assets/PlatformerAssetsBase/Tiles/grassCenter.png");

	this.load.image("tower", "assets/PlatformerAssetsBase/Items/tower_beige.png");
	this.load.image("mushroom", "assets/PlatformerAssetsBase/Items/mushroomRed.png");
	this.load.image("grassBush", "assets/PlatformerAssetsBase/Items/grass4.png");
	this.load.image("signRight", "assets/PlatformerAssetsBase/Tiles/signRight.png");

	this.load.image("sun", "assets/PlatformerAssetsBase/Items/sun.png");
	this.load.image("cloud1", "assets/PlatformerAssetsBase/Items/cloud1.png");
	this.load.image("cloud2", "assets/PlatformerAssetsBase/Items/cloud2.png");
	this.load.image("cloud3", "assets/PlatformerAssetsBase/Items/cloud3.png");
	this.load.image("coinGold", "assets/PlatformerAssetsBase/Items/coinGold.png");
	this.load.image("flag", "assets/PlatformerAssetsBase/Items/flagBlue2.png");
	this.load.image("spikes", "assets/PlatformerAssetsBase/Items/spikes.png");
}

function preCreate(this: Phaser.Scene): void {
	console.log("preCreate called");

	// Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
	}

	// Add clouds
	this.add.image(80, 120, "cloud1");
	this.add.image(330, 100, "cloud2");
	this.add.image(730, 110, "cloud2");
	this.add.image(1030, 90, "cloud3");

	// Add signRight
	this.add.image(140, 430, "signRight");

	// Add tower
	this.add.image(40, 360, "tower");

	this.add.image(160, 450, "grassBush");
	this.add.image(500, 450, "grassBush");
	this.add.image(700, 450, "grassBush");

	this.add.image(300, 400, "mushroom");
	this.add.image(600, 400, "mushroom");
}

function afterCreate(this: Game): void {
	console.log("afterCreate called");

	// Add platforms / ground
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		this.platforms.create(35 + tileWidth * i, 500, "grassMid");
		this.platforms.create(35 + tileWidth * i, 570, "grassCenter");
	}

	// Add coinGold as points
	this.points.create(350, 60, "coinGold");
	this.points.create(500, 60, "coinGold");
	this.staticGoals.create(950, 400, "flag");

	// Add a sample trap
	this.staticTraps.create(1080, 433, "spikes").setScale(0.5);

	// Set random bounce on points
	Game.setRandomBounce.call(this, this.points);

	// Set random bounce on dynamicGoals
	Game.setRandomBounce.call(this, this.dynamicGoals);
}

export default settings;
