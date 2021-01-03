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
	onUpdate: onUpdate,
	controls: controlType.t_v_graph,
	character: character.hiker,
	characterSpawnXY: {
		x: 100,
		y: 400
	}
};

// This is the settings json we export
const settings: QuestConfig = {
	title: "Level 2 Quest 1",
	id: "level2Quest1",
	graph: graph,
	description: "Sieht aus als wären da Stacheln. Vielleicht bewegen sie sich ja weit genug.", // cspell: disable-line
	game: game
};

function onPreload(this: Phaser.Scene): void {
	// TODO: Load all required images
	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("castleMid", "assets/PlatformerAssetsBase/Tiles/castleMid.png");
	this.load.image("castleCenter", "assets/PlatformerAssetsBase/Tiles/castleCenter.png");

	this.load.image("awning", "assets/PlatformerAssetsBuildings/Items/awningGreenRed.png");
	this.load.image(
		"window",
		"assets/PlatformerAssetsBuildings/Items/windowHighCheckeredBottom.png"
	);
	this.load.image("windowB", "assets/PlatformerAssetsBuildings/Items/windowHighBottom.png");
	this.load.image("windowM", "assets/PlatformerAssetsBuildings/Items/windowHighMid.png");
	this.load.image("doorK", "assets/PlatformerAssetsBuildings/Items/doorKnobAlt.png");
	this.load.image("doorT", "assets/PlatformerAssetsBuildings/Items/doorTop.png");
	this.load.image("signCup", "assets/PlatformerAssetsBuildings/Items/signCup.png");

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
	this.load.image("keyYellow", "assets/PlatformerAssetsBase/Items/keyYellow.png");
	this.load.image("coinGold", "assets/PlatformerAssetsBase/Items/coinGold.png");
}

