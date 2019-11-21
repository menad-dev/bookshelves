import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styles: []
})
export class SingleBookComponent implements OnInit {
  book: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.book = new Book('', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }
}
