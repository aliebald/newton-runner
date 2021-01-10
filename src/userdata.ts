/*
 * About this file:
 * This userdata utility file contains necessary method to save, update and load all saved userdata, like purchased items (TODO) or progress in specific Quests or Quizzes.
 *
 * Relevant exports:
 * - QuestProgress & QuizProgress: internal representation of quests and quizzes
 * - saveProgress(), loadQuestProgress(), loadQuizProgress: save / load QuestProgress & QuizProgress
 * - resetUserdata(): resets all local userdata
 */

import { get, post } from "./backendCommunication";
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
		console.error("ERROR: cannot save invalid progress", progress);
		return false;
	}

	saveUserdataServer(progress);
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
	// Communicate with server
	saveQuestAttemptServer(id, attempt);

	// Save local
	loadQuestProgress(id).then((quest) => {
		if (quest.solvedAt < 0 && attempt.solved) {
			quest.solvedAt = quest.attempts.length;
		}
		quest.attempts.push(attempt);
		saveUserdataLocal(quest);
	});
}

/**
 * Saves a single attempt in the backend
 *
 * @param `id` id of the QuestProgress this attempt is part of
 * @param `attempt`
 */
export function saveQuestAttemptServer(id: string, attempt: QuestAttempt): void {
	if (!isLoggedIn()) {
		return;
	}

	post(
		"/quest-attempt",
		JSON.stringify({ userId: getUserId(), questId: id, questAttempt: attempt })
	)
		.then(() => console.log("%cSaveQuestAttempt success", "color: green"))
		.catch((error) => {
			// TODO: error handling
			console.error(error);
		});
}

/**
 * Updates or saves the given QuestionProgress. The given `quiz` __must contain__ the given `question`.
 * This can reduce network traffic by avoiding saving unchanged questions.
 *
 * @param quiz - QuizProgress `question` is a part of. This will saved instead of the single question if this QuizProgress does not yet exist
 * @param question - QuestionProgress to save
 * @returns false if the given QuestionProgress is invalid, the QuizProgress with the given quiz.id does not contain the question or if there was an error while saving, else true.
 */
export async function saveSingleQuestion(
	quiz: QuizProgress,
	question: QuestionProgress
): Promise<boolean> {
	const quizProgress = await loadQuizProgress(quiz.id);
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
			console.error("ERROR: question " + question.id + " is not part of quiz " + quiz.id);
			return false;
		}

		// Only update if something changed
		if (changed) {
			saveSingleQuestionServer(quiz, question);
			saveUserdataLocal(quiz);
		}
	} else {
		// Case: quizProgress was not found. Save the whole quiz instead
		saveProgress(quiz);
	}

	return true;
}

/**
 * Updates or saves the given QuestionProgress in the backend. The given `quiz` __must contain__ the given `question`.
 *
 * @param quiz - QuizProgress `question` is a part of. This will saved instead of the single question if this QuizProgress does not yet exist
 * @param question - QuestionProgress to save
 */
export function saveSingleQuestionServer(quiz: QuizProgress, question: QuestionProgress): void {
	if (!isLoggedIn()) {
		return;
	}

	post("/question-progress", JSON.stringify({ userId: getUserId(), quizProgress: question }))
		.then(() => console.log("%csaveSingleQuestion success", "color: green"))
		.catch((error) => {
			// In case of an error: try to save the whole quiz
			saveProgress(quiz);
		});
}

/**
 * Loads the QuizProgress with the given `id`
 *
 * @param id id of QuizProgress to load
 * @returns undefined if there is no QuizProgress with the given id. Otherwise it returns the QuizProgress with the given id
 */
export async function loadQuizProgress(id: string): Promise<QuizProgress | undefined> {
	// Load from server if possible
	if (isLoggedIn()) {
		return await loadQuizProgressServer(id);
	}

	// else, load from local storage
	const userdata = loadUserdataLocal();
	const index = find(id, userdata.quizzes);
	return index !== -1 ? userdata.quizzes[index] : undefined;
}

