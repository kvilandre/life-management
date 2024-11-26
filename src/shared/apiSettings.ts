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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQ2MTMxNTEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.0sJOW33-qZhlN6BTqsYfLTA20WiVo1YU6F5M2sSVRrM"
          );
        },
      ],
    },
  });

  return api;
}
