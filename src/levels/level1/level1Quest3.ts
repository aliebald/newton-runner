import { GameConfig, controlType, character } from "../../gameLogic/GameConfig";
import { QuestStats } from "../../components/StatisticQuest";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";
import Game from "../../gameLogic/game";

const width = 1200;
const pointsPerAttempt = [10, 10, 9, 8, 6, 4, 2];
const defaultMovement = [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const questStatistics: QuestStats = {
	title: "Level 1 Quest 2",
	maxPoints: pointsPerAttempt[0],
	maxBonuspoints: 2,
	maxTime: defaultMovement.length
};

const graph: GraphInputConfig = {
	xTitle: "Zeit in s",
	yTitle: "Ort in m",
	minY: 0,
	maxYDistance: 5,
	fixedStart: true,
	maxY: width / 50,
	data: convertDataArray(defaultMovement)
};

const game: GameConfig = {
	gameWorld: {
		height: 600,
		width: width
	},
	onPreload: onPreload,
	preCreate: preCreate,
	afterCreate: afterCreate,
	onUpdate: onUpdate,
	controls: controlType.t_x_graph,
	character: character.hiker,
	pointsPerAttempt: pointsPerAttempt
};

// This is the settings json we export
export const settings: QuestConfig = {
	title: "Quest 3",
	id: "level1Quest3",
	description:
		"Mit deinen schweren Stiefeln springst du eher ungern. Wozu gibt es denn automatische Aufzüge?",
	graph: graph,
	game: game
};

function onPreload(this: Phaser.Scene): void {
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("grassMid", "assets/PlatformerAssetsBase/Tiles/grassMid.png");
	this.load.image("grassCenter", "assets/PlatformerAssetsBase/Tiles/grassCenter.png");

	this.load.image("grassHalfMid", "assets/PlatformerAssetsBase/Tiles/grassHalfMid.png");
	this.load.image("grassHalfLeft", "assets/PlatformerAssetsBase/Tiles/grassHalfLeft.png");
	this.load.image("grassHalfRight", "assets/PlatformerAssetsBase/Tiles/grassHalfRight.png");

	this.load.image("bridge_down", "assets/PlatformerAssetsBase/Tiles/bridge_double_down_cut.png");
	this.load.image("bridge_up", "assets/PlatformerAssetsBase/Tiles/bridge_double_up_cut.png");

	this.load.image("house_front", "assets/BackgroundElements/house_beige_front.png");
	this.load.image("mushroom", "assets/PlatformerAssetsBase/Items/mushroomRed.png");
	this.load.image("grassBush", "assets/PlatformerAssetsBase/Items/grass4.png");
	this.load.image("signRight", "assets/PlatformerAssetsBase/Tiles/signRight.png");

	this.load.image("sun", "assets/PlatformerAssetsBase/Items/sun.png");
	this.load.image("cloud1", "assets/PlatformerAssetsBase/Items/cloud1.png");
	this.load.image("cloud2", "assets/PlatformerAssetsBase/Items/cloud2.png");
	this.load.image("cloud3", "assets/PlatformerAssetsBase/Items/cloud3.png");

	this.load.image("switchLeft", "assets/PlatformerAssetsBase/Items/switchLeft.png");
	this.load.image("switchRight", "assets/PlatformerAssetsBase/Items/switchRight.png");

	this.load.image("tree_beige", "assets/BackgroundElements/tree01.png");
	this.load.image("tree_green_1", "assets/BackgroundElements/tree02.png");
	this.load.image("tree_green_2", "assets/BackgroundElements/tree21.png");
	this.load.image("coinGold", "assets/PlatformerAssetsBase/Items/coinGold.png");
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");
	this.load.image("spikes", "assets/PlatformerAssetsBase/Items/spikes.png");
}

function preCreate(this: Phaser.Scene): void {
	// Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
		this.add.image(256 * i, 512, "bg").setOrigin(0);
	}

	// Add clouds
	this.add.image(80, 120, "cloud1");
	this.add.image(430, 40, "cloud2");
	this.add.image(630, 140, "cloud2");
	this.add.image(1030, 90, "cloud3");

	// Add house
	this.add.image(40, 360, "tree_green_1");
	this.add.image(60, 360, "tree_beige");
	this.add.image(100, 360, "tree_green_2");
	this.add.image(80, 432, "mushroom").setScale(0.5);

	// Add signRight
	this.add.image(140, 430, "signRight");

	this.add.image(850, 450, "grassBush").setScale(-1, 1);
}

