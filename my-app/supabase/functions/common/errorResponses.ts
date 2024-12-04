export const BadRequest = (message?: string) => {
  return new Response(JSON.stringify({ message: message || "Bad Request" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
};
