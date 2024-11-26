import ky from "ky";

export function CreateHeader() {
  const api = ky.create({
    prefixUrl: "https://localhost:7139",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // use a hook to add the authorization header before each request
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set(
            "Authorization",
            
          );
        },
      ],
    },
  });

  return api;
}
