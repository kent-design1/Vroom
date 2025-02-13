// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`); // Corrected the closing backtick
    const { name, clerkID, email } = await request.json(); // Parse request body

    if (!name || !clerkID || !email) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        {
          status: 400,
        }
      );
    }

    const response = await sql`
    INSERT INTO users(
      name, email, clerk_id
    ) 
    VALUES (
      ${name}, ${clerkID}, ${email}
    )
    `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "An error occurred during the database operation",
        details: error.message || error,
      }),
      {
        status: 500,
      }
    );
  }
}