/**
 * Requests the QuizProgress with the given `id` from the server
 *
 * @param id id of QuizProgress to load
 * @returns undefined if there is no QuizProgress with the given id. Otherwise it returns the QuizProgress with the given id
 */
async function loadQuizProgressServer(id: string): Promise<QuizProgress | undefined> {
	if (!isLoggedIn()) {
		return undefined;
	}

	const parameters = new Map([
		["userId", getUserId()],
		["quizProgressId", id]
	]);

	try {
		return await get("/quiz-progress", parameters);
	} catch (error) {
		//TODO error handling
		console.error("Failed to load QuizProgress from Server: ", error);
		return;
	}
}

/**
 * Loads the QuestProgress with the given `questId`
 *
 * @param questId id of QuestProgress to load
 * @returns undefined if there is no QuestProgress with the given id. Otherwise it returns the QuestProgress with the given id
 */
export async function loadQuestProgress(questId: string): Promise<QuestProgress> {
	// Request from server
	const progress = await loadQuestProgressServer(questId);
	if (progress) {
		return progress;
	}

	// If not logged in or no data received, load from local storage
	const userdata = loadUserdataLocal();
	const index = find(questId, userdata.quests);
	if (index !== -1) {
		return userdata.quests[index];
	} else {
		return {
			id: questId,
			solvedAt: -1,
			attempts: []
		};
	}
}

/**
 * Requests the QuestProgress with the given `questId` from the backend
 *
 * @param questId id of QuestProgress to request
 * @returns undefined if there is no QuestProgress with the given id. Otherwise it returns the QuestProgress with the given id
 */
async function loadQuestProgressServer(questId: string): Promise<QuestProgress | undefined> {
	if (!isLoggedIn()) {
		return undefined;
	}

	const parameters = new Map([
		["userId", getUserId()],
		["questId", questId]
	]);

	try {
		return await get("/quest-progress", parameters);
	} catch (error) {
		// TODO error handling
		console.error("Failed to load QuestProgress from Server: ", error);
		return;
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
function saveUserdataServer(progress: QuizProgress | QuestProgress): void {
	if (!valid(progress) || !isLoggedIn()) {
		return;
	}

	if (isQuizProgress(progress)) {
		post("/quiz-progress", JSON.stringify({ userId: getUserId(), quizProgress: progress }))
			.then(() => console.log("%csaveUserdataServer success", "color: green"))
			.catch((error) => {
				// TODO: error handling
				console.error(error);
			});
	} else {
		post("/quest-progress", JSON.stringify({ userId: getUserId(), questProgress: progress }))
			.then(() => console.log("%csaveUserdataServer success", "color: green"))
			.catch((error) => {
				// TODO: error handling
				console.error(error);
			});
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

/**
 * Checks if a user is logged in
 */
export function isLoggedIn(): boolean {
	return sessionStorage.userData && JSON.parse(sessionStorage.userData).userId;
}

export function getUserId(): string {
	if (isLoggedIn()) {
		return JSON.parse(sessionStorage.userData).userId;
	} else {
		// TODO
		throw new Error("No User logged in");
	}
}

/**
 * Tries to log in a user with the given userId and loads userData
 * @param userId
 */
export async function login(userId: string): Promise<void> {
	let userData;
	try {
		userData = await get("/user", new Map([["userId", userId]]));
	} catch (error) {
		console.error("Failed to log in: ", error);
		return;
	}

	// TODO Check
	console.log("userData: ", userData);

	sessionStorage.userData = userData;
}

// TODO: temporary dev method, remove later
export async function createNewDevUser(): Promise<void> {
	const getTeacher = JSON.stringify({
		password: "zh42+2A",
		name: "Test User"
	});

	let teacher;
	try {
		teacher = await post("/user/teacher", getTeacher);
	} catch (error) {
		console.error("in catch: ", error);
		return;
	}
	console.log(teacher);
	sessionStorage.userData = JSON.stringify({ userId: JSON.parse(teacher).userId });
}
