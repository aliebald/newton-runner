import { QuizConfig } from "../../components/Quiz";

const config: QuizConfig = {
	title: "Level 1 - Quiz 2",
	description:
		"Ein Quiz zu Bewegung, dem 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagrammen",
	questions: [
		{
			type: "singleChoice",
			question: "Was ist die Ursache einer Bewegung?",
			options: [
				{
					answer: "Ein Wille",
					correct: false
				},
				{
					answer: "Eine Kraft",
					correct: true
				},
				{
					answer: "Sie braucht keine Ursache",
					correct: false
				}
			]
		},
		{
			type: "singleChoice",
			question: "Was ist der Massepunkt?",
			options: [
				{
					answer: "Geometrie des Körpers",
					correct: false
				},
				{
					answer: "Der Punkt des Körpers, an welchem die Masse am größten ist",
					correct: false
				},
				{
					answer: "Punktförmiges Modell mit der Masse m des Körpers",
					correct: true
				}
			]
		},
		{
			type: "multipleChoice",
			question: "Was ist ein Inertialsystem?",
			options: [
				{
					answer: "Bezugssystem, in dem alle Gesetze gelten",
					correct: false
				},
				{
					answer: "Bezugssystem, in dem das 1. Newtonsche Gesetz gilt",
					correct: true
				},
				{
					answer:
						"Bezugssystem, in welchem jeder kräftefreie Körper relativ zu diesem Bezugssystem in Ruhe verharrt oder sich gleichförmig und geradlinig bewegt",
					correct: true
				},
				{
					answer: "System für die Berechnung von Kräften",
					correct: false
				}
			]
		}
	]
};

export default config;
