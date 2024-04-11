"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


const EditCropList = () => {
    const { data: session } = useSession( {
        required: true, 
        onUnauthenticated() {
            console.log("Redicated by EditCropList");
            // redirect('/api/auth/signin?callbackUrl=/ClientEditCropList')
        }
    });

    if(!session) 
        return <h1>User is not signed in.</h1>

    if(!session.user?.roles.includes("Task.Write")) {
        return (
            <div>
                <h1> Write permission not granted for user.</h1>
            </div>
        )
    };

    return (
        <div> 
            <h1> EditCropList Client Server Session</h1> 
        </div>
    )
}

export default EditCropList;