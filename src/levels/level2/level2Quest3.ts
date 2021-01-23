import { GameConfig, controlType, character } from "../../gameLogic/GameConfig";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";
import convertDataArray, {
	goDown,
	goDownSlow,
	goLeft,
	goRight,
	goUp,
	goUpSlow
} from "../../questSetupHelper";
import { QuestStats } from "../../components/StatisticQuest";
import Game from "../../gameLogic/game";

const pointsPerAttempt = [10, 10, 9, 8, 6, 4, 2];
const defaultMovement = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const questStatistics: QuestStats = {
	title: "Level 2 Quest 3",
	maxPoints: pointsPerAttempt[0],
	maxBonuspoints: 0,
	minTimePossible: 7,
	maxTime: defaultMovement.length
};

const graph: GraphInputConfig = {
	xTitle: "time in s",
	yTitle: "velocity in m/s",
	minY: 0,
	maxY: 5,
	data: convertDataArray(defaultMovement)
};

const width = 1300;

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
	title: "Level 2 Quest 3",
	id: "level2Quest3",
	graph: graph,
	description: `Sieht aus, als würde in der nächsten Straße gebaut werden. Wenn die Kiste nach oben gezogen wird,
		werden die Klappen durch das Gewicht nach unten gedrückt. Warte ab, bis sich die Klappen wieder
		schließen, aber nicht zu lang, sonst wirst du noch von einer Bombe von hinten getroffen.`, // cspell: disable-line
	game: game
};

function onPreload(this: Phaser.Scene): void {
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("castleMid", "assets/PlatformerAssetsBase/Tiles/castleMid.png");
	this.load.image("castleCenter", "assets/PlatformerAssetsBase/Tiles/castleCenter.png");
	this.load.image("box", "assets/PlatformerAssetsBase/Tiles/boxAlt.png");
	this.load.image("bridge", "assets/PlatformerAssetsBase/Tiles/bridge_cut.png");
	this.load.image("bridge_down", "assets/PlatformerAssetsBase/Tiles/bridge_cut_down.png");

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

	this.load.image("chain", "assets/PlatformPackRedux/chain.png");
	this.load.image("weight", "assets/PlatformPackRedux/weightAttached.png");

	this.load.image("windowB", "assets/PlatformerAssetsBuildings/Items/windowHighBottom.png");
	this.load.image("windowM", "assets/PlatformerAssetsBuildings/Items/windowHighMid.png");
	this.load.image(
		"window",
		"assets/PlatformerAssetsBuildings/Items/windowHighCheckeredBottom.png"
	);
}

