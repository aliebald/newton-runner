/*
 * About this file:
 * This userdata utility file contains necessary method to save, update and load all saved userdata, like purchased items (TODO) or progress in specific Quests or Quizzes.
 *
 * Relevant exports:
 * - QuestProgress & QuizProgress: internal representation of quests and quizzes
 * - saveProgress(), loadQuestProgress(), loadQuizProgress: save / load QuestProgress & QuizProgress
 * - resetUserdata(): resets all local userdata
 */

import { log, warn, error } from "./logger";
import { get, post } from "./backendCommunication";
import { LeaderboardType } from "./components/Leaderboard";
import { questionStateType } from "./components/Question";

export interface QuestProgress {
	id: string;
	lastSave: number;
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
	lastSave: number;
	questions: QuestionProgress[];
}

export interface QuestionProgress {
	id: string;
	state: questionStateType;
}

/** Internal representation of userdata. Will later on include other things, like purchased items etc. */
interface Userdata {
	userId: string;
	name: string;
	completedTheory: string[]; // id's for all completed theory (or story / explanation) parts
	quests: QuestProgress[];
	quizzes: QuizProgress[];
}

/**
 * Updates or saves the given QuizProgress or QuestProgress
 *
 * @param progress new or updated QuestProgress or QuizProgress
 * @returns false if the given QuizProgress or QuestProgress is invalid or if there was an error while saving, else true.
 */
export function saveProgress(progress: QuizProgress | QuestProgress): boolean {
	log("saveProgress saving:", progress);
	if (!valid(progress)) {
		error("ERROR: cannot save invalid progress", progress);
		return false;
	}

	saveProgressServer(progress);
	saveProgressLocal(progress);
	return true;
}

/**
 * Saves a single attempt
 *
 * @param `id` id of the QuestProgress this attempt is part of
 * @param `attempt`
 */
export function saveQuestAttempt(id: string, attempt: QuestAttempt): void {
	const lastSave = Date.now();
	// Communicate with server
	saveQuestAttemptServer(id, attempt, lastSave);
	// Save local
	saveQuestAttemptLocal(id, attempt, lastSave);
}

/**
 * Saves a single attempt locally and updates the lastSave value of the corresponding quest
 *
 * @param `id` id of the QuestProgress this attempt is part of
 * @param lastSave timestamp to update in QuestProgress (on the server)
 * @param `attempt`
 */
function saveQuestAttemptLocal(id: string, attempt: QuestAttempt, lastSave: number): void {
	const quest = loadQuestProgressLocal(id);
	if (quest.solvedAt === -1 && attempt.solved) {
		quest.solvedAt = quest.attempts.length;
	}
	quest.attempts.push(attempt);
	quest.lastSave = lastSave;
	saveProgressLocal(quest);
}

/**
 * Saves a single attempt in the backend
 *
 * @param `id` id of the QuestProgress this attempt is part of
 * @param lastSave timestamp to update in QuestProgress (on the server)
 * @param `attempt`
 */
