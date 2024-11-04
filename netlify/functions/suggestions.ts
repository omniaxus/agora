import type { Context, HandlerEvent } from "@netlify/functions";

export default async (event: HandlerEvent, context: Context) => {
  try {
    const queryParameters = event.queryStringParameters;

    if (queryParameters && queryParameters["q"] === "small")
      return new Response(
        JSON.stringify({
          statusCode: 200,
          body: JSON.stringify({
            suggestions: [
              "Are the any turtle neck sweater with stripe colour",
              "Are the any turtle neck sweater with stripe colour",
            ],
          }),
        })
      );

    if (queryParameters && queryParameters["q"] === "big")
      return new Response(
        JSON.stringify({
          statusCode: 200,
          body: JSON.stringify({
            suggestions: [
              "Are the any turtle neck sweater with stripe colour",
              "Are the any turtle neck sweater with stripe colour",
              "Are the any turtle neck sweater with stripe colour",
            ],
          }),
        })
      );
  } catch (error) {
    return new Response(
      JSON.stringify({
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      })
    );
  }
};
