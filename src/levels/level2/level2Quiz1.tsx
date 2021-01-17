import React from "react";
import { QuizConfig } from "../../components/Quiz";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: QuizConfig = {
	id: "level2Quiz1",
	title: "Level 2 - Quiz 1",
	rated: false,
	description:
		"Kannst du dich noch daran erinnern, was du dir gerade durchgelesen hast? Zeige hier, dass du deine Reise erfolgreich fortsetzen kannst, indem du das Quiz beantwortest. Diesmal gibt es noch keine Punkte, aber vielleicht helfen dir die Fragen später auf deinem Weg.",
	questions: [
		{
			id: "level2Quiz1Question1",
			type: "multipleChoice",
			question: "Was wird in einem Zeit-Geschwindigkeitsdiagramm dargestellt?",
			solutionHint: `Alle Antworten sind richtig. Insgesamt wird die Geschwindigkeit dargestellt. Durch eine
				steigende Gerade kann im Positiven eine Beschleunigung dargestellt werden und durch
				eine fallende Gerade im Positiven das Abbremsen.`,
			options: [
				{
					answer: "Geschwindigkeit",
					correct: true
				},
				{
					answer: "Beschleunigung",
					correct: true
				},
				{
					answer: "Abbremsen",
					correct: true
				}
			]
		},
		{
			id: "level2Quiz1Question2",
			type: "singleChoice",
			question: "Wie sieht in einem Zeit-Geschwindigkeit-Diagramm eine Vorwärtsbewegung aus?",
			solutionHint: `Der Anteil des Diagramms befindet sich oberhalb der t-Achse`,
			options: [
				{
					answer: "Der Anteil des Diagramms befindet sich oberhalb der t-Achse",
					correct: true
				},
				{
					answer: "Strecke auf der x-Achse",
					correct: false
				},
				{
					answer: "Der Anteil des Diagramms befindet sich unterhalb der t-Achse",
					correct: false
				}
			]
		},
		{
			id: "level2Quiz1Question3",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level2/zeit-geschwindigkeit4.png"} fluid rounded />
					<p> Welche Geschwindigkeit wird von der orangen Strecke dargestellt?</p>
				</>
			),
			options: [
				{
					answer: <MathJax.Node inline formula={"4 \\frac{m}{s}"} />,
					correct: false
				},
				{
					answer: <MathJax.Node inline formula={"0 \\frac{m}{s}"} />,
					correct: true
				},
				{
					answer: <MathJax.Node inline formula={"-1 \\frac{m}{s}"} />,
					correct: false
				},
				{
					answer: <MathJax.Node inline formula={"-4 \\frac{m}{s}"} />,
					correct: false
				}
			]
		},
		{
			id: "level2Quiz1Question4",
			type: "multipleChoice",
			question:
				"Was wird in einem Zeit-Geschwindigkeits-Diagramm durch eine fallende Strecke dargestellt?",
			solutionHint: `Abbremsen (bei positiver Geschwindigkeit), langsamer werden, Beschleunigung
				rückwärts`,
			options: [
				{
					answer: "Abbremsen (bei positiver Geschwindigkeit)",
					correct: true
				},
				{
					answer: "Langsamer werden (bei positiver Geschwindigkeit)",
					correct: true
				},
				{
					answer: "Beschleunigung vorwärts",
					correct: false
				},
				{
					answer: "Beschleunigung rückwärts",
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
