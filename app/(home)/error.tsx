"use client";

const error = ({ error }: { error: Error }) => {
  return (
    <div className="bg-white h-screen flex rounded-md py-12 flex-col justify-start gap-8 items-center 2xl:w-[1570px] w-11/12 m-auto">
      <h1 className="font-semibold">Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default error;
