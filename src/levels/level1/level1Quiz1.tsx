import React from "react";
import { QuizConfig } from "../../components/Quiz";
import { Image } from "react-bootstrap";

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
				"Gleichförmige Bewegung: Ein Körper bewegt sich mit konstanter Geschwindigkeit vorwärts, er ist immer gleich schnell.",
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
			type: "multipleChoice",
			question: "Wie bewegt sich der Gegenstand in einer eindimensionalen Bewegung?",
			solutionHint: "Der Gegenstand bewegt sich entlang einer Geraden.",
			options: [
				{
					answer: "In Wellenlinien",
					correct: false
				},
				{
					answer: "Entlang einer Geraden",
					correct: true
				},
				{
					answer: "Die Richtung ändert sich abhängig von der Geschwindigkeit",
					correct: false
				}
			]
		},
		{
			id: "level1Quiz1Question3",
			type: "singleChoice",
			question: "Was bedeutet es, wenn der Graph in einem Zeit-Orts-Diagramm steigt?",
			solutionHint: "Vorwärtsbewegung",
			options: [
				{
					answer: "Vorwärtsbewegung",
					correct: true
				},
				{
					answer: "Keine Bewegung",
					correct: false
				},
				{
					answer: "Rückwärtsbewegung",
					correct: false
				}
			]
		},
		{
			id: "level1Quiz1Question4",
			type: "singleChoice",
			question: "Was bedeutet es, wenn der Graph in einem Zeit-Orts-Diagramm steil verläuft?",
			solutionHint: "Schnelle Bewegung",
			options: [
				{
					answer: "Keine Bewegung",
					correct: false
				},
				{
					answer: "Langsame Bewegung",
					correct: false
				},
				{
					answer: "Schnelle Bewegung",
					correct: true
				}
			]
		},
		{
			id: "level1Quiz1Question5",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level1/zeit-ort1.png"} fluid rounded />
					<div>Was wird von der orangen Strecke dargestellt?</div>
				</>
			),
			solutionHint: "Schnelle Bewegung",
			options: [
				{
					answer: "Vorwärtsbewegung",
					correct: false
				},
				{
					answer: "Stillstand",
					correct: true
				},
				{
					answer: "Rückwärtsbewegung",
					correct: false
				}
			]
		}
	]
};

export default config;
