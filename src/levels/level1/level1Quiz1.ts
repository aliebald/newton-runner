import { QuizConfig } from "../../components/Quiz";

const config: QuizConfig = {
	title: "Level 1 - Quiz 1",
	description:
		"Ein Quiz zu Bewegung, dem 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagrammen",
	questions: [
		{
			type: "multipleChoice",
			question: "Was bedeutet Gleichförmige Bewegung?",
			options: [
				{
					answer: "Ein Körper ist immer gleich schnell",
					correct: true
				},
				{
					answer: "Ein Körper bewegt sich mit konstanter Geschwindigkeit",
					correct: true
				},
				{
					answer: "Ein Körper wird gleichmäßig langsamer oder schneller",
					correct: false
				}
			]
		},
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
			question: "Wie viele unveränderliche Attribute hat ein Körper?",
			options: [
				{
					answer: "1",
					correct: true
				},
				{
					answer: "2",
					correct: false
				},
				{
					answer: "4",
					correct: false
				},
				{
					answer: "8",
					correct: false
				}
			]
		},
		{
			type: "multipleChoice",
			question: "Wie lautet das 1. Newtonsche Gesetz?",
			options: [
				{
					answer:
						"In einem Inertialsystem bleibt jeder Körper in Ruhe oder im Zustand gleichförmiger Bewegung, auf den eine Kraft wirkt.",
					correct: false
				},
				{
					answer:
						"In einem Inertialsystem bleibt jeder Körper in Ruhe oder im Zustand gleichförmiger Bewegung, auf den keine Kraft wirkt.",
					correct: true
				},
				{
					answer:
						"In einem Inertialsystem bewegt sich jeder Körper mit gleichförmiger Bewegung.",
					correct: false
				},
				{
					answer:
						"Alle Körper werden durch eine Kraft bewegt und werden entweder langsamer, schneller, oder befinden sich in Ruhe.",
					correct: false
				}
			]
		}
	]
};

export default config;
