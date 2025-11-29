'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { VariantStateContext } from "@/app/context/VariantContext";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProgressCircle from "@/app/components/progress/ProgressCircle";
import { toaster } from "@/app/context/ToasterContext";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { variant, setVariant } = useContext(VariantStateContext);
  
  useEffect(() => {
    if(session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
    if(variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant, setVariant, setIsLoading]);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if(variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then(() => {
          setVariant('LOGIN');
          setTimeout(() => {
            toaster.create({
              title: 'Account created successfully!',
              type: 'success',
            })
          }, 400)
        })
        .catch(() => {
          setTimeout(() => {
            toaster.create({
              title: 'Something went wrong!',
              type: 'error',
            })
          }, 400)
        })
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }

    if(variant === 'LOGIN') {
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
        .then((callback) => {
          if(callback?.error) {
            setTimeout(() => {
              toaster.create({
                title: 'Invalid Credentials!',
                type: 'error',
              })
            }, 400)
          }
          if(callback?.ok) {
            setTimeout(() => {
              toaster.create({
                title: 'Logged in successfully!',
                type: 'success',
              })
            }, 400)
          }
        })
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if(callback?.error) {
          setTimeout(() => {
            toaster.create({
              title: 'Invalid Credentials!',
              type: 'error',
            })
          }, 400)
        }
        if(callback?.ok) {
          setTimeout(() => {
            toaster.create({
              title: 'Logged in successfully!',
              type: 'success',
            })
          }, 400)
        }
      })
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <ProgressCircle />
        </div>
      )}
      <div
        className="
          mt-8
          sm:mx-auto
          sm:w-full
          sm:max-w-md
        "
      >
        <div
          className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "
        >
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {variant === 'REGISTER' && (
              <Input
                id="name"
                label="Name"
                placeholder="Enter your name..."
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="Email address"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button
                disabled={isLoading}
                fullWidth
                type="submit"
              >
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction('github')}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
            </div>
          </div>
          <div
            className="
              flex
              gap-2
              justify-center
              text-sm
              mt-6
              px-2
              text-gray-500
            "
          >
            <div>
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <div
              onClick={toggleVariant}
              className="underline cursor-pointer"
            >
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthForm;