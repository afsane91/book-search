export type Book = {
  key: string;
  title: string;
};

export type OLDoc = {
  key: string;                 
  title: string;
  author_name?: string[];      
  first_publish_year?: number; 
  cover_i?: number;            
   coverUrl?: string | null;
};

export type OLSearchResponse = {
  numFound: number;
  start: number;
  docs: OLDoc[];
};