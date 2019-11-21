import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Book } from '../models/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  // Émettre le Sujet ......
  emitBooks() {
    this.booksSubject.next(this.books);
  }

  // Méthode pour Sauvegarder des livres ......
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  // Méthode pour Récupérer des livres ......
  getBooks() {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  // Méthode Récupérer un seul livre ......
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // Méthode Création d'un nouveaux livre ......
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // Méthode Supprimer un livre ......
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookElement) => {
        if (bookElement === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
