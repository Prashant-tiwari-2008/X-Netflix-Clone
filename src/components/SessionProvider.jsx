"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
             <RecoilRoot>{children}</RecoilRoot>
        </SessionProvider>
    )
}

export default Provider