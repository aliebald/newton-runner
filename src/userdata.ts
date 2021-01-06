/*
 * About this file:
 * This userdata utility file contains necessary method to save, update and load all saved userdata, like purchased items (TODO) or progress in specific Quests or Quizzes.
 *
 * Relevant exports:
 * - QuestProgress & QuizProgress: internal representation of quests and quizzes
 * - saveProgress(), loadQuestProgress(), loadQuizProgress: save / load QuestProgress & QuizProgress
 * - resetUserdata(): resets all local userdata
 */

import { questionStateType } from "./components/Question";

export interface QuestProgress {
	id: string;
	/**
	 * -1 if not yet solved. Refers to index of attempt, so the actual successful attempt is `solvedAt + 1`.
	 * The first successful attempt can be found at `attempts[solvedAt]`.
	 */
	solvedAt: number;
	attempts: QuestAttempt[];
}

export interface QuestAttempt {
	solved: boolean;
	requiredTime: number;
	achievedPoints: number;
	achievedBonusPoints: number;
	metersWalked: number;
}

export interface QuizProgress {
	id: string;
	rated: boolean;
	questions: QuestionProgress[];
}

export interface QuestionProgress {
	id: string;
	state: questionStateType;
}

/** Internal representation of userdata. Will later on include other things, like purchased items etc. */
interface Userdata {
	userId: string;

	quests: QuestProgress[];
	quizzes: QuizProgress[];
	// purchasedItems is currently unused and simply a proposal for later on
	purchasedItems: {
		name: string;
		cost: number;
	}[];
}

/**
 * Updates or saves the given QuizProgress or QuestProgress
 *
 * @param progress new or updated QuestProgress or QuizProgress
 * @returns false if the given QuizProgress or QuestProgress is invalid or if there was an error while saving, else true.
 */
export function saveProgress(progress: QuizProgress | QuestProgress): boolean {
	if (!valid(progress)) {
		console.log("%cERROR: cannot save invalid progress", "color: red");
		console.log(progress);
		return false;
	}
	// Save on server if possible

	// TODO

	// Save local
	saveUserdataLocal(progress);
	return true;
}

/**
 * Saves a single attempt
 *
 * @param `id` id of the QuestProgress this attempt is part of
 * @param `attempt`
 */
export function saveQuestAttempt(id: string, attempt: QuestAttempt): void {
	// TODO Communicate with server

	const quest = loadQuestProgress(id);
	if (quest.solvedAt < 0 && attempt.solved) {
		quest.solvedAt = quest.attempts.length;
	}
	quest.attempts.push(attempt);
	saveProgress(quest);
}

/**
 * Updates or saves the given QuestionProgress. The given `quiz` __must contain__ the given `question`.
 * This can reduce network traffic by avoiding saving unchanged questions.
 *
 * @param quiz - QuizProgress `question` is a part of. This will saved instead of the single question if this QuizProgress does not yet exist
 * @param question - QuestionProgress to save
 * @returns false if the given QuestionProgress is invalid, the QuizProgress with the given quiz.id does not contain the question or if there was an error while saving, else true.
 */
export function saveSingleQuestion(quiz: QuizProgress, question: QuestionProgress): boolean {
	const quizProgress = loadQuizProgress(quiz.id);
	let changed = false;
	if (quizProgress) {
		// Replace the question inside userdata. Only required for saving in local storage
		let found = false;
		for (let i = 0; i < quizProgress.questions.length; i++) {
			if (quizProgress.questions[i].id === question.id) {
				changed = quizProgress.questions[i].state !== question.state;
				quizProgress.questions[i] = question;
				found = true;
				break;
			}
		}
		if (!found) {
			console.log(
				"%cERROR: question " + question.id + " is not part of quiz " + quiz.id,
				"color: red"
			);
			return false;
		}

		// Only update if something changed
		if (changed) {
			// Save the question on server if possible

			// TODO

			// Save local
			saveUserdataLocal(quiz);
		}
	} else {
		// Case: quizProgress was not found. Save thw whole quiz instead
		saveUserdataLocal(quiz);
	}

	return true;
}

/**
 * Loads the QuizProgress with the given `id`
 *
 * @param id id of QuizProgress to load
 * @returns undefined if there is no QuizProgress with the given id. Otherwise it returns the QuizProgress with the given id
 */
