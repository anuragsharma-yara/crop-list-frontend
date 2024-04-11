import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'

const ReadCropList = async () => {
    const session = await getServerSession(options);

    if(!session) 
      return <h1>User is not signed in.</h1>

    if(!session.user?.roles.includes("Task.Read")) {
        return (
            <div>
                <h1> Read permission not granted for user.</h1>
            </div>
        )
    }

  return (
    <div>
        <h1> Crop List </h1>
        <div> {session.user?.email} {"\n"} {session.user?.name} </div>
    </div>
  )
}

export default ReadCropList;