function preCreate(this: Phaser.Scene): void {
	// Add background
	for (let i = 0; i < 7; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
		this.add.image(256 * i, 512, "bg").setOrigin(0);
	}
	//house 1
	this.add.image(520, 430, "darkHouseBL");
	this.add.image(590, 430, "darkHouseBM");
	this.add.image(660, 430, "darkHouseBM");
	this.add.image(730, 430, "darkHouseBM");
	this.add.image(800, 430, "darkHouseBR");
	this.add.image(520, 360, "darkHouseML");
	this.add.image(590, 360, "darkHouseM");
	this.add.image(660, 360, "darkHouseM");
	this.add.image(730, 360, "darkHouseM");
	this.add.image(800, 360, "darkHouseMR");
	this.add.image(520, 290, "darkHouseTL");
	this.add.image(590, 290, "darkHouseTM");
	this.add.image(660, 290, "darkHouseTM");
	this.add.image(730, 290, "darkHouseTM");
	this.add.image(800, 290, "darkHouseTR");

	this.add.image(520, 220, "darkHouseML");
	this.add.image(590, 220, "darkHouseM");
	this.add.image(660, 220, "darkHouseM");
	this.add.image(730, 220, "darkHouseM");
	this.add.image(800, 220, "darkHouseMR");
	this.add.image(520, 150, "darkHouseML");
	this.add.image(590, 150, "darkHouseM");
	this.add.image(660, 150, "darkHouseM");
	this.add.image(730, 150, "darkHouseM");
	this.add.image(800, 150, "darkHouseMR");
	this.add.image(520, 80, "darkHouseTL");
	this.add.image(590, 80, "darkHouseTM");
	this.add.image(660, 80, "darkHouseTM");
	this.add.image(730, 80, "darkHouseTM");
	this.add.image(800, 80, "darkHouseTR");

	this.add.image(520, 10, "darkHouseML");
	this.add.image(590, 10, "darkHouseM");
	this.add.image(660, 10, "darkHouseM");
	this.add.image(730, 10, "darkHouseM");
	this.add.image(800, 10, "darkHouseMR");

	//house2
	this.add.image(870, 430, "darkHouseBL");
	this.add.image(940, 430, "darkHouseBM");
	this.add.image(1010, 430, "darkHouseBM");
	this.add.image(1080, 430, "darkHouseBM");
	this.add.image(1150, 430, "darkHouseBR");
	this.add.image(870, 360, "darkHouseML");
	this.add.image(940, 360, "darkHouseM");
	this.add.image(1010, 360, "darkHouseM");
	this.add.image(1080, 360, "darkHouseM");
	this.add.image(1150, 360, "darkHouseMR");
	this.add.image(870, 290, "darkHouseTL");
	this.add.image(940, 290, "darkHouseTM");
	this.add.image(1010, 290, "darkHouseTM");
	this.add.image(1080, 290, "darkHouseTM");
	this.add.image(1150, 290, "darkHouseTR");

	this.add.image(870, 220, "darkHouseML");
	this.add.image(940, 220, "darkHouseM");
	this.add.image(1010, 220, "darkHouseM");
	this.add.image(1080, 220, "darkHouseM");
	this.add.image(1150, 220, "darkHouseMR");
	this.add.image(870, 150, "darkHouseML");
	this.add.image(940, 150, "darkHouseM");
	this.add.image(1010, 150, "darkHouseM");
	this.add.image(1080, 150, "darkHouseM");
	this.add.image(1150, 150, "darkHouseMR");
	this.add.image(870, 80, "darkHouseTL");
	this.add.image(940, 80, "darkHouseTM");
	this.add.image(1010, 80, "darkHouseTM");
	this.add.image(1080, 80, "darkHouseTM");
	this.add.image(1150, 80, "darkHouseTR");

	this.add.image(870, 10, "darkHouseML");
	this.add.image(940, 10, "darkHouseM");
	this.add.image(1010, 10, "darkHouseM");
	this.add.image(1080, 10, "darkHouseM");
	this.add.image(1150, 10, "darkHouseMR");

	//house 3
	this.add.image(35, 430, "darkHouseBL");
	this.add.image(105, 430, "darkHouseBM");
	this.add.image(175, 430, "darkHouseBM");
	this.add.image(245, 430, "darkHouseBM");
	this.add.image(315, 430, "darkHouseBR");
	this.add.image(35, 360, "darkHouseML");
	this.add.image(105, 360, "darkHouseM");
	this.add.image(175, 360, "darkHouseM");
	this.add.image(245, 360, "darkHouseM");
	this.add.image(315, 360, "darkHouseMR");
	this.add.image(35, 290, "darkHouseTL");
	this.add.image(105, 290, "darkHouseTM");
	this.add.image(175, 290, "darkHouseTM");
	this.add.image(245, 290, "darkHouseTM");
	this.add.image(315, 290, "darkHouseTR");

	this.add.image(35, 220, "darkHouseML");
	this.add.image(105, 220, "darkHouseM");
	this.add.image(175, 220, "darkHouseM");
	this.add.image(245, 220, "darkHouseM");
	this.add.image(315, 220, "darkHouseMR");
	this.add.image(35, 150, "darkHouseML");
	this.add.image(105, 150, "darkHouseM");
	this.add.image(175, 150, "darkHouseM");
	this.add.image(245, 150, "darkHouseM");
	this.add.image(315, 150, "darkHouseMR");
	this.add.image(35, 80, "darkHouseTL");
	this.add.image(105, 80, "darkHouseTM");
	this.add.image(175, 80, "darkHouseTM");
	this.add.image(245, 80, "darkHouseTM");
	this.add.image(315, 80, "darkHouseTR");

	this.add.image(35, 10, "darkHouseML");
	this.add.image(105, 10, "darkHouseM");
	this.add.image(175, 10, "darkHouseM");
	this.add.image(245, 10, "darkHouseM");
	this.add.image(315, 10, "darkHouseMR");

	this.add.image(385, 435, "chain").setScale(0.5, 0.5);
	this.add.image(385, 375, "chain").setScale(0.5, 0.5);
	this.add.image(385, 315, "chain").setScale(0.5, 0.5);
	this.add.image(385, 255, "chain").setScale(0.5, 0.5);
	this.add.image(385, 195, "chain").setScale(0.5, 0.5);
	this.add.image(385, 135, "chain").setScale(0.5, 0.5);
	this.add.image(385, 75, "chain").setScale(0.5, 0.5);
	this.add.image(385, 15, "chain").setScale(0.5, 0.5);

	this.add.image(770, 445, "chain").setScale(0.5, 0.5);
	this.add.image(770, 385, "chain").setScale(0.5, 0.5);
	this.add.image(770, 325, "chain").setScale(0.5, 0.5);
	this.add.image(770, 265, "chain").setScale(0.5, 0.5);
	this.add.image(770, 205, "chain").setScale(0.5, 0.5);
	this.add.image(770, 145, "chain").setScale(0.5, 0.5);
	this.add.image(770, 85, "chain").setScale(0.5, 0.5);
	this.add.image(770, 25, "chain").setScale(0.5, 0.5);

	this.add.image(35, 220, "windowB");
	this.add.image(35, 150, "windowM");
	this.add.image(35, 80, "windowB").setScale(1, -1);
	this.add.image(90, 220, "windowB");
	this.add.image(90, 150, "windowM");
	this.add.image(90, 80, "windowB").setScale(1, -1);
	this.add.image(145, 220, "windowB");
	this.add.image(145, 150, "windowM");
	this.add.image(145, 80, "windowB").setScale(1, -1);
	this.add.image(200, 220, "windowB");
	this.add.image(200, 150, "windowM");
	this.add.image(200, 80, "windowB").setScale(1, -1);
	this.add.image(255, 220, "windowB");
	this.add.image(255, 150, "windowM");
	this.add.image(255, 80, "windowB").setScale(1, -1);
	this.add.image(310, 220, "windowB");
	this.add.image(310, 150, "windowM");
	this.add.image(310, 80, "windowB").setScale(1, -1);

	this.add.image(35, 420, "windowB");
	this.add.image(35, 350, "windowM");
	this.add.image(35, 280, "windowB").setScale(1, -1);
	this.add.image(90, 420, "windowB");
	this.add.image(90, 350, "windowM");
	this.add.image(90, 280, "windowB").setScale(1, -1);
	this.add.image(145, 420, "windowB");
	this.add.image(145, 350, "windowM");
	this.add.image(145, 280, "windowB").setScale(1, -1);
	this.add.image(200, 420, "windowB");
	this.add.image(200, 350, "windowM");
	this.add.image(200, 280, "windowB").setScale(1, -1);
	this.add.image(255, 420, "windowB");
	this.add.image(255, 350, "windowM");
	this.add.image(255, 280, "windowB").setScale(1, -1);
	this.add.image(310, 420, "windowB");
	this.add.image(310, 350, "windowM");
	this.add.image(310, 280, "windowB").setScale(1, -1);

	this.add.image(35, 20, "windowB");
	this.add.image(90, 20, "windowB");
	this.add.image(145, 20, "windowB");
	this.add.image(200, 20, "windowB");
	this.add.image(255, 20, "windowB");
	this.add.image(310, 20, "windowB");

	const tileWidth = 70;
	for (let i = 0; i * tileWidth < 300; i++) {
		this.add.image(590, -10 + tileWidth * i * 1.5, "window").setScale(0.7, 0.7);
		this.add.image(590, -20 + tileWidth * i * 1.5, "window").setScale(0.7, -0.7);
		this.add.image(730, -10 + tileWidth * i * 1.5, "window").setScale(0.7, 0.7);
		this.add.image(730, -20 + tileWidth * i * 1.5, "window").setScale(0.7, -0.7);
		this.add.image(940, -10 + tileWidth * i * 1.5, "window").setScale(0.7, 0.7);
		this.add.image(940, -20 + tileWidth * i * 1.5, "window").setScale(0.7, -0.7);
		this.add.image(1080, -10 + tileWidth * i * 1.5, "window").setScale(0.7, 0.7);
		this.add.image(1080, -20 + tileWidth * i * 1.5, "window").setScale(0.7, -0.7);
	}
}

