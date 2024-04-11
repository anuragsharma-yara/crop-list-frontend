'use client'
import { useSession } from "next-auth/react";
import React from "react";

const Member = () => {
    const {data: session} = useSession();

    if(!session) 
        return <div> No Session</div>;

    return (
        <div> 
            <h1> Member Server Session</h1> 
        </div>
    )
}

export default Member;