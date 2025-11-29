'use client';

import Button from "@/app/components/Button";
import { signOut } from "next-auth/react";

const FunctionComponent = () => {
  return (
    <Button
      onClick={() => {
        signOut()
      }}
    >
      Logout
    </Button>
  )
}

export default FunctionComponent;