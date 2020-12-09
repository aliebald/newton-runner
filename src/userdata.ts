/*
 * About this file:
 * This userdata utility file contains necessary method to save, update and load all saved userdata, like purchased items (TODO) or progress in specific Quests or Quizzes.
 *
 * Relevant exports:
 * - Task: internal representation of quests and quizzes
 * - saveTaskProgress
 */

/**
 * A task can be either a quest or quiz.
 * It is used to save user progress.
 */
export default interface Task {
	type: "quest" | "quiz";
	id: string; // MUST be unique!
	title: string;
	won: boolean;
	achievedPoints: number;
	possiblePoints: number;
}

/** Internal representation of userdata. Will later on include other thinks, like purchased items etc. */
interface Userdata {
	tasks: Task[];
	purchasedItems: {
		name: string;
		cost: number;
	}[];
	userInput?: number[];
}

/**
 * Updates or saves the given task
 * @param task new or updated task
 * @returns false if the given task is invalid or if there was an error while saving, else true.
 */
export function saveTaskProgress(task: Task): boolean {
	if (!validTask) {
		console.log("%cERROR: cannot save invalid task", "color: red");
		return false;
	}
	// Save on server if possible

	// TODO

	// else, save local
	saveUserdataLocal(task);
	return true;
}

/**
 * Loads the task with the given `id`
 * @param id id of task to load
 * @returns undefined if there is no task with the given id. Otherwise it returns the Task with the given id
 */
export function loadTaskProgress(id: string): Task | undefined {
	// Load from server if possible

	// TODO

	// else, load from local storage
	const userdata = loadUserdataLocal();
	const index = find(id, userdata.tasks);
	if (index !== -1) {
		return userdata.tasks[index];
	}
	return undefined;
}

/**
 * Saves / updates a __valid__ task in local storage
 * @param task task to be saved or updated. Must be validated beforehand using `validTask()`.
 */
function saveUserdataLocal(task: Task): void {
	const oldUserdata = loadUserdataLocal();
	const index = find(task.id, oldUserdata.tasks);
	if (index !== -1) {
		oldUserdata.tasks[index] = task;
	} else {
		oldUserdata.tasks.push(task);
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
		tasks: [],
		purchasedItems: []
	};
}

/**
 * Finds the index of the task with the given title
 * @param id id to search for
 * @param tasks array of tasks to search in
 * @returns index in `tasks` of the tasks with the given `id`, if it exists. If it does not exist it will return -1.
 */
function find(id: string, tasks: Task[]): number {
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id === id) {
			return i;
		}
	}
	return -1;
}

/**
 * Checks if the given task is a valid task
 * @param task task to be checked
 * @returns true if the given task is valid, else false
 */
function validTask(task: Task): boolean {
	return task.title !== "" && task.achievedPoints >= 0 && task.possiblePoints >= 0;
}
