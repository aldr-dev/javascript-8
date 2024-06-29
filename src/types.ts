export interface QuoteForm {
  author: string,
  category: string,
  text: string,
}

export interface Posts {
  id: string;
  author: string,
  category: string,
  text: string,
}

export interface Categories {
  title: string;
  id: string
}