*No AI was used during this challenge, had a lot of fun :)*

### Change Log
- Added `noImplicitAny` to tsconfig.json for better type safety
- Set up local database connection
- Added ShadCN for UI components
- Changed font to Lato to be more consistent with company website
- Added Navbar
- Turned the /advocates page into a server component so that we can do data fetching on the server and potentially improve page performance
- Added table to view advocates

### Potential Improvements
- Add pagination to queries to improve performance
- The initial implementation of the filter was based on the current returned results. This presents a few issues:
  - We would have to return all the data to the client, which is a no-no due to how inefficient that would be if the data set is extremely large
  - The client would have to filter through a large amount of data on every keypress, which is also a no-no for the same reason as above and would degrade page performance
- The phone number column could maybe be a different type?
- The specialties column could maybe be a different type?