function afterCreate(this: Game): void {
	// Add platforms / ground
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		//gap at 385
		if (i != 5 && i != 6 && i != 10 && i != 11) {
			this.platforms.create(35 + tileWidth * i, 500, "grassMid");
			this.platforms.create(35 + tileWidth * i, 570, "grassCenter");
		}
	}

	const dynamicPlatform = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	this.physics.add.collider(this.player, dynamicPlatform);

	this.terrainTraps.create(520, 235, "spikes").setScale(0.25).refreshBody();
	this.terrainTraps.create(680, 235, "spikes").setScale(0.25).refreshBody();
	this.terrainTraps.create(870, 285, "spikes").setScale(0.25).refreshBody();

	this.platforms.create(530, 250, "grassHalfLeft");
	this.platforms.create(600, 250, "grassHalfMid");
	this.platforms.create(670, 250, "grassHalfRight");

	this.platforms.create(880, 300, "grassHalfLeft");
	this.platforms.create(950, 300, "grassHalfMid");
	this.platforms.create(1020, 300, "grassHalfRight");

	const bridge1 = dynamicPlatform.create(420, 483, "bridge_down");
	const bridge2 = dynamicPlatform.create(773, 233, "bridge_down");

	this.variables.set("bridge1", bridge1);
	this.variables.set("bridge2", bridge2);

	this.points.create(560, 60, "coinGold");
	this.points.create(635, 400, "coinGold");

	this.dynamicGoals.create(950, 300, "keyYellow");

	// Left hole
	this.staticTraps.create(386, 570, "spikes").setScale(0.5).refreshBody();
	this.staticTraps.create(453, 570, "spikes").setScale(0.5).refreshBody();
	this.staticTraps.create(287, 540, "spikes").setScale(0);
	this.staticTraps.create(552, 540, "spikes").setScale(0);
	// right hole
	this.staticTraps.create(736, 570, "spikes").setScale(0.5).refreshBody();
	this.staticTraps.create(803, 570, "spikes").setScale(0.5).refreshBody();
	this.staticTraps.create(638, 540, "spikes").setScale(0);
	this.staticTraps.create(902, 540, "spikes").setScale(0);

	this.staticTraps.create(560, 433, "spikes").setScale(0.5).refreshBody();
	this.staticTraps.create(920, 233, "spikes").setScale(0.5).refreshBody();

	// Set random bounce on points
	Game.setRandomBounce.call(this, this.points);

	// Set random bounce on dynamicGoals
	Game.setRandomBounce.call(this, this.dynamicGoals);
}

function onUpdate(this: Game): void {
	if (this.gameRunning) {
		if (this.player.x >= 380 && !this.variables.get("bridge1_start")) {
			this.variables.set("bridge1_start", new Date().getTime());
			this.variables.set("bridge1_end", new Date().getTime() + 2600);
			this.variables.set("bridge1StartY", 483);
			this.variables.set("bridge1EndY", 225);
		}
		if (this.player.x >= 740 && !this.variables.get("bridge2_start")) {
			this.variables.set("bridge2_start", new Date().getTime());
			this.variables.set("bridge2_end", new Date().getTime() + 2450);
			this.variables.set("bridge2StartY", 233);
			this.variables.set("bridge2EndY", 490);
		}

		if (this.variables.get("bridge1_start")) {
			const bridge1 = this.variables.get("bridge1");
			const startTime1 = this.variables.get("bridge1_start");
			const endTime1 = this.variables.get("bridge1_end");
			goUp(bridge1, startTime1, endTime1);
		}
		if (this.variables.get("bridge2_start")) {
			const bridge2 = this.variables.get("bridge2");
			const startTime2 = this.variables.get("bridge2_start");
			const endTime2 = this.variables.get("bridge2_end");
			goDown(bridge2, startTime2, endTime2);
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function goDown(object: any, timeStart: number, timeEnd: number) {
	const time = new Date().getTime();
	if (time < timeEnd && time >= timeStart) {
		object.setVelocityY(100);
	} else {
		object.setVelocityY(0);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function goUp(object: any, timeStart: number, timeEnd: number) {
	const time = new Date().getTime();
	if (time < timeEnd && time >= timeStart) {
		object.setVelocityY(-100);
	} else {
		object.setVelocityY(0);
	}
}
