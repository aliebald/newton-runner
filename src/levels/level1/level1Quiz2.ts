import { QuizConfig } from "../../components/Quiz";

const config: QuizConfig = {
	title: "Level 1 - Quiz 2",
	text: "Ein Quiz zu Bewegung, dem 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagrammen",
	questions: [
		{
			kind: "SingleChoice",
			text: "Was ist die Ursache einer Bewegung?",
			statements: [
				{
					kind: "Statement",
					text: "Ein Wille",
					isTrue: false
				},
				{
					kind: "Statement",
					text: "Eine Kraft",
					isTrue: true
				},
				{
					kind: "Statement",
					text: "Sie braucht keine Ursache",
					isTrue: false
				}
			]
		},
		{
			kind: "SingleChoice",
			text: "Was ist der Massepunkt?",
			statements: [
				{
					kind: "Statement",
					text: "Geometrie des Körpers",
					isTrue: false
				},
				{
					kind: "Statement",
					text: "Der Punkt des Körpers, an welchem die Masse am größten ist",
					isTrue: false
				},
				{
					kind: "Statement",
					text: "Punktförmiges Modell mit der Masse m des Körpers",
					isTrue: true
				}
			]
		},
		{
			kind: "MultipleChoice",
			text: "Was ist ein Inertialsystem?",
			statements: [
				{
					kind: "Statement",
					text: "Bezugssystem, in dem alle Gesetze gelten",
					isTrue: false
				},
				{
					kind: "Statement",
					text: "Bezugssystem, in dem das 1. Newtonsche Gesetz gilt",
					isTrue: true
				},
				{
					kind: "Statement",
					text:
						"Bezugssystem, in welchem jeder kräftefreie Körper relativ zu diesem Bezugssystem in Ruhe verharrt oder sich gleichförmig und geradlinig bewegt",
					isTrue: true
				},
				{
					kind: "Statement",
					text: "System für die Berechnung von Kräften",
					isTrue: false
				}
			]
		}
	]
};

export default config;
