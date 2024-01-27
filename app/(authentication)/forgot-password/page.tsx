"use client";

import { useForgotPassword } from "@/apis/auth";
import { FaCircle } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
// import EmailForgotPassword from "@/utils/EmailForgotPassword";
// import { render } from "@react-email/components";
import { ForgotPasswordFormValues } from "@/types/forms";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const { mutate: forgotPassword, isPending, error } = useForgotPassword();
  console.log(error);

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    // const emailHtml = render(<EmailForgotPassword />);
    forgotPassword({
      email: data.email,
      // emailToSend: emailHtml
    });
  };

  return (
    <div className="container h-screen ">
      <div className=" xl:p-16 flex justify-center items-center   rounded-md">
        {/* <EmailForgotPassword /> */}
        {/* -------------------------------------------------- */}

        <div className="bg-white p-8 py-10 rounded-md">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Password assistance</h1>
            <p className="text-sm">
              Enter the email address associated with your Dukamarket account.
            </p>
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
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  className="mb-2 relative block w-full appearance-none rounded-md  border 
                   outline-none border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500  sm:text-sm"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Please provide your email",
                  })}
                />

                <span className="text-center text-red-500">
                  {error?.response?.data?.message}
                </span>

                <span className="text-xs text-red-500">
                  {errors.email?.message}
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
                  Continue
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
