import { z } from "zod/v4"
import db from "../../../db"
import { advocatesTable } from "../../../db/schema"
import { AdvocatesSchema } from "@/types"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams

  const limit = parseInt(searchParams.get('limit') ?? '10')
  const offset = parseInt(searchParams.get('offset') ?? '0')

  try {

    if (!db) {
      console.log('Failed to connect to db')
      return Response.json({}, {status: 500})
    }

    const result = await db
      .select()
      .from(advocatesTable)
      .limit(limit)
      .offset(offset)

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

    const { success, data, error } = await z.safeParseAsync(AdvocatesSchema, result)

    if (!success) {

      const errorString = JSON.stringify(z.flattenError(error))
      console.error('The returned data failed schema validation')
      console.error(errorString)

      return Response.json({}, {status: 500})

    }

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
