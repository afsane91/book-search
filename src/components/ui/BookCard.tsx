"use client";

type Props = {
  title: string;
  authors?: string[];
  coverId?: number;
  year?: number;
};

export default function BookCard({ title, authors, coverId, year }: Props) {
  const src = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/80x120?text=No+Cover";

  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <img src={src} alt={title} className="h-28 w-20 rounded object-cover" />
      <div className="min-w-0">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-600">
          {authors?.join(", ") || "Unknown author"}
          {year ? ` • ${year}` : ""}
        </p>
      </div>
    </div>
  );
}