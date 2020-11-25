import { GameConfig, controlType, character } from "../../GameLogic/GameConfig";
import Game from "../../GameLogic/game";
import { GraphInputConfig } from "../../components/GraphInput";
import { QuestConfig } from "../../components/Quest";

/*
 * The settings constant represents contains all settings required for a single quest.
 * In This file all necessary functions for a single quest should be defined.
 * The App component loads this into a Quest component.
 */

const graph: GraphInputConfig = {
	title: "Test",
	minY: 0,
	maxY: 100,
	// amountXVal: 7
	data: [1, 10, 100, 1, 10, 100]
};

const game: GameConfig = {
	gameWorld: {
		height: 600,
		width: 800 * 2
	},
	onPreload: onPreload,
	preCreate: preCreate,
	afterCreate: afterCreate,
	controls: controlType.arrowKeys,
	character: character.hiker
};

const settings: QuestConfig = {
	title: "Beispiel Quest 2",
	graph: graph,
	game: game
};

// TODO documentation
function onPreload(this: Phaser.Scene): void {
	console.log("onPreload called");

	this.load.image("sky", "assets/sky.png");
	this.load.image("ground", "assets/platform.png");
	this.load.image("star", "assets/star.png");
}

// TODO documentation
function preCreate(this: Phaser.Scene): void {
	console.log("preCreate called");

	// Add background
	for (let i = 0; i < 2; i++) {
		this.add.image(800 * i, 0, "sky").setOrigin(0);
	}
}

function afterCreate(this: Game): void {
	console.log("afterCreate called");

	// Add ground
	this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
	this.platforms.create(1200, 568, "ground").setScale(2).refreshBody();

	// Add platforms
	this.platforms.create(660, 400, "ground").setScale(0.7, 1).refreshBody();
	this.platforms.create(50, 200, "ground").setScale(0.5, 1).refreshBody();
	this.platforms.create(150, 380, "ground");
	this.platforms.create(950, 250, "ground");

	// Add stars
	this.stars.create(100, 60, "star");
	this.stars.create(300, 60, "star");
	this.stars.create(680, 60, "star");
	this.stars.create(1000, 60, "star");

	// Set random bounce on stars
	this.stars.children.iterate((c) => {
		const child = (c as unknown) as Phaser.Physics.Arcade.Body;
		child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));
	});
}

export default settings;
