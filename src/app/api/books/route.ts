// app/api/books/route.ts
import { NextResponse } from "next/server";

const BASE_URL = "https://openlibrary.org/search.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const page = searchParams.get("page") ?? "1";

  const url = `${BASE_URL}?q=${encodeURIComponent(q)}&page=${page}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: res.status }
    );
  }

  const data = await res.json();

  const docs = (data.docs ?? []).map((b: any) => ({
    ...b,
    coverUrl: b.cover_i
      ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
      : null,
  }));

  return NextResponse.json({ ...data, docs });
}