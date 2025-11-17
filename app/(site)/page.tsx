import Image from "next/image";
import AuthForm from "./components/AuthForm";
import VariantProvider from "@/app/providers/VariantProvider";
import AuthHeading from "@/app/(site)/components/AuthHeading";

export default function Home() {
  return (
    <VariantProvider>
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
          <AuthHeading />
        </div>
        <AuthForm />
      </div>
    </VariantProvider>
  )
}