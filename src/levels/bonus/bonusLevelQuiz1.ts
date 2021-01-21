import { QuizConfig } from "../../components/Quiz";

const config: QuizConfig = {
	id: "bonusLevelQuiz1",
	title: "Bonuslevel - Quiz 1",
	rated: false,
	description: "Kannst du dich noch daran erinnern, was du dir gerade durchgelesen hast?",
	questions: [
		{
			id: "bonusLevelQuiz1Question1",
			type: "singleChoice",
			question: "Was ist die Ursache einer Bewegung?",
			solutionHint:
				"Die Ursache einer Bewegung ist eine Kraft. Der reine Wille reicht nicht.",
			options: [
				{
					answer: "Eine Kraft",
					correct: true
				},
				{
					answer: "Ein Wille",
					correct: false
				},
				{
					answer: "Sie braucht keine Ursache",
					correct: false
				}
			]
		},
		{
			id: "bonusLevelQuiz1Question2",
			type: "singleChoice",
			question: "Was ist der Massepunkt?",
			solutionHint:
				"Massepunkt: Die Geometrie des Körpers wird vernachlässigt. Er wird durch einen Massepunkt mit der Masse m des Körpers modelliert. Es ist nicht der Punkt an welchem die Masse am größten ist, da dieser Punkt die gesamte Masse darstellt.",
			options: [
				{
					answer: "Der Punkt des Körpers, an welchem die Masse am größten ist",
					correct: false
				},
				{
					answer: "Punktförmiges Modell mit der Masse m des Körpers",
					correct: true
				},
				{
					answer: "Geometrie des Körpers",
					correct: false
				}
			]
		},
		{
			id: "bonusLevelQuiz1Question3",
			type: "singleChoice",
			question: "Wie viele unveränderliche Attribute hat ein Körper?",
			solutionHint: "Die Masse ist das einzige unveränderliche Attribut eines Körpers.",
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
					answer: "6",
					correct: false
				}
			]
		},
		{
			id: "bonusLevelQuiz1Question4",
			type: "singleChoice",
			question: "Wie lautet das 1. Newtonsche Gesetz?",
			solutionHint:
				"In einem Inertialsystem bleibt jeder Körper in Ruhe oder im Zustand gleichförmiger Bewegung, auf den keine Kraft wirkt.",
			options: [
				{
					answer:
						"In einem Inertialsystem bleibt jeder Körper in Ruhe oder im Zustand gleichförmiger Bewegung, auf den eine Kraft wirkt.",
					correct: false
				},
				{
					answer:
						"Alle Körper werden durch eine Kraft bewegt und werden entweder langsamer, schneller, oder befinden sich in Ruhe.",
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
				}
			]
		}
	]
};

export default config;
