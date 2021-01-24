import React from "react";
import { QuizConfig } from "../../components/Quiz";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: QuizConfig = {
	id: "level2Quiz2",
	title: "Level 2 - Quiz 2",
	rated: false,
	description:
		"Kannst du dich noch daran erinnern, was du dir gerade durchgelesen hast? Zeige hier, dass du deine Reise erfolgreich fortsetzen kannst, indem du das Quiz beantwortest. Diesmal gibt es noch keine Punkte, aber vielleicht helfen dir die Fragen später auf deinem Weg.",
	questions: [
		{
			id: "level2Quiz2Question1",
			type: "singleChoice",
			question: "Wie erkennt man in einem t-v-Diagramm eine Rückwärtsbewegung?",
			solutionHint: `Der Anteil des Diagramms befindet sich unterhalb der t-Achse`,
			options: [
				{
					answer: "Der Anteil des Diagramms befindet sich oberhalb der t-Achse",
					correct: false
				},
				{
					answer: "Strecke auf der t-Achse",
					correct: false
				},
				{
					answer: "Der Anteil des Diagramms befindet sich unterhalb der t-Achse",
					correct: true
				}
			]
		},
		{
			id: "level2Quiz2Question2",
			type: "singleChoice",
			question: "Wie sieht in einem Zeit-Geschwindigkeit-Diagramm der Stillstand aus?",
			solutionHint: `Strecke auf der x-Achse`,
			options: [
				{
					answer: "Der Anteil des Diagramms befindet sich oberhalb der t-Achse",
					correct: false
				},
				{
					answer: "Strecke auf der t-Achse",
					correct: true
				},
				{
					answer: "Der Anteil des Diagramms befindet sich unterhalb der t-Achse",
					correct: false
				}
			]
		},
		{
			id: "level2Quiz2Question3",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level2/zeit-geschwindigkeit4.png"} fluid rounded />
					<p> Welche Geschwindigkeit wird von der blauen Strecke dargestellt?</p>
				</>
			),
			options: [
				{
					answer: <MathJax.Node inline formula={"6 \\frac{m}{s}"} />,
					correct: false
				},
				{
					answer: <MathJax.Node inline formula={"4 \\frac{m}{s}"} />,
					correct: true
				},
				{
					answer: <MathJax.Node inline formula={"0 \\frac{m}{s}"} />,
					correct: false
				},
				{
					answer: <MathJax.Node inline formula={"-4 \\frac{m}{s}"} />,
					correct: false
				}
			]
		},
		{
			id: "level2Quiz2Question4",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level2/zeit-geschwindigkeit4.png"} fluid rounded />
					<p> Welche Geschwindigkeit wird von der grünen Strecke dargestellt?</p>
				</>
			),
			options: [
				{
					answer: <MathJax.Node inline formula={"6 \\frac{m}{s}"} />,
					correct: false
				},
				{
					answer: <MathJax.Node inline formula={"-1 \\frac{m}{s}"} />,
					correct: false
				},
				{
					answer: <MathJax.Node inline formula={"-6 \\frac{m}{s}"} />,
					correct: true
				},
				{
					answer: <MathJax.Node inline formula={"-7 \\frac{m}{s}"} />,
					correct: false
				}
			]
		},
		{
			id: "level2Quiz2Question5",
			type: "multipleChoice",
			question:
				"Was wird in einem Zeit-Geschwindigkeits-Diagramm durch eine steigende Strecke dargestellt?",
			solutionHint: `Beschleunigung vorwärts, Abbremsen (bei negativer Geschwindigkeit)`,
			options: [
				{
					answer: "Langsamer werden (bei positiver Geschwindigkeit)",
					correct: false
				},
				{
					answer: "Beschleunigung rückwärts",
					correct: false
				},
				{
					answer: "Beschleunigung vorwärts",
					correct: true
				},
				{
					answer: "Abbremsen (bei negativer Geschwindigkeit)",
					correct: true
				},
				{
					answer: "Rückwärtsbewegung",
					correct: false
				}
			]
		},
		{
			id: "level2Quiz2Question6",
			type: "multipleChoice",
			question:
				"Was wird in einem Zeit-Geschwindigkeits-Diagramm durch eine waagerechte Strecke dargestellt?",
			solutionHint: `Eine konstante Geschwindigkeit, Stillstand (ist auch eine konstante Geschwindigkeit mit v = 0 m/s)`,
			options: [
				{
					answer: "Konstante Geschwindigkeit",
					correct: true
				},
				{
					answer: "Stillstand",
					correct: true
				},
				{
					answer: "Beschleunigung",
					correct: false
				},
				{
					answer: "Abbremsen",
					correct: false
				}
			]
		}
	]
};

export default config;
