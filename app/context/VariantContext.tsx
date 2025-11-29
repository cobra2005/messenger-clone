'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type Variant = 'LOGIN' | 'REGISTER';
type VariantStateContextType = {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
};
type VariantContextProps = {
  children: ReactNode;
}

export const VariantStateContext = createContext<VariantStateContextType>({
  variant: 'LOGIN',
  setVariant: () => {}
});

export default function VariantContext({ children }: VariantContextProps) {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  return (
    <VariantStateContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantStateContext.Provider>
  )
}