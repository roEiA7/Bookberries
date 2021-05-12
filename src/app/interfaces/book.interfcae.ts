import { Observable } from "rxjs";

export interface BooksList {
    totalItems: number;
    items: Book[];
}

export interface Book {
    id: string;
    volumeInfo: volumeInfo;
    existInWishlist$: Observable<boolean>;
}

interface volumeInfo {
    authors: string[];
    categories: string[];
    imageLinks: imageLinks;
    pageCount: number;
    publisher: string;
    publishedDate: string;
    description: string;
    subtitle: string;
    title: string;
}

interface imageLinks {
    smallThumnbail: string;
    thumbnail: string;
}