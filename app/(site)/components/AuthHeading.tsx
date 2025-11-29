'use client';

import { useContext } from "react";
import { VariantStateContext } from "@/app/context/VariantContext";

export default function AuthHeading() {
  const { variant } = useContext(VariantStateContext);
  return (
    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      {variant === 'LOGIN' ? 'Sign in to your account' : 'Create a new account'}
    </h2>
  )
}