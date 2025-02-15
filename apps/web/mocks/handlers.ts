import { http } from "msw";

export const handlers = [
  http.post("/api/auth/sign-in", ({ request }) => {
    const { email, password } = request.body as any;

    if (email === "test@example.com" && password === "password123") {
      return Response.json({
        user: {
          id: "1",
          email: "test@example.com",
        },
        token: "fake-jwt-token",
      });
    }

    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }),
];
