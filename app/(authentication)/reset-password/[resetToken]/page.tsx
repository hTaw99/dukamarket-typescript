"use client";

import { useResetPassword } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { ResetPasswordFormValues } from "@/types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";

const ResetPassword = ({ params }: { params: { resetToken: string } }) => {
  const { resetToken } = params;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    resetPassword({ password: data.password, resetToken });
  };

  return (
    <div className="container h-screen ">
      <div className=" lg:p-16 flex justify-center items-center   rounded-md">
        {/* -------------------------------------------------- */}

        <div className="bg-white p-8 py-10 md:w-4/6 lg:w-1/3 rounded-md">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Set new password</h1>
            <p className="text-sm">Add your new password</p>
          </div>

          <form
            className="space-y-6 w-full"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md flex flex-col gap-4 ">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mb-2 relative block w-full outline-none appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500  sm:text-sm"
                  placeholder="Type your new password"
                  {...register("password", {
                    required: "Please provide your new password",
                  })}
                />
                <span className="text-center text-red-500">
                  {errors.password?.message}
                </span>
              </div>
            </div>
            <div>
              {isPending ? (
                <div className="flex justify-center items-center w-full">
                  <FaCircle size={10} className=" animate-bounced" />
                </div>
              ) : (
                <Button type="submit" size={"lg"} className="w-full">
                  Reset
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
