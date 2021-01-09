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
	data: convertDataArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
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
	onUpdate: onUpdate,
	controls: controlType.t_v_graph,
	character: character.hiker
};

// This is the settings json we export
const settings: QuestConfig = {
	title: "Level 2 Quest 3",
	id: "level2Quest3",
	graph: graph,
	description:
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", // cspell: disable-line
	game: game
};

function onPreload(this: Phaser.Scene): void {
	// TODO: Load all required images
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("castleMid", "assets/PlatformerAssetsBase/Tiles/castleMid.png");
	this.load.image("castleCenter", "assets/PlatformerAssetsBase/Tiles/castleCenter.png");

	//beige house
	this.load.image("houseBL", "assets/PlatformerAssetsBuildings/Items/houseBeigeBottomLeft.png");
	this.load.image("houseBM", "assets/PlatformerAssetsBuildings/Items/houseBeigeBottomMid.png");
	this.load.image("houseBR", "assets/PlatformerAssetsBuildings/Items/houseBeigeBottomRight.png");
	this.load.image("houseML", "assets/PlatformerAssetsBuildings/Items/houseBeigeMidLeft.png");
	this.load.image("houseM", "assets/PlatformerAssetsBuildings/Items/houseBeige.png");
	this.load.image("houseMR", "assets/PlatformerAssetsBuildings/Items/houseBeigeMidRight.png");
	this.load.image("houseTL", "assets/PlatformerAssetsBuildings/Items/houseBeigeTopLeft.png");
	this.load.image("houseTM", "assets/PlatformerAssetsBuildings/Items/houseBeigeTopMid.png");
	this.load.image("houseTR", "assets/PlatformerAssetsBuildings/Items/houseBeigeTopRight.png");

	//dark house
	this.load.image(
		"darkHouseBL",
		"assets/PlatformerAssetsBuildings/Items/houseDarkBottomLeft.png"
	);
	this.load.image("darkHouseBM", "assets/PlatformerAssetsBuildings/Items/houseDarkBottomMid.png");
	this.load.image(
		"darkHouseBR",
		"assets/PlatformerAssetsBuildings/Items/houseDarkBottomRight.png"
	);
	this.load.image("darkHouseML", "assets/PlatformerAssetsBuildings/Items/houseDarkMidLeft.png");
	this.load.image("darkHouseM", "assets/PlatformerAssetsBuildings/Items/houseDark.png");
	this.load.image("darkHouseMR", "assets/PlatformerAssetsBuildings/Items/houseDarkMidRight.png");
	this.load.image("darkHouseTL", "assets/PlatformerAssetsBuildings/Items/houseDarkTopLeft.png");
	this.load.image("darkHouseTM", "assets/PlatformerAssetsBuildings/Items/houseDarkTopMid.png");
	this.load.image("darkHouseTR", "assets/PlatformerAssetsBuildings/Items/houseDarkTopRight.png");

	//gray house
	this.load.image(
		"grayHouseBL",
		"assets/PlatformerAssetsBuildings/Items/houseGrayBottomLeft.png"
	);
	this.load.image("grayHouseBM", "assets/PlatformerAssetsBuildings/Items/houseGrayBottomMid.png");
	this.load.image(
		"grayHouseBR",
		"assets/PlatformerAssetsBuildings/Items/houseGrayBottomRight.png"
	);
	this.load.image("grayHouseML", "assets/PlatformerAssetsBuildings/Items/houseGrayMidLeft.png");
	this.load.image("grayHouseM", "assets/PlatformerAssetsBuildings/Items/houseGray.png");
	this.load.image("grayHouseMR", "assets/PlatformerAssetsBuildings/Items/houseGrayMidRight.png");
	this.load.image("grayHouseTL", "assets/PlatformerAssetsBuildings/Items/houseGrayTopLeft.png");
	this.load.image("grayHouseTM", "assets/PlatformerAssetsBuildings/Items/houseGrayTopMid.png");
	this.load.image("grayHouseTR", "assets/PlatformerAssetsBuildings/Items/houseGrayTopRight.png");

	this.load.image("spikes", "assets/PlatformerAssetsBase/Items/spikes.png");
	this.load.image("bomb", "assets/PlatformerAssetsBase/Items/bomb.png");
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");
}

function preCreate(this: Phaser.Scene): void {
	// TODO: Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
		this.add.image(256 * i, 512, "bg").setOrigin(0);
	}
}

function afterCreate(this: Game): void {
	// TODO: add platforms / ground, coins, goals, traps etc.

	this.platforms.create(385, 500, "castleCenter");
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		this.platforms.create(35 + tileWidth * i, 570, "castleCenter");
	}
	for (let i = 0; i * tileWidth < width; i++) {
		if (i != 5 && i != 10 && i != 11) {
			this.platforms.create(35 + tileWidth * i, 500, "castleMid");
		}
	}
	this.staticTraps.create(638, 540, "spikes").setScale(0);
	this.staticTraps.create(902, 540, "spikes").setScale(0);
	this.staticTraps.create(1150, 433, "spikes").setScale(0.5, 0.5).refreshBody();

	const dynamicTraps = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	const bomb = this.dynamicTraps.create(450, 433, "bomb").setScale(0.5).refreshBody();
	this.physics.add.collider(this.player, dynamicTraps);
	this.variables.set("bomb", bomb);

	const dynamicPlatform = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	this.physics.add.collider(this.player, dynamicPlatform);
	const ground1 = dynamicPlatform.create(385, 500, "castleMid");
	const ground2 = dynamicPlatform.create(735, 500, "castleMid");
	const ground3 = dynamicPlatform.create(805, 500, "castleMid");

	this.variables.set("ground1", ground1);
	this.variables.set("ground2", ground2);
	this.variables.set("ground3", ground3);

	this.dynamicGoals.create(960, 300, "keyYellow");
}

