/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Logs a message if logger is set to "debug" in localStorage
 */
export function log(message?: any, ...optionalParams: any[]): void {
	if (checkLog()) {
		console.log(message, ...optionalParams);
	}
}

/**
 * Logs a warning if logger is set to "debug" in localStorage
 */
export function warn(message?: any, ...optionalParams: any[]): void {
	if (checkLog()) {
		console.warn(message, ...optionalParams);
	}
}

/**
 * Logs an error if logger is set to "debug" in localStorage
 */
export function error(message?: any, ...optionalParams: any[]): void {
	if (checkLog()) {
		console.error(message, ...optionalParams);
	}
}

/**
 * decides if we log or skip
 * @returns true if we should log
 */
function checkLog(): boolean {
	return "logger" in localStorage && localStorage.logger === "debug";
}