export function loadQuizProgress(id: string): QuizProgress | undefined {
	// Load from server if possible

	// TODO

	// else, load from local storage
	const userdata = loadUserdataLocal();
	const index = find(id, userdata.quizzes);
	return index !== -1 ? userdata.quizzes[index] : undefined;
}

/**
 * Loads the QuestProgress with the given `id`
 *
 * @param id id of QuestProgress to load
 * @returns undefined if there is no QuestProgress with the given id. Otherwise it returns the QuestProgress with the given id
 */
export function loadQuestProgress(id: string): QuestProgress {
	// Load from server if possible

	// TODO

	// else, load from local storage
	const userdata = loadUserdataLocal();
	const index = find(id, userdata.quests);
	if (index !== -1) {
		return userdata.quests[index];
	} else {
		return {
			id: id,
			solvedAt: -1,
			attempts: []
		};
	}
}

/**
 * Deletes all userdata. Use with caution!
 */
export function resetUserdata(): void {
	if (confirm("Fortschritt und Nutzerdaten löschen?")) {
		localStorage.removeItem("userdata");
	}
}

/**
 * Saves / updates a __valid__ QuizProgress or QuestProgress in local storage
 *
 * @param progress QuizProgress or QuestProgress to be saved or updated. Must be validated beforehand using `valid()`, `validQuest()`, or `validQuiz()`.
 */
function saveUserdataLocal(progress: QuizProgress | QuestProgress): void {
	if (!valid(progress)) {
		return;
	}

	const oldUserdata = loadUserdataLocal();
	if (isQuizProgress(progress)) {
		const index = find(progress.id, oldUserdata.quizzes);
		if (index !== -1) {
			oldUserdata.quizzes[index] = progress as QuizProgress;
		} else {
			oldUserdata.quizzes.push(progress as QuizProgress);
		}
	} else {
		const index = find(progress.id, oldUserdata.quests);
		if (index !== -1) {
			oldUserdata.quests[index] = progress as QuestProgress;
		} else {
			oldUserdata.quests.push(progress as QuestProgress);
		}
	}

	localStorage.userdata = JSON.stringify(oldUserdata);
}

/**
 * Loads userdata from local storage.
 * If none is saved it will return an empty userdata object
 */
function loadUserdataLocal(): Userdata {
	if (localStorage.userdata) {
		return JSON.parse(localStorage.userdata);
	}

	return {
		userId: "local",
		quests: [],
		quizzes: [],
		purchasedItems: []
	};
}

/**
 * Finds the index of the quiz or quest with the given list of either QuizProgress's or QuestProgress's
 *
 * @param id id to search for
 * @param array array of QuestProgress or QuizProgress to search in
 * @returns index in `array` of the QuestProgress or QuizProgress with the given `id`, if it exists. If it does not exist it will return -1.
 */
function find(id: string, array: QuizProgress[] | QuestProgress[]): number {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return i;
		}
	}
	return -1;
}

/** Simple check if the given object is of type QuizProgress */
function isQuizProgress(progress: QuizProgress | QuestProgress) {
	return "questions" in progress;
}

/**
 * Checks if the given progress (QuizProgress or QuestProgress) is a valid
 *
 * @param progress QuizProgress or QuestProgress to be checked
 * @returns true if the given progress is valid, else false
 */
function valid(progress: QuizProgress | QuestProgress) {
	const isQuiz = isQuizProgress(progress);
	return (
		(isQuiz && validQuiz(progress as QuizProgress)) ||
		(!isQuiz && validQuest(progress as QuestProgress))
	);
}

/**
 * Checks if the given QuestProgress is a valid QuestProgress
 *
 * @param quest QuestProgress to be checked
 * @returns true if the given QuestProgress is valid, else false
 */
function validQuest(quest: QuestProgress): boolean {
	for (let i = 0; i < quest.attempts.length; i++) {
		if (quest.attempts[i].achievedPoints < 0 && quest.attempts[i].requiredTime <= 0) {
			return false;
		}
	}

	return quest.id != ""; // TODO check if this id exists / is valid
}

/**
 * Checks if the given QuizProgress is a valid QuizProgress
 * @param quiz QuizProgress to be checked
 * @returns true if the given QuizProgress is valid, else false
 */
function validQuiz(quiz: QuizProgress): boolean {
	return quiz.questions.length > 0 && quiz.id != ""; // TODO check if this id exists / is valid
}
