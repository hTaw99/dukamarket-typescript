"use client";

import { useOtpVerification } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/utils/OtpInput";
import { type SyntheticEvent, useState, useCallback } from "react";
import { FaCircle } from "react-icons/fa";

const OtpVerification = () => {
  const [otp, setOtp] = useState<string>("");

  const onChange = useCallback((value: string) => {
    setOtp(value);
  }, []);

  const { mutate: verifyOtp, isPending, error } = useOtpVerification();

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (otp) {
      verifyOtp({ otp });
    }
  };

  return (
    <div className="container h-screen ">
      <div className=" lg:p-16 flex justify-center items-center   rounded-md">
        {/* -------------------------------------------------- */}

        <div className="bg-white p-8 py-10 rounded-md md:w-4/6 lg:w-1/3">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">OTP Verification</h1>
            <p className="text-sm">
              We have sent the otp number to your email address.
            </p>
          </div>

          <form
            className="space-y-6 w-full"
            // action="#"
            // method="POST"
            onSubmit={submitHandler}
          >
            <OtpInput value={otp} onChange={onChange} valueLength={4} />
            {error && (
              <div className="text-red-500 text-center">
                {error?.response?.data?.message}
              </div>
            )}

            <div>
              {isPending ? (
                <div className="flex justify-center items-center w-full">
                  <FaCircle size={10} className=" animate-bounced" />
                </div>
              ) : (
                <Button type="submit" size={"lg"} className="w-full">
                  Enter
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
