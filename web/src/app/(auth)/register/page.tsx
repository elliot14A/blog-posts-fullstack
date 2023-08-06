"use client";

import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import Button from "@/components/ui/Button";
import {
  RegisterCredentials,
  registerCredentialsSchema,
} from "@/lib/validators";
import { toast } from "react-hot-toast";
import { getUser } from "@/lib/getUser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface PageProps { }

const Page: FC<PageProps> = () => {
  const router = useRouter();
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    getUser({
      refreshToken: refreshToken || "",
      accessToken: accessToken || "",
    }).then((user) => {
      if (user) {
        if (user.newAccessToken) {
          Cookies.set("accessToken", user.newAccessToken);
        }
        router.replace("/dashboard");
      }
    });
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerCredentialsSchema),
  });

  const registerUser: SubmitHandler<RegisterCredentials> = async (data) => {
    setIsLoading(true);
    try {
      const { email, password, name } = registerCredentialsSchema.parse(data);
      await axios.post("/api/register", { email, password, name });
      toast.success("registered successfully");
      reset();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err instanceof ZodError) {
        toast.error(err.message);
        return;
      }
      if (err instanceof AxiosError) {
        if (err.response?.status === 400 || err.response?.status === 409) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("Something went wrong");
      reset();
    }
  };
  return (
    <div className="container flex justify-center items-center">
      <form
        className="w-full flex flex-col max-w-sm mx-auto mt-8 "
        onSubmit={handleSubmit(registerUser)}
      >
        <div className="mb-8 font-bold text-center text-3xl ">Register</div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Name
          </label>
          <input
            type="text"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button
            isLoading={isLoading}
            className="w-full text-md"
            type="submit"
          >
            Register
          </Button>
        </div>
        <div className="mt-4 flex justify-between">
          <a className="text-black underline" href="/login">
            login here
          </a>
          <p>deployed to aws</p>
        </div>
      </form>
    </div>
  );
};

export default Page;
