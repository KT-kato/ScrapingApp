export const methodPatttern = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const mockResponse = () => {
  return new Response(JSON.stringify({ message: "mock response" }), {
    headers: { "Content-Type": "application/json" },
  });
};
