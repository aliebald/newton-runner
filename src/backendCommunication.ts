const backendServer = "http://localhost:8080";

/**
 * Sends a GET request to the backend server
 *
 * @param path - Target path appended to the server address
 * @param args - Arguments
 * @param charset - Charset used for the encoding. Can be `UTF-8` or `UTF-16`. Default if undefined: `UTF-8`.
 */
export async function get<T>(
	path: string,
	args: Map<string, string>,
	charset?: "UTF-8" | "UTF-16"
): Promise<T> {
	if (!charset) {
		charset = "UTF-8";
	}
	const params: string[] = [];
	args.forEach((value, key) => params.push(`${key}=${value}`));
	const pathWithArgs = `${backendServer}${path}${params.length ? "?" : ""}${params.join("&")}`;

	const returnObj = await fetch(pathWithArgs, {
		mode: "cors",
		headers: {
			"Content-Type": `application/json;charset=${charset}`
		}
	});

	if (returnObj.status !== 200) {
		console.log("request:", pathWithArgs);
		throw {
			message: "ERROR: Status code " + returnObj.status + ", " + (await returnObj.text()),
			returnObj: returnObj
		};
	}

	return (await returnObj.json()) as Promise<T>;
}

/**
 * Sends a POST request to the backend server
 *
 * @param path - Target path appended to the server address
 * @param content - Content of the request. For JSON use JSON.stringify(object)
 * @param charset - Charset used for the encoding. Can be `UTF-8` or `UTF-16`. Default if undefined: `UTF-8`.
 */
export async function post(
	path: string,
	content: string,
	charset?: "UTF-8" | "UTF-16"
): Promise<string> {
	if (!charset) {
		charset = "UTF-8";
	}

	const returnObj = await fetch(`${backendServer}${path}`, {
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": `application/json;charset=${charset}`
		},
		body: content
	});

	if (returnObj.status !== 202 && returnObj.status !== 200) {
		console.log("send", JSON.parse(content));
		throw {
			message: "ERROR: Status code " + returnObj.status + ", " + (await returnObj.text()),
			returnObj: returnObj
		};
	}

	return await returnObj.text();
}