function afterCreate(this: Game): void {
	// add platforms / ground, coins, goals, traps etc.
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
	this.staticTraps.create(1250, 433, "spikes").setScale(0.5, 0.5).refreshBody();
	this.staticTraps.create(735, 505, "spikes").setScale(0.5, 0.5).refreshBody();
	this.staticTraps.create(805, 505, "spikes").setScale(0.5, 0.5).refreshBody();

	const dynamicTraps = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	const dynamicObjects = this.physics.add.group({
		allowGravity: true,
		immovable: false
	});
	const staticObjects = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	this.physics.add.collider(this.player, dynamicTraps);
	const bomb = this.dynamicTraps.create(450, 433, "bomb").setScale(0.5).refreshBody();
	this.variables.set("bomb", bomb);
	const bomb2 = this.dynamicTraps.create(450, 433, "bomb").setScale(0.5).refreshBody();
	this.variables.set("bomb2", bomb2);
	const bomb3 = this.dynamicTraps.create(-100, 200, "bomb");
	this.variables.set("bomb3", bomb3);

	const dynamicPlatform = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	this.physics.add.collider(dynamicObjects, this.platforms);
	this.physics.add.collider(dynamicObjects, dynamicPlatform);
	this.physics.add.collider(this.points, dynamicPlatform);
	this.physics.add.collider(this.player, dynamicPlatform);
	const ground1 = dynamicPlatform.create(385, 500, "box");
	const ground2 = this.platforms.create(700, 475, "bridge").setOrigin(0, 0.5).refreshBody();
	const ground3 = this.platforms.create(840, 475, "bridge").setOrigin(1, 0.5).refreshBody();
	const weight = dynamicObjects.create(770, 400, "weight").setScale(0.3, 0.3).refreshBody();
	const chain = staticObjects.create(770, -100, "chain").setScale(0.5, 0.5).refreshBody();

	this.variables.set("ground1", ground1);
	this.variables.set("ground2", ground2);
	this.variables.set("ground3", ground3);
	this.variables.set("weight", weight);
	this.variables.set("chain", chain);

	const key = this.dynamicGoals.create(960, 300, "keyYellow");
	this.variables.set("key", key);

	this.platforms.create(-100, 270, "castleMid");
	const ground6 = this.platforms.create(-710, 500, "bridge_down");
	const ground7 = this.platforms.create(-830, 500, "bridge_down");
	this.variables.set("ground6", ground6);
	this.variables.set("ground7", ground7);
}

