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
- Added filter elements in the UI
- Added logic to apply filters to queries (specialties does not work)
- Added super basic pagination

### Observations
- The initial implementation of the filter was based on the current returned results. This presents a few issues:
  - We would have to return all the data to the client, which is a no-no due to how inefficient that would be if the data set is extremely large
  - The client would have to filter through a large amount of data on every keypress, which is also a no-no for the same reason as above and would degrade page performance
- There is no pagination being done on the queries, which would cause performance issues on large datasets
- Some table column types seem to be incorrect or inefficient

### Potential Improvements
- Add more robust pagination to queries to improve performance
- Add response caching either to the client or server to improve performance for duplicate queries. Next.js sort of handles this for us though with how the `fetch` method works
- The id column type should maybe be a uuid or string to prevent id increment attacks
- The specialties column could maybe be a different type to allow easier querying
- Improve form validation and logic by using something like react-hook-form
- Add unit tests and integration tests
- Add logic for input sanitation when applying filters to queries
- Filtering by specialty doesn't work. Ideally this should be a multi-select dropdown anyways, but there seems to be an issue in the backend when querying
- Filtering as a whole could probably be improved, but I'm new to Drizzle ORM and scrapped together whatever I could find in the docs
- Add a "Clear" button to reset filters
- The table could probably be broken up into multiple tables and joined together as needed
- More robust and better error handling on both the client and server
- Add loading indicators in the UI for when a query is running