import { GameConfig, controlType, character } from "../../gameLogic/GameConfig";
import { QuestStats } from "../../components/StatisticQuest";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray from "../../questSetupHelper";
import Game from "../../gameLogic/game";

const width = 1200;
const defaultMovement = [2, 0, 0, 0, 0, 0, 0, 0];

export const questStatistics: QuestStats = {
	title: "Level 1 Quest 1",
	maxPoints: 0,
	maxBonuspoints: 0,
	minTimePossible: 3,
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
	controls: controlType.t_x_graph,
	character: character.hiker
};

// This is the settings json we export
export const settings: QuestConfig = {
	title: "Level 1 Quest 1",
	id: "level1Quest1",
	graph: graph,
	description: `Der erste Schlüssel befindet sich zwischen zwei Häusern in einer nahegelegenen Siedlung. Versuche
		diesen einzusammeln. Um dich zu bewegen, kannst du das Zeit-Orts-Diagramm anpassen, indem du
		die Punkte nach oben oder unten ziehst. Wenn du bereit bist, drück einfach auf "Spiel Starten".
		Solltest du nicht gleich erfolgreich sein, kannst du durch Klicken auf "Nochmal versuchen" die Quest
		beliebig oft wiederholen. Bevor du loslegst kannst du dich auch mit den Pfeiltasten unter dem Spiel
		etwas umschauen.`,
	game: game
};

function onPreload(this: Phaser.Scene): void {
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("grassMid", "assets/PlatformerAssetsBase/Tiles/grassMid.png");
	this.load.image("grassCenter", "assets/PlatformerAssetsBase/Tiles/grassCenter.png");

	this.load.image("signRight", "assets/PlatformerAssetsBase/Tiles/signRight.png");
	this.load.image("fence", "assets/PlatformerAssetsBase/Tiles/fence.png");
	this.load.image("fenceBroken", "assets/PlatformerAssetsBase/Tiles/fenceBroken.png");
	this.load.image("grassBush", "assets/PlatformerAssetsBase/Items/grass4.png");

	this.load.image("cloud1", "assets/PlatformerAssetsBase/Items/cloud1.png");
	this.load.image("cloud2", "assets/PlatformerAssetsBase/Items/cloud2.png");
	this.load.image("cloud3", "assets/PlatformerAssetsBase/Items/cloud3.png");
	this.load.image("coinGold", "assets/PlatformerAssetsBase/Items/coinGold.png");
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");

	this.load.image("houseBL", "assets/PlatformerAssetsBuildings/Items/houseBeigeBottomLeft.png");
	this.load.image("houseBM", "assets/PlatformerAssetsBuildings/Items/houseBeigeBottomMid.png");
	this.load.image("houseBR", "assets/PlatformerAssetsBuildings/Items/houseBeigeBottomRight.png");
	this.load.image("houseML", "assets/PlatformerAssetsBuildings/Items/houseBeigeMidLeft.png");
	this.load.image("houseM", "assets/PlatformerAssetsBuildings/Items/houseBeige.png");
	this.load.image("houseMR", "assets/PlatformerAssetsBuildings/Items/houseBeigeMidRight.png");
	this.load.image("houseTL", "assets/PlatformerAssetsBuildings/Items/houseBeigeTopLeft.png");
	this.load.image("houseTM", "assets/PlatformerAssetsBuildings/Items/houseBeigeTopMid.png");
	this.load.image("houseTR", "assets/PlatformerAssetsBuildings/Items/houseBeigeTopRight.png");

	this.load.image("roofTL", "assets/PlatformerAssetsBuildings/Items/roofGreyTopLeft.png");
	this.load.image("roofTM", "assets/PlatformerAssetsBuildings/Items/roofGreyTopMid.png");
	this.load.image("roofTR", "assets/PlatformerAssetsBuildings/Items/roofGreyTopRight.png");
	this.load.image("roofL", "assets/PlatformerAssetsBuildings/Items/roofGreyLeft.png");
	this.load.image("roofM", "assets/PlatformerAssetsBuildings/Items/roofGreyMid.png");
	this.load.image("roofR", "assets/PlatformerAssetsBuildings/Items/roofGreyRight.png");

	this.load.image("doorK", "assets/PlatformerAssetsBuildings/Items/doorKnobAlt.png");
	this.load.image("doorT", "assets/PlatformerAssetsBuildings/Items/doorTop.png");
	this.load.image("doorWT", "assets/PlatformerAssetsBuildings/Items/doorWindowTop.png");
	this.load.image(
		"window",
		"assets/PlatformerAssetsBuildings/Items/windowHighCheckeredBottom.png"
	);
	this.load.image("doorL", "assets/PlatformerAssetsBuildings/Items/doorLock.png");
	this.load.image("chimney", "assets/PlatformerAssetsBuildings/Items/chimneyThin.png");
}