function onUpdate(this: Game): void {
	if (this.gameRunning) {
		if (this.player.x >= 350 && !this.variables.get("ground1_start")) {
			this.variables.set("ground1_start", new Date().getTime());
			this.variables.set("ground1_end", new Date().getTime() + 720);
			this.variables.set("ground1StartY", 500);
			this.variables.set("ground1EndY", 430);
		}
		if (this.player.x >= 350 && !this.variables.get("ground2_start")) {
			this.variables.set("ground2_start", new Date().getTime());
			this.variables.set("ground2_end", new Date().getTime() + 720);
			this.variables.set("ground2StartY", 500);
			this.variables.set("ground2EndY", 570);
		}
		if (this.player.x >= 350 && !this.variables.get("ground3_start")) {
			this.variables.set("ground3_start", new Date().getTime());
			this.variables.set("ground3_end", new Date().getTime() + 720);
			this.variables.set("ground3StartY", 500);
			this.variables.set("ground3EndY", 570);
		}

		if (this.variables.get("ground1_start")) {
			const ground1 = this.variables.get("ground1");
			const startTime1 = this.variables.get("ground1_start");
			const endTime1 = this.variables.get("ground1_end");
			goUp(ground1, startTime1, endTime1);
		}
		if (this.variables.get("ground2_start")) {
			const ground2 = this.variables.get("ground2");
			const startTime2 = this.variables.get("ground2_start");
			const endTime2 = this.variables.get("ground2_end");
			goDown(ground2, startTime2, endTime2);
		}
		if (this.variables.get("ground3_start")) {
			const ground3 = this.variables.get("ground3");
			const startTime3 = this.variables.get("ground3_start");
			const endTime3 = this.variables.get("ground3_end");
			goDown(ground3, startTime3, endTime3);
		}
		if (this.player.x >= 750 && this.player.y >= 470 && !this.variables.get("ground4_start")) {
			this.variables.set("ground4_start", new Date().getTime());
			this.variables.set("ground4_end", new Date().getTime() + 720);
			this.variables.set("ground4StartY", 570);
			this.variables.set("ground4EndY", 500);
		}
		if (this.player.x >= 750 && this.player.y >= 470 && !this.variables.get("ground5_start")) {
			this.variables.set("ground5_start", new Date().getTime());
			this.variables.set("ground5_end", new Date().getTime() + 720);
			this.variables.set("ground5StartY", 570);
			this.variables.set("ground5EndY", 500);
		}
		if (this.variables.get("ground4_start")) {
			const ground4 = this.variables.get("ground2");
			const startTime4 = this.variables.get("ground4_start");
			const endTime4 = this.variables.get("ground4_end");
			goUp(ground4, startTime4, endTime4);
		}
		if (this.variables.get("ground5_start")) {
			const ground5 = this.variables.get("ground3");
			const startTime5 = this.variables.get("ground5_start");
			const endTime5 = this.variables.get("ground5_end");
			goUp(ground5, startTime5, endTime5);
		}
		if (this.player.y <= 370 && !this.variables.get("bomb_start")) {
			this.variables.set("bomb_start", new Date().getTime());
			this.variables.set("bomb_end", new Date().getTime() + 1200);
			this.variables.set("bombStartX", 450);
			this.variables.set("bombEndX", 310);
		}
		if (this.variables.get("bomb_start")) {
			const bomb = this.variables.get("bomb");
			const startTime6 = this.variables.get("bomb_start");
			const endTime6 = this.variables.get("bomb_end");
			goLeft(bomb, startTime6, endTime6);
		}
		if (this.player.x >= 750 && !this.variables.get("bomb2_start")) {
			this.variables.set("bomb2_start", new Date().getTime());
			this.variables.set("bomb2_end", new Date().getTime() + 2400);
			this.variables.set("bomb2StartX", 450);
			this.variables.set("bomb2EndX", 310);
		}
		if (this.variables.get("bomb2_start")) {
			const bomb = this.variables.get("bomb");
			const startTime7 = this.variables.get("bomb2_start");
			const endTime7 = this.variables.get("bomb2_end");
			goRight(bomb, startTime7, endTime7);
		}
		if (this.player.x >= 900 && this.player.x <= 904) {
			this.dynamicTraps.create(950, 200, "bomb");
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function goLeft(object: any, timeStart: number, timeEnd: number) {
	const time = new Date().getTime();
	if (time < timeEnd && time >= timeStart) {
		object.setVelocityX(-50);
	} else {
		object.setVelocityX(0);
	}
}

function goRight(object: any, timeStart: number, timeEnd: number) {
	const time = new Date().getTime();
	if (time < timeEnd && time >= timeStart) {
		object.setVelocityX(200);
	} else {
		object.setVelocityX(0);
	}
}

export default settings;
