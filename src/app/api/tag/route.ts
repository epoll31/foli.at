import getPortfolio from "@/utils/actions/getPortfolio";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Get the portfolio
    const portfolio = await getPortfolio({ email });

    if (!portfolio) {
      return new Response(JSON.stringify({ error: "No portfolio found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Return the tag as JSON
    return new Response(JSON.stringify({ tag: portfolio.tag }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tag" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
