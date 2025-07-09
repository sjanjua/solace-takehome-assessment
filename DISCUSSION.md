*No AI was used during this challenge, had a lot of fun :)*

### Change Log
- Added `noImplicitAny` to tsconfig.json for better type safety
- Set up local database connection
- Added ShadCN for UI components
- Changed font to Lato to be more consistent with company website
- Added Navbar
- Turned the /advocates page into a server component so that we can do data fetching on the server and potentially improve page performance
- Added table to view advocates
- Added Zod for response schema validation
- Changed the payload column name to "specialties" and added the string[] type to it
- Changed the phone number column to type string
- Updated the createdAt column to include the timezone but return the data as a string

### Potential Improvements
- Add pagination to queries to improve performance
- The initial implementation of the filter was based on the current returned results. This presents a few issues:
  - We would have to return all the data to the client, which is a no-no due to how inefficient that would be if the data set is extremely large
  - The client would have to filter through a large amount of data on every keypress, which is also a no-no for the same reason as above and would degrade page performance
- Add response caching either to the client or server to improve performance for duplicate queries
- The id column type should maybe be a uuid or string to prevent id increment attacks
- The phone number column should be of type text
- The specialties column could maybe be a different type
- The createdAt column should use a timestamp with timezones, and maybe use a different format such as unix