function preCreate(this: Phaser.Scene): void {
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
	}
	const tileWidth = 60;
	for (let i = 3; i * tileWidth < 500; i++) {
		this.add.image(35 + tileWidth * i, 430, "fence");
	}
	this.add.image(155, 430, "fenceBroken").setScale(-1, 1);
	this.add.image(140, 430, "signRight");
	this.add.image(100, 80, "cloud2");
	this.add.image(270, 130, "cloud3");
	this.add.image(530, 210, "cloud1");
	this.add.image(700, 90, "cloud1");
	this.add.image(890, 160, "cloud3");
	this.add.image(1120, 120, "cloud2");
	this.add.image(1010, 450, "grassBush");

	//add house
	this.add.image(550, 430, "houseBL");
	this.add.image(620, 430, "houseBM");
	this.add.image(690, 430, "houseBR");
	this.add.image(550, 360, "houseML");
	this.add.image(620, 360, "houseM");
	this.add.image(690, 360, "houseMR");
	this.add.image(550, 290, "houseTL");
	this.add.image(620, 290, "houseTM");
	this.add.image(690, 290, "houseTR");

	//add roof
	this.add.image(525, 220, "roofM");
	this.add.image(595, 220, "roofM");
	this.add.image(665, 220, "roofM");
	this.add.image(715, 220, "roofM");
	this.add.image(525, 160, "roofTM");
	this.add.image(595, 160, "roofTM");
	this.add.image(665, 160, "roofTM");
	this.add.image(715, 160, "roofTM");

	//add door
	this.add.image(620, 430, "doorK");
	this.add.image(620, 370, "doorWT");

	//add window
	this.add.image(670, 300, "window").setScale(0.7, 0.7);
	this.add.image(670, 290, "window").setScale(0.7, -0.7);

	this.add.image(570, 300, "window").setScale(0.7, 0.7);
	this.add.image(570, 290, "window").setScale(0.7, -0.7);

	this.add.image(655, 130, "chimney");
	this.add.image(835, 130, "chimney");

	//add house 2
	this.add.image(820, 430, "houseBL");
	this.add.image(890, 430, "houseBM");
	this.add.image(960, 430, "houseBR");
	this.add.image(820, 360, "houseML");
	this.add.image(890, 360, "houseM");
	this.add.image(960, 360, "houseMR");
	this.add.image(820, 290, "houseTL");
	this.add.image(890, 290, "houseTM");
	this.add.image(960, 290, "houseTR");

	//add roof
	this.add.image(795, 220, "roofM");
	this.add.image(865, 220, "roofM");
	this.add.image(935, 220, "roofM");
	this.add.image(985, 220, "roofM");
	this.add.image(795, 160, "roofTM");
	this.add.image(865, 160, "roofTM");
	this.add.image(935, 160, "roofTM");
	this.add.image(985, 160, "roofTM");

	//add door
	this.add.image(890, 430, "doorL");
	this.add.image(890, 370, "doorWT");

	//add window
	this.add.image(850, 300, "window").setScale(0.7, 0.7);
	this.add.image(850, 290, "window").setScale(0.7, -0.7);

	this.add.image(930, 300, "window").setScale(0.7, 0.7);
	this.add.image(930, 290, "window").setScale(0.7, -0.7);
}

function afterCreate(this: Game): void {
	// add platforms / ground, coins, goals, traps etc.
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		this.platforms.create(35 + tileWidth * i, 500, "grassMid");
		this.platforms.create(35 + tileWidth * i, 570, "grassCenter");
	}
	this.dynamicGoals.create(755, 400, "keyYellow");
}
