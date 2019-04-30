const API_ROOT = 'https://polls.apiblueprint.org/';

export function createRequest(relativeUrl, method, params = {}) {
	const headers = new Headers()
    headers.append("Content-Type", "application/json");
    
	const request = {
		url: `${API_ROOT}${relativeUrl}`,
		method: method,
		headers
    };
    
    if (method === "POST" || method === "PUT") {
        request.body = JSON.stringify(params);
    }

    return request;
}