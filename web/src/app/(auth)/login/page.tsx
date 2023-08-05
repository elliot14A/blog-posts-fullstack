"use client";

import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodError } from "zod";
import Button from "@/components/ui/Button";
import { LoginCredentials, loginCredentialsSchema } from "@/lib/validators";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface PageProps { }

const Page: FC<PageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
  });

  const login: SubmitHandler<LoginCredentials> = async (data) => {
    setIsLoading(true);
    try {
      const { email, password } = loginCredentialsSchema.parse(data);
      await axios.post("/api/login", { email, password });
      toast.success("logged successfully");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof ZodError) {
        toast.error(err.message);
        return;
      }
      if (err instanceof AxiosError) {
        if (err.response?.status === 400 || err.response?.status === 401) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("Something went wrong");
      return;
    }
  };
  return (
    <form
      className="w-full max-w-sm mx-auto mt-8"
      onSubmit={handleSubmit(login)}
    >
      <div className="mb-8 font-bold text-center text-3xl ">Login</div>
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
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
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
        <Button isLoading={isLoading} className="w-full" type="submit">
          Sign In
        </Button>
      </div>
      <div className="mt-4 flex justify-between">
        <a className="text-black underline" href="/register">
          register here
        </a>
        <p>deployed to aws</p>
      </div>
    </form>
  );
};

export default Page;
