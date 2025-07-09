import { z } from "zod/v4"
import db from "../../../db"
import { advocatesTable } from "../../../db/schema"
import { AdvocatesSchema } from "@/types"
import { NextRequest } from "next/server"
import { and, eq, gte, ilike, or, sql, SQL } from "drizzle-orm"

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams

  const limit = parseInt(searchParams.get('limit') ?? '10')
  const offset = parseInt(searchParams.get('offset') ?? '0')

  const name = searchParams.get('name')
  const degree = searchParams.get('degree')
  const city = searchParams.get('city')
  const specialty = searchParams.get('specialty')
  const phone = searchParams.get('phone')
  const yearsOfExperience = searchParams.get('yearsOfExperience')

  try {

    if (!db) {
      console.log('Failed to connect to db')
      return Response.json({}, {status: 500})
    }

    const filters: SQL[] = []

    // This feels a bit ugly to do it this way...
    if (name) filters.push(or(ilike(advocatesTable.firstName, `%${name}%`), ilike(advocatesTable.lastName, `%${name}%`))!)
    if (degree) filters.push(ilike(advocatesTable.degree, degree))
    if (city) filters.push(ilike(advocatesTable.city, city))
    // Filtering by specialty doesn't work, need to debug this further
    if (specialty) filters.push(sql`${advocatesTable.specialties} @> ${JSON.stringify([specialty])}::jsonb`)
    if (phone) filters.push(eq(advocatesTable.phoneNumber, phone))
    if (yearsOfExperience) filters.push(gte(advocatesTable.yearsOfExperience, parseInt(yearsOfExperience)))

    const query = db.select().from(advocatesTable).limit(limit).offset(offset).where(and(...filters))

    const result = await query

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
