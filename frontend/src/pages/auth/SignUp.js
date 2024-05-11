
import React from 'react';
import { Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";


export default function SignUp() {

    return (
        <header>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                return (
                <Navigate to="/admin" />
                );
            </SignedIn>
        </header>
    );
}