function onUpdate(this: Game): void {
	if (this.gameRunning) {
		if (this.player.x >= 350 && !this.variables.get("ground1_started")) {
			this.variables.set("ground1_started", true);
		}
		if (this.variables.get("ground1_started")) {
			const ground1 = this.variables.get("ground1");
			goUp(ground1, 439);
		}
		if (this.variables.get("ground1_started")) {
			const chain = this.variables.get("chain");
			chain.setY(500);
			const ground2 = this.variables.get("ground2");
			this.platforms.remove(ground2, true);
			const ground3 = this.variables.get("ground3");
			this.platforms.remove(ground3, true);
			const ground6 = this.variables.get("ground6");
			ground6.setX(710);
			const ground7 = this.variables.get("ground7");
			ground7.setX(830);
		}
		if (
			this.player.x >= 750 &&
			this.player.y >= 470 &&
			!this.variables.get("ground4_started")
		) {
			this.variables.set("ground4_started", true);
		}
	}
	if (this.variables.get("ground4_started")) {
		const ground4 = this.variables.get("ground1");
		goDown(ground4, 430);
	}
	if (this.player.y <= 370 && !this.variables.get("bomb_started")) {
		this.variables.set("bomb_started", true);
	}
	if (this.variables.get("bomb_started")) {
		const bomb = this.variables.get("bomb");
		goLeft(bomb, 350);
	}
	if (this.player.x >= 650 && !this.variables.get("bomb2_started")) {
		this.variables.set("bomb2_started", true);
	}
	if (this.variables.get("bomb2_started")) {
		const bomb2 = this.variables.get("bomb2");
		goRight(bomb2, 750);
	}
	if (this.player.x >= 900) {
		const bomb3 = this.variables.get("bomb3");
		bomb3.setX(950);
	}
	if (this.player.x > 420 && this.player.y > 370 && !this.variables.get("ground5_started")) {
		this.variables.set("ground5_started", true);
	}
	if (this.variables.get("ground5_started")) {
		const ground5 = this.variables.get("ground1");
		goDownSlow(ground5, 495);
	}
	if (this.player.x > 420 && this.player.x < 450 && !this.variables.get("weight_started")) {
		this.variables.set("weight_started", true);
	}
	if (this.variables.get("weight_started")) {
		const weight = this.variables.get("weight");
		goUpSlow(weight, 450);
		const chain = this.variables.get("chain");
		chain.setY(-500);
	}
	const weight = this.variables.get("weight");
	if (weight.y <= 450 && this.player.x > 420) {
		const ground6 = this.variables.get("ground6");
		this.platforms.remove(ground6, true);
		const ground7 = this.variables.get("ground7");
		this.platforms.remove(ground7, true);
		this.platforms.create(700, 475, "bridge").setOrigin(0, 0.5).refreshBody();
		this.platforms.create(840, 475, "bridge").setOrigin(1, 0.5).refreshBody();
	}
}

export default settings;
