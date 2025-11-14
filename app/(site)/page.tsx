'use client';

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type Variant = 'LOGIN' | 'REGISTER';
type VariantContext = {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
}

export const VariantContext = createContext<VariantContext>({
  variant: 'LOGIN',
  setVariant: () => {},
});

export default function Home() {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  return (
    <VariantContext.Provider value={{
      variant,
      setVariant
    }}>
      <div
        className="
          flex
          min-h-full
          flex-col
          justify-center
          py-12
          sm:px-6
          lg:px-8
          bg-gray-100
        "
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image 
            alt="Logo"
            height="48"
            width="48"
            className="mx-auto w-auto"
            src="/images/logo.png"
          />
          <h2
            className="
              mt-6
              text-center
              text-3xl
              font-bold
              tracking-tight
              text-gray-900
            "
          >
            {variant === 'LOGIN' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <AuthForm />
      </div>
    </VariantContext.Provider>
  )
}