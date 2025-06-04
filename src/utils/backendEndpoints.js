const backendServerPort = import.meta.env.VITE_HttpServerPort || 5113;
export const serverEndpoint = `http://localhost:${backendServerPort}`;
export const bugsEndpoint = serverEndpoint + "/bugs";
export const usersEndpoint = serverEndpoint + "/users";
export const notifEndpoint = serverEndpoint + "/notifications";
