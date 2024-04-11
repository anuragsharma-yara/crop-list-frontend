'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="bg-gray-600 text-gray-100">
        <nav className='flex justify-between items-center py-2 px-10 w-full'>
            <div> My Site </div>
            <div className="flex gap-10">
                <Link href="/">Home</Link>
                <Link href="/EditCropList">Edit Crop</Link>
                <Link href="/ReadCropList">Read Crop</Link>
                <Link href="/Member">Member</Link>
                <Link href="/Public">Public</Link>
                {
                  session ? 
                      <Link href='/api/auth/signout'>SignOut</Link> :
                      <Link href='/api/auth/signin'>SignIn</Link>
                }
            </div>
        </nav>
    </header>
  )
}

export default Nav
