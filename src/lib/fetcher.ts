import type { OLSearchResponse } from "@/types"; 

export async function fetchBooks(q: string, page: number): Promise<OLSearchResponse> {
  const url = `/api/books?q=${encodeURIComponent(q)}&page=${page}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  // اضافه کردن لینک عکس به هر کتاب
  const booksWithCovers = data.docs.map((book: { cover_i: any; }) => ({
    ...book,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : null,
  }));

  return {
    ...data,
    docs: booksWithCovers,
  };
}