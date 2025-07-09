'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Advocate } from '@/types'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from '@tanstack/react-table'
import React, { ChangeEvent, useState } from 'react'
import { HttpClient } from '../_util/http-client';

interface AdvocatesTableProps {

  advocates: Advocate[]

}

export interface Form {
  name: string,
  degree: string,
  city: string,
  specialty: string,
  phone: string,
  yearsOfExperience: number,
}

const defaultFormState: Form = {
  name: '',
  degree: '',
  city: '',
  specialty: '',
  phone: '',
  yearsOfExperience: 5,
}

const AdvocatesTable = (props: AdvocatesTableProps) => {

  const { advocates } = props

  const client = new HttpClient()

  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>(advocates)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // For form validation we could use something like react-hook-form
  // to simplify things, and also ensure we are enforcing client-side
  // validation
  const [form, setForm] = useState<Form>(defaultFormState)

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
      header: 'Phone',
    }
  ]

  const table = useReactTable({
    data: filteredAdvocates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: filteredAdvocates.length,
    onPaginationChange: setPagination,
    state: {
      pagination,
    }
  })

  const onTextFormFieldChange = (event: ChangeEvent<HTMLInputElement>, key: keyof Form) => {

    const value = event.target.value

    setForm((prev) => ({...prev, [key]: value}))

  }

  const searchAdvocates = async () => {

    try {

      const result = await client.getAdvocates({...form})

      setFilteredAdvocates(result ?? [])

    }
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error('An error occurred while searching for advocates', error.message)
      }
    }

  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4'>
        <Input placeholder='Name' className='max-w-[200px]' value={form.name} onChange={(ev) => onTextFormFieldChange(ev, 'name')}/>
        <Input placeholder='Degree' className='max-w-[200px]' value={form.degree} onChange={(ev) => onTextFormFieldChange(ev, 'degree')}/>
        <Input placeholder='City' className='max-w-[200px]' value={form.city} onChange={(ev) => onTextFormFieldChange(ev, 'city')}/>
        {/* Ideally the specialty would be a multi-select dropdown option */}
        <Input placeholder='Specialty' className='max-w-[200px]' value={form.specialty} onChange={(ev) => onTextFormFieldChange(ev, 'specialty')}/>
        <Input placeholder='Phone' className='max-w-[200px]' value={form.phone} onChange={(ev) => onTextFormFieldChange(ev, 'phone')}/>
        <div className='flex flex-col w-[250px] items-center gap-2'>
          <span>{form.yearsOfExperience} years of experience</span>
          <Slider 
            className='w-100%' 
            defaultValue={[form.yearsOfExperience]}
            value={[form.yearsOfExperience]}
            max={100}
            onValueChange={([value]) => setForm((prev) => ({...prev, yearsOfExperience: value}))}
          />
        </div>
        <Button className='bg-primary_focused w-[200px]' onClick={searchAdvocates}>Search</Button>
      </div>
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

                          return <TableCell key={cell.id} className='min-w-[100px] align-top'>{`${firstName} ${lastName}, ${degree}`}</TableCell>
                        }

                        if (cell.id.includes('specialties')) {
                          return <TableCell key={cell.id} className='align-top'>
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
    </div>
  )
}

export default AdvocatesTable