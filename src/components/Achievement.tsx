import React, { ReactElement } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

/**
 * Possible types:
 *
 * `first`, `second`, `third`, `PointCollectorLevel1`, `PointCollectorLevel2`,
 * `BonusCollectorLevel1`, `BonusCollectorLevel2`, `QuizmasterLevel1`, `QuizmasterLevel2`
 */
export default function Achievement(props: { type: string }): ReactElement {
	let title: string, text: string;
	let imagePath: string;
	let width = 40;
	let height = 40;
	switch (props.type) {
		case "first": {
			title = "Erster Platz";
			text = "Diese Medaille bekommt nur der Spieler mit den meisten Punkten";
			imagePath = "./other/achievements/medalFirst.svg";
			width = 22;
			height = 38;
			break;
		}
		case "second": {
			title = "Zweiter Platz";
			text = "Diese Medaille bekommt nur der Spieler mit den zweit meisten Punkten";
			imagePath = "./other/achievements/medalSecond.svg";
			width = 22;
			height = 38;
			break;
		}
		case "third": {
			title = "Dritter Platz";
			text = "Diese Medaille bekommt nur der Spieler mit den dritt meisten Punkten";
			imagePath = "./other/achievements/medalThird.svg";
			width = 22;
			height = 38;
			break;
		}
		case "PointCollectorLevel1": {
			title = "Punktesammler Level 1";
			text = "Volle Punktzahl in Level 1 erreicht";
			imagePath = "./other/achievements/gamepad1.png";
			break;
		}
		case "PointCollectorLevel2": {
			title = "Punktesammler Level 2";
			text = "Volle Punktzahl in Level 2 erreicht";
			imagePath = "./other/achievements/gamepad2.png";
			break;
		}
		case "BonusCollectorLevel1": {
			title = "Bonuspunktesammler Level 1";
			text = "Alle Bonuspunkte in Level 1 eingesammelt";
			imagePath = "./other/achievements/medal1.png";
			break;
		}
		case "BonusCollectorLevel2": {
			title = "Bonuspunktesammler Level 2";
			text = "Alle Bonuspunkte in Level 2 eingesammelt";
			imagePath = "./other/achievements/medal2.png";
			break;
		}
		case "QuizmasterLevel1": {
			title = "Quizmaster Level 1";
			text = "Alle Quizze in Level 1 korrekt beantwortet";
			imagePath = "./other/achievements/question.png";
			break;
		}
		case "QuizmasterLevel2": {
			title = "Quizmaster Level 2";
			text = "Alle Quizze in Level 2 korrekt beantwortet";
			imagePath = "./other/achievements/question.png";
			break;
		}

		default: {
			console.error(`Achievement ${props.type} does not exist`);
			return <></>;
		}
	}

	const popover = (
		<Popover id="AchievementPopover">
			<Popover.Title as="h3">{title}</Popover.Title>
			<Popover.Content>{text}</Popover.Content>
		</Popover>
	);
	return (
		<OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
			<img className="achievementImage" src={imagePath} width={width} height={height} />
		</OverlayTrigger>
	);
}
