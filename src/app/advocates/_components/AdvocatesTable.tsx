'use client';

import { Button } from '@/components/ui/button';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Advocate } from '@/types'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from '@tanstack/react-table'
import React, { useState } from 'react'

interface AdvocatesTableProps {

  advocates: Advocate[]

}

const AdvocatesTable = (props: AdvocatesTableProps) => {

  const { advocates } = props

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns: ColumnDef<Advocate>[] = [
    {
      accessorKey: 'advocate',
      header: 'Advocate',
    },
    {
      accessorKey: 'city',
      header: 'City',
    },   
    {
      accessorKey: 'specialties',
      header: 'Specialties',
    },
    {
      accessorKey: 'yearsOfExperience',
      header: 'Years of Experience',
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
    }
  ]

  const table = useReactTable({
    data: advocates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: advocates.length,
    onPaginationChange: setPagination,
    state: {
      pagination,
    }
  })

  return (
    <div className='border border-primary rounded-lg p-4'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-lg'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {
            table.getRowModel().rows?.length 
            ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {

                      const { firstName, lastName, degree, specialties } = cell.row.original

                      if (cell.id.includes('advocate')) {

                        return <TableCell className='min-w-[100px] align-top'>{`${firstName} ${lastName}, ${degree}`}</TableCell>
                      }

                      if (cell.id.includes('specialties')) {
                        return <TableCell className='align-top'>
                          <ul>
                          {
                            (specialties as string[]).map((specialty, index) => {
                              return <li key={index}> - {specialty}</li>
                            })
                          }
                        </ul>
                        </TableCell>
                      }

                      return <TableCell key={cell.id} className='align-top'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    })}
                  </TableRow>
                ))
              ) 
            : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )
          }
          {/* {
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
          } */}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default AdvocatesTable