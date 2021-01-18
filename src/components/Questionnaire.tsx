import React, { ReactElement, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { post } from "../backendCommunication";
import { getUserId, isLoggedIn } from "../userdata";
import { useHistory } from "react-router-dom";
import Toast from "./Toast";

export default function Questionnaire(props: { level: number; nextPage: string }): ReactElement {
	const [error, setError] = useState(false);
	const history = useHistory();
	const toast = (
		<Toast
			title="Fehler"
			text="Es gab einen Fehler beim senden deiner Antworten. Bitte probiere es später nocheinmal"
			type="error"
			show={error}
			onClose={() => setError(false)}
		/>
	);

	return (
		<>
			{error ? toast : <></>}
			<Container fluid="xl" className="boxWrapper my-3 px-3">
				<h2 className="text-center">Level {props.level} geschafft</h2>
				<p className="text-center">
					Danke f&uuml;rs spielen! Es w&uuml;rde uns sehr freuen, wenn du uns noch ein
					paar Fragen zum Letzten Level beantworten w&uuml;rdest.
				</p>

				<Form onSubmit={handleSubmit}>
					<UnevenHeader title="Inhalte" labels className="pt-4" />
					<Option
						name="contentA"
						question="1.a Die Inhalte des Levels waren Verständlich"
					/>
					<Option name="contentB" even question="1.b Der Inhalt war neu für mich " />
					<Option name="contentC" question="1.c Die Theorie hat mir gut gefallen" />

					<UnevenHeader title="Quiz" className="pt-4" />
					<Option name="quizA" question="2.a Die Quizze haben gut zur Theorie gepasst" />
					<Option name="quizB" even question="2.b Die Quizze waren einfach zu lösen" />
					<Option
						name="quizC"
						question="2.c Ich konnte durch die Quizze den Inhalt besser verstehen"
					/>

					<UnevenHeader title="Quests" className="pt-4" />
					<Option name="questA" question="3.a Die Quests haben mir gut gefallen" />
					<Option name="questB" even question="3.b Die Quests waren einfach zu lösen" />
					<Option
						name="questC"
						question="3.c Ich konnte durch die Quests den Inhalt besser verstehen"
					/>

					<div className="questionnaireSeparator py-2"></div>
					<EvenHeader title="Allgemeine Fragen" className="pt-4" />
					<Option
						name="generalA"
						max={5}
						question="4.a Das Spiel war eine gute Ergänzung zum Frontalunterricht"
					/>
					<Option
						name="generalB"
						max={5}
						even
						question="4.b Das Spiel hat mir besser gefallen als Frontalunterricht  "
					/>
					<Option
						name="generalC"
						max={5}
						question="4.c Ich wünsche mir ein solches Spiel auch in anderen Themenbereichen."
					/>

					<div className="questionnaireSeparator my-4"></div>
					<h3>Weitere Anmerkungen</h3>
					<Form.Text className="text-muted">
						Optional: Falls du noch weitere anmerkungen hast.
					</Form.Text>
					<Form.Control as="textarea" name="remarks" rows={4} maxLength={2000} />
					<Row className="d-flex justify-content-center">
						<Button type="submit" variant="primary" className="mt-3">
							Abschicken und Weiter
						</Button>
					</Row>
				</Form>
			</Container>
		</>
	);

	function UnevenHeader(props: { title: string; className?: string; labels?: boolean }) {
		const labels = props.labels ? (
			<>
				<Col className="QuestionnaireLabel">Stimme absolut zu</Col>
				<Col className="QuestionnaireLabel">Stimme zu</Col>
				<Col className="QuestionnaireLabel">Stimme eher zu</Col>
				<Col className="QuestionnaireLabel">Stimme eher nicht zu</Col>
				<Col className="QuestionnaireLabel">Stimme nicht zu</Col>
				<Col className="QuestionnaireLabel">Stimme gar nicht zu</Col>
			</>
		) : (
			<></>
		);

		return (
			<Row className={props.className}>
				<Col sm="6">
					<h3>{props.title}</h3>
				</Col>
				{labels}
			</Row>
		);
	}

	function EvenHeader(props: { title: string; className?: string }) {
		return (
			<Row className={props.className}>
				<Col sm="6">
					<h3>{props.title}</h3>
				</Col>
				<Col className="QuestionnaireLabel">Stimme absolut zu</Col>
				<Col className="QuestionnaireLabel">Stimme eher zu</Col>
				<Col className="QuestionnaireLabel">weder noch</Col>
				<Col className="QuestionnaireLabel">Stimme eher nicht zu</Col>
				<Col className="QuestionnaireLabel">Stimme gar nicht zu</Col>
			</Row>
		);
	}

	function Option(props: { question: string; even?: boolean; name: string; max?: number }) {
		const checkboxes: JSX.Element[] = [];
		const max = props.max ? props.max : 6;
		for (let i = 1; i <= max; i++) {
			checkboxes.push(
				<Col key={`${props.name}-${i}`} className="d-flex justify-content-center">
					<Form.Check
						required
						inline
						type="radio"
						value={i}
						id={`${props.name}-${i}`}
						name={props.name}
						className="mx-0"
					/>
				</Col>
			);
		}
		return (
			<Row
				key="inline-radio"
				className={`py-2 d-flex justify-content-center ${props.even ? "" : "bgLightGrey"}`}
			>
				<Col xs="12" sm="6">
					<div>{props.question}</div>
				</Col>
				{checkboxes}
			</Row>
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleSubmit(event: any) {
		event.preventDefault();
		const form = event.target;

		if (!form.checkValidity()) {
			event.stopPropagation();
			setError(true);
			return;
		}

		const answers = {
			contentA: parseInt(form.elements.contentA.value),
			contentB: parseInt(form.elements.contentB.value),
			contentC: parseInt(form.elements.contentC.value),
			quizA: parseInt(form.elements.quizA.value),
			quizB: parseInt(form.elements.quizB.value),
			quizC: parseInt(form.elements.quizC.value),
			questA: parseInt(form.elements.questA.value),
			questB: parseInt(form.elements.questB.value),
			questC: parseInt(form.elements.questC.value),
			generalA: parseInt(form.elements.generalA.value),
			generalB: parseInt(form.elements.generalB.value),
			generalC: parseInt(form.elements.generalC.value)
		};

		let data;
		if (isLoggedIn()) {
			data = {
				userId: getUserId(),
				level: props.level,
				answers: answers,
				remarks: form.elements.remarks.value
			};
		} else {
			data = {
				level: props.level,
				answers: answers,
				remarks: form.elements.remarks.value
			};
		}

		post("/questionnaire", JSON.stringify(data))
			.then(() => {
				history.push(props.nextPage);
			})
			.catch((error) => {
				console.error(error);
				setError(true);
			});
	}
}
