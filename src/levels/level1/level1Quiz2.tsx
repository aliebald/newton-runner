import React from "react";
import { QuizConfig } from "../../components/Quiz";
import { Image } from "react-bootstrap";

const config: QuizConfig = {
	id: "level1Quiz2",
	title: "Level 1 - Quiz 2",
	rated: true,
	description: `Gratuliere! Du hast schon zwei Schlüssel auf deiner Reise eingesammelt. Aber Achtung! Die nächsten
		Fragen werden schwieriger. Wenn du diese richtig löst, gibt es diesmal Punkte.`,
	questions: [
		{
			id: "level1Quiz2Question1",
			type: "singleChoice",
			question: "Wie wird ein Diagramm benannt?",
			solutionHint:
				"Die zuerst genannte Achse ist immer die Rechtswertachse (horizontal) und die zweite Achse die Hochwertsache (vertikal)",
			options: [
				{
					answer:
						"Die zuerst genannte Achse ist immer die Rechtswertachse (horizontal) und die zweite Achse die Hochwertsache (vertikal).",
					correct: true
				},
				{
					answer:
						"Die zuerst genannte Achse ist immer die Hochwertsache (vertikal) und die zweiteAchse die Rechtswertachse (horizontal).",
					correct: false
				},
				{
					answer: "Man kann sich selbst aussuchen, wie man die Achsen benennen möchte.",
					correct: false
				}
			]
		},
		{
			id: "level1Quiz2Question2",
			type: "singleChoice",
			question: "Was bedeutet es, wenn der Graph in einem Zeit-Orts-Diagramm fällt?",
			solutionHint: `Wenn der Graph fällt, bedeutet das eine Rückwärtsbewegung. Man befindet sich zu
				Beginn der Bewegung an einem höheren Punkt auf der Hochwertsachse und bewegt sich
				zu einem niedrigeren. Dies bedeutet, dass sich ein Gegenstand von z.B. 8m zu 0m
				zurückbewegt.`,
			options: [
				{
					answer: "Vorwärtsbewegung",
					correct: false
				},
				{
					answer: "Keine Bewegung",
					correct: false
				},
				{
					answer: "Rückwärtsbewegung",
					correct: true
				}
			]
		},
		{
			id: "level1Quiz2Question3",
			type: "singleChoice",
			question: "Was bedeutet es, wenn der Graph in einem Zeit-Orts-Diagramm waagerecht ist?",
			solutionHint:
				"Wenn der Graph waagerecht ist, bewegt sich der Gegenstand nicht. Er bleibt an einem Ort stehen.",
			options: [
				{
					answer: "Vorwärtsbewegung",
					correct: false
				},
				{
					answer: "Keine Bewegung",
					correct: true
				},
				{
					answer: "Rückwärtsbewegung",
					correct: false
				}
			]
		},
		{
			id: "level1Quiz2Question4",
			type: "singleChoice",
			question: "Was bedeutet es, wenn der Graph in einem Zeit-Orts-Diagramm flach verläuft?",
			solutionHint:
				"Wenn der Graph flach ist, bedeutet das eine langsame Bewegung. Um seinen Ort zu ändern, braucht der Gegenstand mehr Zeit.",
			options: [
				{
					answer: "Keine Bewegung",
					correct: false
				},
				{
					answer: "Langsame Bewegung",
					correct: true
				},
				{
					answer: "Schnelle Bewegung",
					correct: false
				}
			]
		},
		{
			id: "level1Quiz2Question5",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level1/zeit-ort1.png"} fluid rounded />
					<p> Was wird von der blauen Strecke dargestellt?</p>
				</>
			),
			solutionHint: "Die blaue Strecke stellt die Vorwärtsbewegung dar, da sie steigt",
			options: [
				{
					answer: "Vorwärtsbewegung",
					correct: true
				},
				{
					answer: "Stillstand",
					correct: false
				},
				{
					answer: "Rückwärtsbewegung",
					correct: false
				}
			]
		},
		{
			id: "level1Quiz2Question6",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level1/zeit-ort1.png"} fluid rounded />
					<p> Was wird von der grünen Strecke dargestellt?</p>
				</>
			),
			solutionHint: "Die grüne Strecke stellt die Rückwärtsbewegung dar, da sie fällt.",
			options: [
				{
					answer: "Vorwärtsbewegung",
					correct: false
				},
				{
					answer: "Stillstand",
					correct: false
				},
				{
					answer: "Rückwärtsbewegung",
					correct: true
				}
			]
		},
		{
			id: "level1Quiz2Question7",
			type: "singleChoice",
			question: (
				<>
					<Image src={"levels/level1/zeit-ort1.png"} fluid rounded />
					<p> Welche Strecke repräsentiert die schnellste Bewegung?</p>
				</>
			),
			solutionHint:
				"Die grüne Strecke repräsentiert die schnellste Geschwindigkeit, da sie am steilsten ist.",
			options: [
				{
					answer: "Blau",
					correct: false
				},
				{
					answer: "Orange",
					correct: false
				},
				{
					answer: "Grün",
					correct: true
				}
			]
		},
		{
			id: "level1Quiz2Question8",
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
					answer: "Ein Körper wird gleichmäßig langsamer oder schneller",
					correct: false
				},
				{
					answer: "Ein Körper bewegt sich mit konstanter Geschwindigkeit",
					correct: true
				}
			]
		},
		{
			id: "level1Quiz2Question9",
			type: "multipleChoice",
			question: "Was bedeutet Beschleunigte Bewegung?",
			solutionHint:
				"Beschleunigte Bewegung (nicht gleichförmig): Ein Körper ändert seine Geschwindigkeit, er wird schneller oder langsamer.",
			options: [
				{
					answer: "Ein Körper ändert seine Geschwindigkeit",
					correct: true
				},
				{
					answer: "Ein Körper steht",
					correct: false
				},
				{
					answer: "Ein Körper bleibt gleich schnell",
					correct: false
				},
				{
					answer: "Ein Körper wird schneller oder langsamer",
					correct: true
				}
			]
		}
	]
};

export default config;
