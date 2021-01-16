import { QuizConfig } from "../../components/Quiz";

const config: QuizConfig = {
	id: "level1Quiz1",
	title: "Level 1 - Quiz 1",
	rated: false,
	description:
		"Kannst du dich noch daran erinnern, was du dir gerade durchgelesen hast? Zeige hier, dass du deine Reise erfolgreich fortsetzen kannst, indem du das Quiz beantwortest. Diesmal gibt es noch keine Punkte, aber vielleicht helfen dir die Fragen später auf deinem Weg.",
	questions: [
		{
			id: "level1Quiz1Question1",
			type: "multipleChoice",
			question: "Was bedeutet Gleichförmige Bewegung?",
			solutionHint:
				"Hier wird erklärt warum Antwort 1 und 2 korrekt sind, Antwort 3 jedoch nicht.",
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
			id: "level1Quiz1Question2",
			type: "singleChoice",
			question: "Was ist die Ursache einer Bewegung?",
			solutionHint:
				"Hier wird erklärt warum Antwort 2 korrekt ist, Antwort 1 und 3 jedoch nicht.",
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
			id: "level1Quiz1Question3",
			type: "singleChoice",
			question: "Wie viele unveränderliche Attribute hat ein Körper?",
			solutionHint:
				"Hier wird erklärt warum Antwort 1 korrekt ist, Antwort 2, 3 und 4 jedoch nicht.",
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
			id: "level1Quiz1Question4",
			type: "multipleChoice",
			question: "Wie lautet das 1. Newtonsche Gesetz?",
			solutionHint:
				"Hier wird erklärt warum Antwort 2 korrekt ist, Antwort 1, 3 und 4 jedoch nicht.",
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
