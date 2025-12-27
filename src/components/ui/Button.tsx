"use client";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`
        rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white
        hover:bg-blue-700 active:scale-[.98]
        focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700
        transition
        ${className}
      `}
    />
  );
}