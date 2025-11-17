'use client';

import { useContext } from "react";
import {VariantContext} from "@/app/providers/VariantProvider";

export default function AuthHeading() {
  const { variant } = useContext(VariantContext);
  return (
    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      {variant === 'LOGIN' ? 'Sign in to your account' : 'Create a new account'}
    </h2>
  )
}