function preCreate(this: Phaser.Scene): void {
	// TODO: Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
	}
	//add house
	this.add.image(50, 430, "grayHouseBL");
	this.add.image(120, 430, "grayHouseBM");
	this.add.image(190, 430, "grayHouseBM");
	this.add.image(260, 430, "grayHouseBM");
	this.add.image(330, 430, "grayHouseBR");
	this.add.image(50, 360, "grayHouseML");
	this.add.image(120, 360, "grayHouseM");
	this.add.image(190, 360, "grayHouseM");
	this.add.image(260, 360, "grayHouseM");
	this.add.image(330, 360, "grayHouseMR");
	this.add.image(50, 290, "grayHouseTL");
	this.add.image(120, 290, "grayHouseTM");
	this.add.image(190, 290, "grayHouseTM");
	this.add.image(260, 290, "grayHouseTM");
	this.add.image(330, 290, "grayHouseTR");

	this.add.image(50, 220, "grayHouseML");
	this.add.image(120, 220, "grayHouseM");
	this.add.image(190, 220, "grayHouseM");
	this.add.image(260, 220, "grayHouseM");
	this.add.image(330, 220, "grayHouseMR");
	this.add.image(50, 150, "grayHouseML");
	this.add.image(120, 150, "grayHouseM");
	this.add.image(190, 150, "grayHouseM");
	this.add.image(260, 150, "grayHouseM");
	this.add.image(330, 150, "grayHouseMR");
	this.add.image(50, 80, "grayHouseTL");
	this.add.image(120, 80, "grayHouseTM");
	this.add.image(190, 80, "grayHouseTM");
	this.add.image(260, 80, "grayHouseTM");
	this.add.image(330, 80, "grayHouseTR");

	this.add.image(50, 10, "grayHouseML");
	this.add.image(120, 10, "grayHouseM");
	this.add.image(190, 10, "grayHouseM");
	this.add.image(260, 10, "grayHouseM");
	this.add.image(330, 10, "grayHouseMR");

	this.add.image(50, 290, "awning");
	this.add.image(120, 290, "awning");
	this.add.image(190, 290, "awning");
	this.add.image(260, 290, "awning");
	this.add.image(330, 290, "awning");

	this.add.image(80, 175, "window");
	this.add.image(80, 125, "window").setScale(1, -1);
	this.add.image(190, 175, "window");
	this.add.image(190, 125, "window").setScale(1, -1);
	this.add.image(300, 175, "window");
	this.add.image(300, 125, "window").setScale(1, -1);

	this.add.image(135, 0, "window");
	this.add.image(135, -50, "window").setScale(1, -1);
	this.add.image(245, 0, "window");
	this.add.image(245, -50, "window").setScale(1, -1);

	this.add.image(90, 376, "window").setAngle(90);
	this.add.image(100, 375, "window").setAngle(270);
	this.add.image(290, 376, "window").setAngle(90);
	this.add.image(300, 375, "window").setAngle(270);

	this.add.image(180, 430, "doorK");
	this.add.image(180, 370, "doorT");
	this.add.image(220, 340, "signCup").setScale(0.7, 0.7);

	//add house
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

	//add house
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

	this.add.image(870, 220, "windowB");
	this.add.image(870, 150, "windowM");
	this.add.image(870, 80, "windowB").setScale(1, -1);
	this.add.image(980, 220, "windowB");
	this.add.image(980, 150, "windowM");
	this.add.image(980, 80, "windowB").setScale(1, -1);
	this.add.image(1090, 220, "windowB");
	this.add.image(1090, 150, "windowM");
	this.add.image(1090, 80, "windowB").setScale(1, -1);
	this.add.image(925, 220, "windowB");
	this.add.image(925, 150, "windowM");
	this.add.image(925, 80, "windowB").setScale(1, -1);
	this.add.image(1035, 220, "windowB");
	this.add.image(1035, 150, "windowM");
	this.add.image(1035, 80, "windowB").setScale(1, -1);
	this.add.image(1145, 220, "windowB");
	this.add.image(1145, 150, "windowM");
	this.add.image(1145, 80, "windowB").setScale(1, -1);

	this.add.image(870, 420, "windowB");
	this.add.image(870, 350, "windowM");
	this.add.image(870, 280, "windowB").setScale(1, -1);
	this.add.image(980, 420, "windowB");
	this.add.image(980, 350, "windowM");
	this.add.image(980, 280, "windowB").setScale(1, -1);
	this.add.image(1090, 420, "windowB");
	this.add.image(1090, 350, "windowM");
	this.add.image(1090, 280, "windowB").setScale(1, -1);
	this.add.image(925, 420, "windowB");
	this.add.image(925, 350, "windowM");
	this.add.image(925, 280, "windowB").setScale(1, -1);
	this.add.image(1035, 420, "windowB");
	this.add.image(1035, 350, "windowM");
	this.add.image(1035, 280, "windowB").setScale(1, -1);
	this.add.image(1145, 420, "windowB");
	this.add.image(1145, 350, "windowM");
	this.add.image(1145, 280, "windowB").setScale(1, -1);

	this.add.image(870, 20, "windowB");
	this.add.image(980, 20, "windowB");
	this.add.image(1090, 20, "windowB");
	this.add.image(925, 20, "windowB");
	this.add.image(1035, 20, "windowB");
	this.add.image(1145, 20, "windowB");
}

function afterCreate(this: Game): void {
	// TODO: add platforms / ground, coins, goals, traps etc.
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		this.platforms.create(35 + tileWidth * i, 500, "castleMid");
		this.platforms.create(35 + tileWidth * i, 570, "castleCenter");
	}
	this.dynamicGoals.create(950, 300, "keyYellow");
	const dynamicTraps = this.physics.add.group({
		allowGravity: false,
		immovable: true
	});
	const spike = this.dynamicTraps.create(400, 433, "spikes").setScale(0.5).refreshBody();
	this.physics.add.collider(this.player, dynamicTraps);
	this.variables.set("spike", spike);
	this.points.create(1000, 400, "coinGold");
}

function onUpdate(this: Game): void {
	if (this.gameRunning) {
		if (this.player.x >= 200 && !this.variables.get("spike_start")) {
			this.variables.set("spike_start", new Date().getTime());
			this.variables.set("spike_end", new Date().getTime() + 5000);
			this.variables.set("spikeStartX", 400);
			this.variables.set("spikeEndX", 1000);
		}
		if (this.variables.get("spike_start")) {
			const spike = this.variables.get("spike");
			const startTime1 = this.variables.get("spike_start");
			const endTime1 = this.variables.get("spike_end");
			goRight(spike, startTime1, endTime1);
		}
	}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function goRight(object: any, timeStart: number, timeEnd: number) {
	const time = new Date().getTime();
	if (time < timeEnd && time >= timeStart) {
		object.setVelocityX(130);
	} else {
		object.setVelocityX(0);
	}
}
export default settings;