function saveQuestAttemptServer(id: string, attempt: QuestAttempt, lastSave: number): void {
	if (!isLoggedIn()) {
		return;
	}

	post(
		"/quest-attempt",
		JSON.stringify({
			userId: getUserId(),
			questId: id,
			questAttempt: attempt,
			lastSave: lastSave
		})
	)
		.then(() => log("%cSaveQuestAttempt success", "color: green"))
		.catch((errorMsg) => {
			// TODO: error handling
			error(errorMsg);
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
export function saveSingleQuestion(quiz: QuizProgress, question: QuestionProgress): boolean {
	log("saveSingleQuestion");
	quiz.lastSave = Date.now();

	const quizProgress = loadQuizProgressLocal(quiz.id);
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
			error("ERROR: question " + question.id + " is not part of quiz " + quiz.id, quiz);
			return false;
		}

		// Only update if something changed
		if (changed) {
			saveSingleQuestionServer(quiz, question);
			saveProgressLocal(quiz);
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

	const data = {
		userId: getUserId(),
		questionProgress: question,
		lastSave: quiz.lastSave,
		quizProgressId: quiz.id
	};

	post("/question-progress", JSON.stringify(data))
		.then(() => log("%csaveSingleQuestion success", "color: green"))
		.catch(() => {
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
		const quiz = await loadQuizProgressServer(id);
		// return if data was revived from the server
		if (quiz) {
			log("loadQuizProgress returns (from server): ", quiz);
			return quiz;
		}
	}

	// else, try to load from local storage
	return loadQuizProgressLocal(id);
}

/**
 * Loads the QuizProgress with the given `id` from local storage
 *
 * @param id id of QuizProgress to load
 * @returns undefined if there is no QuizProgress with the given id. Otherwise it returns the QuizProgress with the given id
 */
function loadQuizProgressLocal(id: string): QuizProgress | undefined {
	log("loadQuizProgressLocal");
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
	log("loadQuizProgressServer");
	if (!isLoggedIn()) {
		return undefined;
	}

	const parameters = new Map([
		["userId", getUserId()],
		["quizProgressId", id]
	]);

	try {
		return await get("/quiz-progress", parameters);
	} catch (errorMsg) {
		// 434: no progress for this Quiz
		if (errorMsg.returnObj.status === 434) {
			log("Received no progress for " + id);
			return undefined;
		}

		// TODO further error handling
		error("Failed to load QuizProgress from Server: ", errorMsg);
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
	if (isLoggedIn()) {
		const progress = await loadQuestProgressServer(questId);
		// return if data was revived from the server
		if (progress) {
			return progress;
		}
	}

	// If not logged in or no data received, load from local storage
	return loadQuestProgressLocal(questId);
}

/**
 * Requests the QuestProgress with the given `questId` from local storage
 *
 * @param questId id of QuestProgress to request
 * @returns a empty QuestProgress object if there is no QuestProgress with the given id. Otherwise it returns the QuestProgress with the given id
 */
export function loadQuestProgressLocal(questId: string): QuestProgress {
	const userdata = loadUserdataLocal();
	const index = find(questId, userdata.quests);
	if (index !== -1) {
		return userdata.quests[index];
	} else {
		return {
			id: questId,
			lastSave: Date.now(),
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
	} catch (errorMsg) {
		// 434: no progress for this Quest
		if (errorMsg.returnObj.status === 434) {
			log("Received no progress for " + questId);
			return undefined;
		}
		// TODO further  error handling
		error("Failed to load QuestProgress from Server: ", errorMsg);
		return;
	}
}

/**
 * Deletes all userdata. Use with caution!
 */
export function resetUserdata(): void {
	if (confirm("Fortschritt und Nutzerdaten löschen?")) {
		localStorage.clear();
		sessionStorage.clear();
		location.reload();
	}
}

/**
 * Saves / updates a __valid__ QuizProgress or QuestProgress in local storage
 *
 * @param progress QuizProgress or QuestProgress to be saved or updated. Must be validated beforehand using `valid()`, `validQuest()`, or `validQuiz()`.
 */
function saveProgressServer(progress: QuizProgress | QuestProgress): void {
	if (!valid(progress)) {
		warn("invalid ", progress);
		return;
	}

	if (!isLoggedIn()) {
		log("Not logged in");
		return;
	}

	if (isQuizProgress(progress)) {
		post("/quiz-progress", JSON.stringify({ userId: getUserId(), quizProgress: progress }))
			.then(() => log("%csaveProgressServer success", "color: green"))
			.catch((errorMsg) => {
				// TODO: error handling
				error(errorMsg);
			});
	} else {
		post("/quest-progress", JSON.stringify({ userId: getUserId(), questProgress: progress }))
			.then(() => log("%csaveProgressServer success", "color: green"))
			.catch((errorMsg) => {
				// TODO: error handling
				error(errorMsg);
			});
	}
}

/**
 * Saves / updates a __valid__ QuizProgress or QuestProgress in local storage
 *
 * @param progress QuizProgress or QuestProgress to be saved or updated. Must be validated beforehand using `valid()`, `validQuest()`, or `validQuiz()`.
 */
function saveProgressLocal(progress: QuizProgress | QuestProgress): void {
	log("saveProgressLocal");
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

	saveUserdataLocal(oldUserdata);
}

/**
 * Loads userdata from local storage.
 * If none is saved it will return an empty userdata object
 */
export function loadUserdataLocal(): Userdata {
	if (localStorage.userdata) {
		return JSON.parse(localStorage.userdata);
	}

	return {
		userId: "",
		name: "",
		completedTheory: [],
		quests: [],
		quizzes: []
	};
}

/**
 * Saves Userdata locally. Does not test for validity
 */
function saveUserdataLocal(userdata: Userdata): void {
	localStorage.userdata = JSON.stringify(userdata);
}

/**
 * Requests the userdata from the server.
 * If none is saved it will return an empty userdata object
 *
 * If the received userdata does not equal the local one, they will be synchronized.
 * This means that the loaded userdata will already be saved local.
 */
export async function loadAndSyncUserdata(userId: string): Promise<Userdata> {
	const serverUserData = await loadUserdataServer(userId);
	const localUserData = loadUserdataLocal();

	synchronize(serverUserData, localUserData);

	return serverUserData;
}

/**
 * Requests the userdata from the server.
 * If none is saved it will return an empty userdata object
 */
async function loadUserdataServer(userId: string): Promise<Userdata> {
	const userData = (await get("/user", new Map([["userId", userId]]))) as Userdata;
	// TODO check response
	if (userData) {
		return userData;
	}

	// In case there was no userdata
	return {
		userId: userId,
		name: "",
		completedTheory: [],
		quests: [],
		quizzes: []
	};
}

/**
 * Finds the index of the quiz or quest with the given list of either QuizProgress's or QuestProgress's
 *
 * @param id id to search for
 * @param array array of QuestProgress or QuizProgress to search in
 * @returns index in `array` of the QuestProgress or QuizProgress with the given `id`, if it exists. If it does not exist it will return -1.
 */
export function find(id: string, array: QuizProgress[] | QuestProgress[]): number {
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
	const loggedInPermanent: boolean =
		"userdata" in localStorage &&
		"userId" in JSON.parse(localStorage.userdata) &&
		JSON.parse(localStorage.userdata).userId.length > 0;
	const loggedInTemporary: boolean =
		"userId" in sessionStorage && sessionStorage.userId.length > 0;
	return loggedInPermanent || loggedInTemporary;
}

export function getUserId(): string {
	if (isLoggedIn()) {
		if (sessionStorage.userId) {
			// The user did not check
			return sessionStorage.userId;
		} else {
			return JSON.parse(localStorage.userdata).userId;
		}
	} else {
		// If this error is thrown, isLoggedIn was not checked before calling this function
		throw new Error("No User logged in! Check isLoggedIn before calling getUserId");
	}
}

/**
 * Tries to log in a user with the given userId and loads userData
 * @param userId
 * @return returns "success" if the user successfully logged in, "invalidId" if the given id is invalid and "error" for any other error
 */
export async function login(
	userId: string,
	stayLoggedIn: boolean
): Promise<"success" | "invalidId" | "error"> {
	log('Logging in: "' + userId + '" stayLoggedIn: ' + stayLoggedIn);

	if (stayLoggedIn) {
		const userdata = loadUserdataLocal();
		userdata.userId = userId;
		saveUserdataLocal(userdata);
	} else {
		sessionStorage.userId = userId;
	}

	try {
		await loadAndSyncUserdata(userId);
	} catch (error) {
		logout();
		if (error.returnObj.status === 432) {
			return "invalidId";
		}
		return "error";
	}

	return "success";
}

/**
 * Updates the name locally and on server
 *
 * @returns false if an error occurred, true otherwise
 */
export async function setName(name: string): Promise<boolean> {
	log("setName", name);
	setNameLocal(name);

	if (isLoggedIn()) {
		const data = { name: name, userId: getUserId() };
		try {
			await post("/user/name", JSON.stringify(data));
		} catch (errorMsg) {
			error(errorMsg);
			return false;
		}
	}
	return true;
}

/**
 * Updates the name locally and on server
 */
function setNameLocal(name: string) {
	const userData = loadUserdataLocal();
	// check if name did not change
	if (userData.name === name) {
		return true;
	}
	userData.name = name;
	saveUserdataLocal(userData);
}

/** Loads the userdame from localStorage */
export function getNameLocal(): string {
	return loadUserdataLocal().name;
}

/** Deletes the userId id and all progress made locally. */
export function logout(): void {
	sessionStorage.removeItem("userId");
	localStorage.clear();
}

/**
 * Synchronized local data with data on server
 */
async function synchronize(serverData: Userdata, localData: Userdata) {
	// check if already synchronized
	if (equalsUserdata(serverData, localData)) {
		return;
	}

	if (localData.name !== serverData.name) {
		setNameLocal(serverData.name);
	}

	log("synchronizing");
	log("Quest: local -> server");
	// synchronize quests
	localData.quests.forEach((localQuest) => {
		synchronizeQuest(
			localQuest,
			(serverData as Userdata).quests,
			false,
			saveProgressServer,
			saveProgressLocal
		);
	});
	log("Quest: server -> local");
	serverData.quests.forEach((serverQuest) => {
		synchronizeQuest(
			serverQuest,
			(localData as Userdata).quests,
			true,
			saveProgressLocal,
			saveProgressServer
		);
	});
	log("Quiz: local -> server");
	// synchronize Quizzes
	localData.quizzes.forEach((localQuiz) => {
		synchronizeQuiz(
			localQuiz,
			(serverData as Userdata).quizzes,
			saveProgressServer,
			saveProgressLocal
		);
	});
	log("Quiz: server -> local");
	serverData.quizzes.forEach((serverQuiz) => {
		synchronizeQuiz(
			serverQuiz,
			(localData as Userdata).quizzes,
			saveProgressLocal,
			saveProgressServer
		);
	});

	log("%cSuccessfully synchronized", "color: green");
	return;

	/** synchronizes a QuizProgress with an array of QuizProgresses */
	function synchronizeQuiz(
		quiz: QuizProgress,
		otherQuizzes: QuizProgress[],
		saveQuiz: (quiz: QuizProgress) => void,
		saveOtherQuiz: (quiz: QuizProgress) => void
	): void {
		const index = find(quiz.id, otherQuizzes);
		if (index === -1) {
			// quest does not exist in otherQuests
			log(
				"%csaving " +
					quiz.id +
					", lastSave: " +
					quiz.lastSave +
					" -> does not yet exist on other side. ",
				"color: orange"
			);
			saveQuiz(quiz);
		} else {
			const otherQuiz = otherQuizzes[index];
			log(
				"checking " +
					quiz.id +
					", lastSave: " +
					quiz.lastSave +
					" with lastSave: " +
					otherQuiz.lastSave
			);
			if (quiz.lastSave < otherQuiz.lastSave) {
				// otherQuiz is newer
				log("%csaving " + otherQuiz.lastSave, "color: orange");
				saveOtherQuiz(otherQuiz);
			} else if (quiz.lastSave > otherQuiz.lastSave) {
				// quiz is newer
				log("%csaving " + quiz.lastSave, "color: orange");
				saveQuiz(quiz);
			}
		}
	}

	/** synchronizes a QuestProgress with an array of QuestProgresses */
	function synchronizeQuest(
		quest: QuestProgress,
		otherQuests: QuestProgress[],
		/** in case there is no clear newer version: if preferQuest is true, quest will be saved, otherwise otherQuest */
		preferQuest: boolean,
		saveQuest: (Quest: QuestProgress) => void,
		saveOtherQuest: (Quest: QuestProgress) => void
	): void {
		const index = find(quest.id, otherQuests);
		if (index === -1) {
			// quest does not exist in otherQuests
			log(
				"%csaving " +
					quest.id +
					", lastSave: " +
					quest.lastSave +
					" -> does not yet exist on other side. ",
				"color: orange"
			);
			saveQuest(quest);
		} else {
			const otherQuest = otherQuests[index];
			log(
				"checking " +
					quest.id +
					", lastSave: " +
					quest.lastSave +
					" with lastSave: " +
					otherQuest.lastSave
			);
			if (
				quest.lastSave < otherQuest.lastSave &&
				quest.attempts.length <= otherQuest.attempts.length
			) {
				// otherQuest is newer
				log("%csaving " + otherQuest.lastSave, "color: orange");
				saveOtherQuest(otherQuest);
			} else if (
				(quest.lastSave > otherQuest.lastSave &&
					quest.attempts.length >= otherQuest.attempts.length) ||
				(quest.lastSave !== otherQuest.lastSave && preferQuest)
			) {
				// quest is newer
				log("%csaving " + quest.lastSave, "color: orange");
				saveQuest(quest);
			} else if (quest.lastSave !== otherQuest.lastSave && !preferQuest) {
				log("%csaving " + otherQuest.lastSave, "color: orange");
				saveOtherQuest(otherQuest);
			}
		}
	}
}

/**
 * saves a id in `userdata.completedTheory`
 */
export function saveCompletedTheory(id: string): void {
	const userdata = loadUserdataLocal();
	userdata.completedTheory.push(id);
	saveUserdataLocal(userdata);

	// save on server
	if (isLoggedIn()) {
		const data = {
			userId: getUserId(),
			theoryId: id
		};

		post("/theory-progress", JSON.stringify(data)).catch((errorMsg) => {
			// TODO: error handling
			error(errorMsg);
		});
	}
}

/**
 * Checks if `id` is in `userdata.completedTheory`
 */
function isCompletedTheory(id: string): boolean {
	const userdata = loadUserdataLocal();
	for (let i = 0; i < userdata.completedTheory.length; i++) {
		if (userdata.completedTheory[i] === id) {
			return true;
		}
	}
	return false;
}

/**
 * Checks if all questions in the Quiz with `id` are solved
 *
 * @param id id of the quiz to check
 */
function quizIsCompleted(id: string): boolean {
	const quiz = loadQuizProgressLocal(id);
	if (quiz) {
		for (let i = 0; i < quiz.questions.length; i++) {
			if (quiz.questions[i].state === "unsolved") return false;
		}
		return true;
	}
	return false;
}

/**
 * Checks if a quest is solved
 *
 * @param id id of the quest to check
 */
function questIsCompleted(id: string): boolean {
	const quest = loadQuestProgressLocal(id);
	return quest.solvedAt >= 0;
}

/**
 * Checks if one of the following is true:
 * - `id` is in `userdata.completedTheory`
 * - `id` is a completed __quiz__
 * - `id` is a completed __quest__
 */
export function isCompleted(id: string): boolean {
	return isCompletedTheory(id) || quizIsCompleted(id) || questIsCompleted(id);
}

/**
 * Requests leaderboard from backend
 */
export async function getLeaderboard(): Promise<undefined | LeaderboardType> {
	if (!isLoggedIn()) {
		return undefined;
	}

	try {
		return await get<LeaderboardType>("/leaderboard", new Map([["userId", getUserId()]]));
	} catch (errorMsg) {
		// TODO further error handling
		error("Failed to get Leaderboard from Server: ", errorMsg);
		return;
	}
}

/**
 * Checks if two Userdata objects are equal. Does not check the id to avoid errors when not logged in permanent (=> userId is "" in localStorage)
 */
function equalsUserdata(a: Userdata, b: Userdata): boolean {
	// check quests
	if (a.quests.length === b.quests.length) {
		const sortedA = [...a.quests].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
		const sortedB = [...b.quests].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

		for (let i = 0; i < a.quests.length; i++) {
			if (!equalsQuestProgress(sortedA[i], sortedB[i])) {
				return false;
			}
		}
	} else {
		return false;
	}

	// check quizzes
	if (a.quizzes.length === b.quizzes.length) {
		const sortedA = [...a.quizzes].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
		const sortedB = [...b.quizzes].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

		for (let i = 0; i < a.quizzes.length; i++) {
			if (!equalsQuizProgress(sortedA[i], sortedB[i])) {
				return false;
			}
		}
	} else {
		return false;
	}

	return (
		a.name === b.name &&
		JSON.stringify(a.completedTheory.sort()) === JSON.stringify(b.completedTheory.sort())
	);
}

/**
 * Checks if two QuestProgress objects are equal
 */
function equalsQuestProgress(a: QuestProgress, b: QuestProgress): boolean {
	if (a.attempts.length === b.attempts.length) {
		for (let i = 0; i < a.attempts.length; i++) {
			if (!equalsQuestAttempt(a.attempts[i], b.attempts[i])) {
				return false;
			}
		}
	} else {
		return false;
	}

	return a.id === b.id && a.lastSave === b.lastSave && a.solvedAt === b.solvedAt;
}

/**
 * Checks if two QuizProgress objects are equal
 */
function equalsQuestAttempt(a: QuestAttempt, b: QuestAttempt): boolean {
	return (
		a.solved === b.solved &&
		a.requiredTime === b.requiredTime &&
		a.achievedPoints === b.achievedPoints &&
		a.achievedBonusPoints === b.achievedBonusPoints &&
		a.metersWalked === b.metersWalked
	);
}

/**
 * Checks if two QuizProgress objects are equal
 */
function equalsQuizProgress(a: QuizProgress, b: QuizProgress): boolean {
	if (a.questions.length === b.questions.length) {
		const sortedA = [...a.questions].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
		const sortedB = [...b.questions].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

		for (let i = 0; i < a.questions.length; i++) {
			if (!equalsQuestionProgress(sortedA[i], sortedB[i])) {
				return false;
			}
		}
	} else {
		return false;
	}
	return a.id === b.id && a.lastSave === b.lastSave;
}

/**
 * Checks if two QuestionProgress objects are equal
 */
function equalsQuestionProgress(a: QuestionProgress, b: QuestionProgress): boolean {
	return a.id === b.id && a.state === b.state;
}
