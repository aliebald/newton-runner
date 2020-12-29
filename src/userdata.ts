/*
 * About this file:
 * This userdata utility file contains necessary method to save, update and load all saved userdata, like purchased items (TODO) or progress in specific Quests or Quizzes.
 *
 * Relevant exports:
 * - QuestProgress & QuizProgress: internal representation of quests and quizzes
 * - saveProgress(), loadQuestProgress(), loadQuizProgress: save / load QuestProgress & QuizProgress
 * - resetUserdata(): resets all local userdata
 */

export interface QuestProgress {
	id: string;

	/** A task is incorrect if attemptsLeft = 0 and solved is false. If solved is true, the task is solved */
	solved: boolean;
	attemptsLeft: number;
	achievedPoints: number;
	achievedBonusPoints: number;
}

export interface QuizProgress {
	id: string;

	rated: boolean;
	questions: {
		id: string;
		status: "Unsolved" | "Correct" | "Incorrect";
	}[];
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
 * Updates or saves the given quest or quiz
 * @param progress new or updated QuestProgress or QuizProgress
 * @returns false if the given task is invalid or if there was an error while saving, else true.
 */
export function saveProgress(progress: QuizProgress | QuestProgress): boolean {
	if (!valid(progress)) {
		console.log("%cERROR: cannot save invalid progress", "color: red");
		return false;
	}
	// Save on server if possible

	// TODO

	// else, save local
	saveUserdataLocal(progress);
	return true;
}

/**
 * Loads the QuizProgress with the given `id`
 * @param id id of QuizProgress to load
 * @returns undefined if there is no QuizProgress with the given id. Otherwise it returns the Task with the given id
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
 * @param id id of QuestProgress to load
 * @returns undefined if there is no QuestProgress with the given id. Otherwise it returns the Task with the given id
 */
export function loadQuestProgress(id: string): QuestProgress | undefined {
	// Load from server if possible

	// TODO

	// else, load from local storage
	const userdata = loadUserdataLocal();
	const index = find(id, userdata.quests);
	return index !== -1 ? userdata.quests[index] : undefined;
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
 * Saves / updates a __valid__ task in local storage
 * @param task task to be saved or updated. Must be validated beforehand using `validTask()`.
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
 * @param quest QuestProgress to be checked
 * @returns true if the given QuestProgress is valid, else false
 */
function validQuest(quest: QuestProgress): boolean {
	return (
		quest.achievedPoints >= 0 &&
		quest.attemptsLeft >= 0 &&
		quest.attemptsLeft >= 0 &&
		quest.id != "" // TODO check if this id exists / is valid
	);
}

/**
 * Checks if the given QuizProgress is a valid QuizProgress
 * @param quiz QuizProgress to be checked
 * @returns true if the given QuizProgress is valid, else false
 */
function validQuiz(quiz: QuizProgress): boolean {
	return quiz.questions.length > 0 && quiz.id != ""; // TODO check if this id exists / is valid
}
