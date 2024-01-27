import { AxiosError } from "axios";
import "@tanstack/react-query";

interface Array<T> {
  myMap<U>(callback: (x: T) => U): T[];
}

interface String {
  sayMyName(): string;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<Record<string, string>>;
  }
}
