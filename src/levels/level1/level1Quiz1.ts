import { QuizConfig } from "../../components/Quiz";

const config: QuizConfig = {
	title: "Level 1 - Quiz 1",
	text: "Ein Quiz zu Bewegung, dem 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagrammen",
	questions: [
		{
			kind: "MultipleChoice",
			text: "Was bedeutet Gleichförmige Bewegung?",
			statements: [
				{
					kind: "Statement",
					text: "Ein Körper ist immer gleich schnell",
					isTrue: true
				},
				{
					kind: "Statement",
					text: "Ein Körper bewegt sich mit konstanter Geschwindigkeit",
					isTrue: true
				},
				{
					kind: "Statement",
					text: "Ein Körper wird gleichmäßig langsamer oder schneller",
					isTrue: false
				}
			]
		},
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
			text: "Wie viele unveränderliche Attribute hat ein Körper?",
			statements: [
				{
					kind: "Statement",
					text: "1",
					isTrue: true
				},
				{
					kind: "Statement",
					text: "2",
					isTrue: false
				},
				{
					kind: "Statement",
					text: "4",
					isTrue: false
				},
				{
					kind: "Statement",
					text: "8",
					isTrue: false
				}
			]
		},
		{
			kind: "MultipleChoice",
			text: "Wie lautet das 1. Newtonsche Gesetz?",
			statements: [
				{
					kind: "Statement",
					text:
						"In einem Inertialsystem bleibt jeder Körper in Ruhe oder im Zustand gleichförmiger Bewegung, auf den eine Kraft wirkt.",
					isTrue: false
				},
				{
					kind: "Statement",
					text:
						"In einem Inertialsystem bleibt jeder Körper in Ruhe oder im Zustand gleichförmiger Bewegung, auf den keine Kraft wirkt.",
					isTrue: true
				},
				{
					kind: "Statement",
					text:
						"In einem Inertialsystem bewegt sich jeder Körper mit gleichförmiger Bewegung.",
					isTrue: false
				},
				{
					kind: "Statement",
					text:
						"Alle Körper werden durch eine Kraft bewegt und werden entweder langsamer, schneller, oder befinden sich in Ruhe.",
					isTrue: false
				}
			]
		}
	]
};

export default config;
