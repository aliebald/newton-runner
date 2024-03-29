import { GameConfig, controlType, character } from "../../gameLogic/GameConfig";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray, { goRight } from "../../questSetupHelper";
import Game from "../../gameLogic/game";
import { QuestStats } from "../../components/StatisticQuest";

const pointsPerAttempt = [10, 10, 9, 8, 6, 4, 2];
const defaultMovement = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export const questStatistics: QuestStats = {
	title: "Level 2 Quest 2",
	maxPoints: pointsPerAttempt[0],
	maxBonuspoints: 0,
	minTimePossible: 4,
	maxTime: defaultMovement.length
};

const graph: GraphInputConfig = {
	xTitle: "Zeit in s",
	yTitle: "Geschwindigkeit in m/s",
	minY: 0,
	maxY: 5,
	data: convertDataArray(defaultMovement)
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
	onUpdate: onUpdate,
	controls: controlType.t_v_graph,
	character: character.hiker,
	pointsPerAttempt: pointsPerAttempt
};

// This is the settings json we export
const settings: QuestConfig = {
	title: "Level 2 Quest 2",
	id: "level2Quest2",
	graph: graph,
	description: `Dein Weg führt dich zu einem großen Wohnhaus. Als du dich um siehst, erkennst du eine Bombe mit 3 m/s  auf dich zurollen. Laufe also schnell weg Richtung Schlüssel. Wenn Stacheln in deinem Weg sind, bleibe kurz  1 s lang hinter diesem merkwürdigen Stein stehen, damit sie wegklappen können.`,
	game: game
};

function onPreload(this: Phaser.Scene): void {
	// Load all required images
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("castleMid", "assets/PlatformerAssetsBase/Tiles/castleMid.png");
	this.load.image("castleCenter", "assets/PlatformerAssetsBase/Tiles/castleCenter.png");

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

	this.load.image("roofM", "assets/PlatformerAssetsBuildings/Items/roofRedMid.png");
	this.load.image("roofTM", "assets/PlatformerAssetsBuildings/Items/roofRedTopMid.png");
	this.load.image("doorK", "assets/PlatformerAssetsBuildings/Items/doorKnobAlt.png");
	this.load.image("doorT", "assets/PlatformerAssetsBuildings/Items/doorTop.png");
	this.load.image(
		"window",
		"assets/PlatformerAssetsBuildings/Items/windowHighCheckeredBottom.png"
	);
	this.load.image("spikes", "assets/PlatformerAssetsBase/Items/spikes.png");
	this.load.image("bomb", "assets/PlatformerAssetsBase/Items/bomb.png");
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");
	this.load.image("brick", "/assets/PlatformerAssetsBase/Items/particleBrick1a.png");
}

function preCreate(this: Phaser.Scene): void {
	// Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
	}
	const tileWidth = 70;
	for (let i = 2; i * tileWidth < 1000; i++) {
		this.add.image(35 + tileWidth * i, 430, "darkHouseBM");
		this.add.image(35 + tileWidth * i, 360, "darkHouseM");
		this.add.image(35 + tileWidth * i, 290, "darkHouseM");
		this.add.image(35 + tileWidth * i, 220, "darkHouseM");
		this.add.image(35 + tileWidth * i, 150, "darkHouseM");
		this.add.image(35 + tileWidth * i, 80, "darkHouseM");
	}
	this.add.image(105, 430, "darkHouseBL");
	this.add.image(105, 360, "darkHouseML");
	this.add.image(105, 290, "darkHouseML");
	this.add.image(105, 220, "darkHouseML");
	this.add.image(105, 150, "darkHouseML");
	this.add.image(105, 80, "darkHouseML");

	this.add.image(1085, 430, "darkHouseBR");
	this.add.image(1085, 360, "darkHouseMR");
	this.add.image(1085, 290, "darkHouseMR");
	this.add.image(1085, 220, "darkHouseMR");
	this.add.image(1085, 150, "darkHouseMR");
	this.add.image(1085, 80, "darkHouseMR");

	for (let i = 1; i * tileWidth < 1070; i++) {
		this.add.image(35 + tileWidth * i, 80, "roofM");
		this.add.image(35 + tileWidth * i, 10, "roofTM");
	}

	this.add.image(220, 430, "doorK");
	this.add.image(220, 370, "doorT");
	this.add.image(420, 430, "doorK");
	this.add.image(420, 370, "doorT");
	this.add.image(620, 430, "doorK");
	this.add.image(620, 370, "doorT");
	this.add.image(820, 430, "doorK");
	this.add.image(820, 370, "doorT");
	this.add.image(1020, 430, "doorK");
	this.add.image(1020, 370, "doorT");

	for (let i = 1; i * tileWidth < 535; i++) {
		this.add.image(35 + tileWidth * i * 2, 250, "window").setScale(0.7, 0.7);
		this.add.image(35 + tileWidth * i * 2, 240, "window").setScale(0.7, -0.7);
	}
	for (let i = 1; i * tileWidth < 570; i++) {
		this.add.image(tileWidth * i * 2 - 35, 320, "window").setScale(0.7, 0.7);
		this.add.image(tileWidth * i * 2 - 35, 310, "window").setScale(0.7, -0.7);
		this.add.image(tileWidth * i * 2 - 35, 180, "window").setScale(0.7, 0.7);
		this.add.image(tileWidth * i * 2 - 35, 170, "window").setScale(0.7, -0.7);
	}

	this.add.image(550, 460, "brick").setScale(1.2, 1.2);
}

function afterCreate(this: Game): void {
	// add platforms / ground, coins, goals, traps etc.
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		this.platforms.create(35 + tileWidth * i, 500, "castleMid");
		this.platforms.create(35 + tileWidth * i, 570, "castleCenter");
	}

	this.dynamicGoals.create(950, 300, "keyYellow");

	const bomb = this.dynamicTraps.create(0, 433, "bomb").setScale(0.5).refreshBody();
	this.variables.set("bomb", bomb);

	this.dynamicTraps.create(1150, 433, "bomb").setScale(0.5).refreshBody();
	const spike = this.dynamicTraps.create(700, 433, "spikes").setScale(0.5).refreshBody();
	this.variables.set("spikes", spike);
}

function onUpdate(this: Game): void {
	if (this.gameRunning) {
		if (this.player.x >= 100 && !this.variables.get("bomb_started")) {
			this.variables.set("bomb_started", true);
		}
		if (this.variables.get("bomb_started")) {
			const bomb = this.variables.get("bomb");
			if (bomb.x < 800) {
				bomb.rotation += 0.1;
			}
			goRight(bomb, 800);
		}
		if (this.player.x >= 550 && !this.variables.get("passedBrick")) {
			this.variables.set("passedBrick", new Date().getTime());
		}
		if (this.variables.get("passedBrick") + 1500 < new Date().getTime()) {
			this.variables.get("spikes");
			const spikes = this.variables.get("spikes");
			spikes.setScale(0.5, -0.5).refreshBody();
		}
	}
}

export default settings;
