import db from "../../../db"
import { advocates } from "../../../db/schema"

export async function GET() {

  try {

    const data = await db.select().from(advocates)

    // Probably want to do some schema validation
    // here so that we throw an exception if the
    // data that comes back is of type `never[]`,
    // and to also ensure that the json shape
    // matches what we are expecting. Could use
    // something like Zod to handle this. We might
    // also want to filter out records that don't
    // conform to the expected reponse schema and
    // do error reporting to alert us so we can
    // investigate and fix any missing or malformed
    // data

    return Response.json(data)
  }
  catch (error: unknown) {

    if (error instanceof Error) {

      // This error handling can be improved but
      // for the sake of time we'll just throw a 500
      // on all failures

      console.error('Failed to get advocates data', error.message)

      return Response.json({}, { status: 500 })
    }

  }

}
