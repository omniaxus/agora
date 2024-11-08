import type { Context, HandlerEvent } from "@netlify/functions";

export default async (event: HandlerEvent, context: Context) => {
  try {
    return new Response(
      JSON.stringify({
        statusCode: 200,
        body: JSON.stringify({
          suggestions: [
            "Are the any turtle neck sweater with stripe colour",
            "Are the any turtle sweaters that can be worn today",
            "How many wears can you cater for next wednesday",
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
