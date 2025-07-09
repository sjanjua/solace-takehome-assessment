import React from 'react'
import Logo from '../icon/Logo'
import { Button } from '../ui/button'
import { Bell, Mail, User } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full bg-primary p-4 pl-8 pr-8 flex flex-row items-center justify-between'>
      <Logo />
      <div className='flex flex-row gap-2'>
        <Button variant='secondary' size='icon' className='rounded-full bg-primary_focused'>
          <Bell color='white' />
        </Button>
        <Button variant='secondary' size='icon' className='rounded-full bg-primary_focused'>
          <Mail color='white' />
        </Button>
        <Button variant='secondary' size='icon' className='rounded-full bg-primary_focused'>
          <User color='white' />
        </Button>
      </div>
    </div>
  )
}

export default Navbar