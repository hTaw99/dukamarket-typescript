"use client";

const error = ({ error }: {error: Error}) => {
  return (
    <div>
      <h1 className="font-semibold">Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default error;
