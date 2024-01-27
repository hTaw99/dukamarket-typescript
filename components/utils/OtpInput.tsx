import React, { useMemo } from "react";

const RE_DIGIT = new RegExp(/^\d+$/);

const OtpInput = ({
  valueLength,
  onChange,
  value,
}: {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
}) => {
  const valueItems = useMemo(() => {
    const valueArray = value?.split("");
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray?.[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    console.log({ target });
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const isTargetValueDigit = RE_DIGIT.test(e.target.value);

    if (!inputOnChange && e.target.value !== "") {
      return;
    }

    e.target.value = isTargetValueDigit ? e.target.value : " ";

    const targetValueLength = e.target.value.length;
    if (targetValueLength === 1) {
      const newValue =
        value?.substring(0, idx) + e.target.value + value?.substring(idx + 1);
      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(e.target);
    }
    // else if (targetValueLength === valueLength) {
    //   onChange(targetValue);
    //   target.blur();
    // }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    target.setSelectionRange(0, target.value.length);

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }
    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    // target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="flex justify-center gap-4">
      {valueItems?.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="relative block text-center w-full appearance-none rounded-md  border 
          outline-none border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500  sm:text-sm"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};

export default OtpInput;
