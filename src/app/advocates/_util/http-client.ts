import { AdvocatesSchema } from "@/types"
import z from "zod/v4"
import { Form } from "../_components/AdvocatesTable"

export class HttpClient {

    private baseUrl = process.env.BASE_URL ?? ''

    async getAdvocates(
        filters?: Form,
        limit: number = 10,
        offset: number = 0,
    ) {

        try {

            let query = `limit=${limit}&offset=${offset}`

            if (filters) {

                Object.keys(filters).forEach((key) => {

                    const value = filters[key as keyof Form]

                    if (value !== '') query += `&${key}=${value}`

                })

            }

            const response = await fetch(`${this.baseUrl}/api/advocates?${query}`)

            if (!response.ok) {

            console.error('Failed to fetch advocates data')

            return null

            }

            const data = await response.json()

            // Probably want to do some schema validation
            // here so that we throw an exception if the
            // data that comes back does not match the expected
            // type of `Advocates[]`. We do schema validation on the
            // server, but it's good to do an additional check here
            // as an added safety net

            const { success, data: validated, error } = await z.safeParseAsync(AdvocatesSchema, data)

            if (!success) {

            const errorString = JSON.stringify(z.prettifyError(error))
            console.error('Failed to validate response schema')
            console.error(errorString)

            return null

            }

            return validated

        }
        catch (error: unknown) {

            if (error instanceof Error) {

            console.error('Failed to fetch advocates data', error.message)

            }

            return null

        }

    }

}