"use client";

import { FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (q: string) => void;
  placeholder?: string;
  loading?: boolean;
};

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  loading = false,
}: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        className="
    flex-1 rounded-xl border border-slate-200 bg-white
    px-4 py-3 text-slate-900 caret-slate-900
    placeholder:text-slate-400
    focus:border-slate-400 focus:ring-2 focus:ring-slate-200
  "
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
