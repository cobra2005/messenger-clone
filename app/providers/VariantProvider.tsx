'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type Variant = 'LOGIN' | 'REGISTER';
type VariantContext = {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
};
type VariantProviderProps = {
  children: ReactNode;
}

export const VariantContext = createContext<VariantContext>({
  variant: 'LOGIN',
  setVariant: () => {}
});

export default function VariantProvider({ children }: VariantProviderProps) {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantContext.Provider>
  )
}