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
	data: convertDataArray([2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
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
	id: "level1Quest2",
	description:
		"Diese knarzige Brücke sieht so aus, als könnte es kurz dauern, bis sie vollständig heruntergelassen ist.", // cspell: disable-line
	graph: graph,
	game: game
};

function onPreload(this: Phaser.Scene): void {
	console.log("onPreload called");

	this.load.image("bg", "assets/PlatformerAssetsBase/Background/bg.png");

	this.load.image("grassMid", "assets/PlatformerAssetsBase/Tiles/grassMid.png");
	this.load.image("grassCenter", "assets/PlatformerAssetsBase/Tiles/grassCenter.png");
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
	console.log("preCreate called");

	// Add background
	for (let i = 0; i < 5; i++) {
		this.add.image(256 * i, 0, "bg").setOrigin(0);
		this.add.image(256 * i, 256, "bg").setOrigin(0);
		this.add.image(256 * i, 512, "bg").setOrigin(0);
	}

	// Add clouds
	this.add.image(80, 120, "cloud1");
	this.add.image(330, 100, "cloud2");
	this.add.image(730, 110, "cloud2");
	this.add.image(1030, 90, "cloud3");

	// Add house
	this.add.image(40, 360, "house_front").setScale(2);

	// Add signRight
	this.add.image(140, 430, "signRight");

	this.add.image(720, 350, "tree_beige");
	this.add.image(840, 350, "tree_green_1");
	this.add.image(1000, 350, "tree_green_2");
	this.add.image(1100, 350, "tree_beige");
	this.add.image(1200, 350, "tree_green_1");

	this.add.image(160, 450, "grassBush");
	this.add.image(700, 450, "grassBush").setScale(-1, 1);

	this.add.image(740, 432, "mushroom").setScale(0.5);
	this.add.image(1030, 432, "mushroom").setScale(0.5);
}

function afterCreate(this: Game): void {
	console.log("afterCreate called");

	// Add platforms / ground
	const tileWidth = 70;
	for (let i = 0; i * tileWidth < width; i++) {
		//gap at 385
		if (i != 5 && i != 6) {
			this.platforms.create(35 + tileWidth * i, 500, "grassMid");
			this.platforms.create(35 + tileWidth * i, 570, "grassCenter");
		}
	}

	const imageGroup: Phaser.Physics.Arcade.StaticGroup = this.physics.add.staticGroup();

	const bridge: Phaser.GameObjects.Image = this.platforms.create(500, 393, "bridge_up");
	bridge.setOrigin(0, 1);
	bridge.x = 485;
	bridge.y = 480;

	const switchLeft = imageGroup.create(300, 430, "switchLeft");

	this.variables.set("bridge", bridge);
	this.variables.set("imageGroup", imageGroup);
	this.variables.set("switchLeft", switchLeft);

	// Add coinGold as points
	this.points.create(560, 60, "coinGold");
	this.dynamicGoals.create(950, 50, "keyYellow");

	// Add a sample trap
	this.staticTraps.create(1080, 433, "spikes").setScale(0.5);
	this.staticTraps.create(420, 650, "spikes").setScale(0.5);

	this.staticTraps.create(420, 650, "spikes").setScale(0.5);

	// Set random bounce on points
	Game.setRandomBounce.call(this, this.points);

	// Set random bounce on dynamicGoals
	Game.setRandomBounce.call(this, this.dynamicGoals);
}

function onUpdate(this: Game): void {
	if (this.gameRunning) {
		if (this.player.x >= 230 && !this.variables.get("rotate_bridge_start")) {
			const imageGroup = this.variables.get("imageGroup");
			const switchLeft = this.variables.get("switchLeft");
			imageGroup.remove(switchLeft, true);
			imageGroup.create(300, 430, "switchRight");
			this.variables.set("rotate_bridge_start", new Date().getTime());
			this.variables.set("rotate_bridge_end", new Date().getTime() + 4000);
		}
		if (this.variables.get("rotate_bridge_start")) {
			const bridge = this.variables.get("bridge");
			if (bridge.angle > -90) {
				rotate(
					bridge,
					-90,
					this.variables.get("rotate_bridge_start"),
					this.variables.get("rotate_bridge_end")
				);
			} else if (bridge.angle <= -90 && !this.variables.get("changed_bridge")) {
				this.platforms.remove(bridge, true);
				this.platforms.create(420, 475, "bridge_down");
				this.variables.set("changed_bridge", true);
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rotate(object: any, endAngle: number, timeStart: number, timeEnd: number) {
	const deltaTime = (new Date().getTime() - timeStart) / (timeEnd - timeStart);
	object.angle = endAngle * deltaTime;
}

export default settings;
