import Breadcrumbs from './_components/Breadcrumbs'
import AdvocatesTable from './_components/AdvocatesTable'
import { HttpClient } from './_util/http-client'

const AdvocatesPage = async () => {

  const client = new HttpClient()

  const advocatesData = await client.getAdvocates()

  // If `advocatesData` is null, this means that
  // an error occurred while attempting to fetch
  // the data. In production code we should handle 
  // this error appropriately and inform the user

  return (
    <main className='p-4 pl-8 pr-8 flex flex-col gap-16'>
      <Breadcrumbs />
      <h1 className='text-xl'>Find an Advocate</h1>

      {
        advocatesData === null
          ? <div className='w-full text-center'>
            We encountered a problem while trying to get your data. Please try again later.
          </div>
          : <AdvocatesTable advocates={advocatesData} />
      }

    </main>
  )
}

export default AdvocatesPage


// "use client"

// import { useEffect, useState } from "react"

// export default function AdvocatesPage() {
//   const [advocates, setAdvocates] = useState([])
//   const [filteredAdvocates, setFilteredAdvocates] = useState([])

//   useEffect(() => {
//     console.log("fetching advocates...")
//     fetch("/api/advocates").then((response) => {
//       response.json().then((jsonResponse) => {
//         setAdvocates(jsonResponse.data)
//         setFilteredAdvocates(jsonResponse.data)
//       })
//     })
//   }, [])

//   const onChange = (e) => {
//     const searchTerm = e.target.value

//     document.getElementById("search-term").innerHTML = searchTerm

//     console.log("filtering advocates...")
//     const filteredAdvocates = advocates.filter((advocate) => {
//       return (
//         advocate.firstName.includes(searchTerm) ||
//         advocate.lastName.includes(searchTerm) ||
//         advocate.city.includes(searchTerm) ||
//         advocate.degree.includes(searchTerm) ||
//         advocate.specialties.includes(searchTerm) ||
//         advocate.yearsOfExperience.includes(searchTerm)
//       )
//     })

//     setFilteredAdvocates(filteredAdvocates)
//   }

//   const onClick = () => {
//     console.log(advocates)
//     setFilteredAdvocates(advocates)
//   }

//   return (
//     <main style={{ margin: "24px" }}>
//       <h1>Solace Advocates</h1>
//       <br />
//       <br />
//       <div>
//         <p>Search</p>
//         <p>
//           Searching for: <span id="search-term"></span>
//         </p>
//         <input style={{ border: "1px solid black" }} onChange={onChange} />
//         <button onClick={onClick}>Reset Search</button>
//       </div>
//       <br />
//       <br />
//       <table>
//         <thead>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>City</th>
//           <th>Degree</th>
//           <th>Specialties</th>
//           <th>Years of Experience</th>
//           <th>Phone Number</th>
//         </thead>
//         <tbody>
//           {filteredAdvocates.map((advocate) => {
//             return (
//               <tr>
//                 <td>{advocate.firstName}</td>
//                 <td>{advocate.lastName}</td>
//                 <td>{advocate.city}</td>
//                 <td>{advocate.degree}</td>
//                 <td>
//                   {advocate.specialties.map((s) => (
//                     <div>{s}</div>
//                   ))}
//                 </td>
//                 <td>{advocate.yearsOfExperience}</td>
//                 <td>{advocate.phoneNumber}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </main>
//   )
// }
