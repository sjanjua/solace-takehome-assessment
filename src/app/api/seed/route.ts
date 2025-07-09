import db from "../../../db";
import { advocatesTable } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  
  if (!db) {
    console.error('Failed to connect to db')
    return Response.json({}, {status: 500})
  }

  const records = await db.insert(advocatesTable).values(advocateData).returning();

  return Response.json({ advocates: records });
}
