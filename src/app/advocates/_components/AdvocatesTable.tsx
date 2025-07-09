import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { AdvocatesSchema } from '@/types'
import React from 'react'

interface AdvocatesTableProps {

  advocates: AdvocatesSchema[]

}

const AdvocatesTable = (props: AdvocatesTableProps) => {

  const { advocates } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-lg'>Advocate</TableHead>
          <TableHead className='text-lg'>City</TableHead>
          <TableHead className='text-lg'>Specialties</TableHead>
          <TableHead className='text-lg'>Years of Experience</TableHead>
          <TableHead className='text-lg'>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          advocates.map((advocate, index) => {
            return <TableRow key={index}>
              <TableCell className='min-w-[100px] align-top'>{`${advocate.firstName} ${advocate.lastName}, ${advocate.degree}`}</TableCell>
              <TableCell className='align-top'>{advocate.city}</TableCell>
              <TableCell>
                <ul>
                  {
                    (advocate.specialties as string[]).map((specialty, index) => {
                      return <li key={index}> - {specialty}</li>
                    })
                  }
                </ul>
              </TableCell>
              <TableCell className='align-top'>{advocate.yearsOfExperience}</TableCell>
              <TableCell className='align-top'>{advocate.phoneNumber}</TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}

export default AdvocatesTable