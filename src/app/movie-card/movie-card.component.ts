import { Component, OnInit } from '@angular/core';
import { AddFavoriteMovieService, AllMoviesService, UserListService, RemoveFavoriteMovieService, } from '../fetch-api-data.service'

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  users: any[] = [];
  favorites: any[] = [];

  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;

  scroll(direction: number): void {
    const container = document.querySelector('.movie-grid');
    if (container) {
      const scrollAmount = direction * 300;
      container.scrollLeft += scrollAmount;

      this.updateArrowVisibility(container);
    }
  }
  updateArrowVisibility(container: any): void {
    // Show/hide left arrow
    this.showLeftArrow = container.scrollLeft > 0;

    // Show/hide right arrow
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    this.showRightArrow = container.scrollLeft < maxScrollLeft;
  }

  constructor(
    public fetchMovies: AllMoviesService,
    public addFavorite: AddFavoriteMovieService,
    public removeFavorite: RemoveFavoriteMovieService,
    public fetchUsers: UserListService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

ngOnInit(): void {
  this.getMovies();
  this.getUsers();
}

getMovies(): void {
  this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getUsers(): void {
    const { UserName } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    this.fetchUsers.getUserList().subscribe((resp: any) => {
      this.users = resp;
      const currentUser = this.users.filter(
        (user) => user.UserName === UserName
      );

      this.favorites = currentUser[0].FavoriteMovies;
    });
  }
  isFavorite(movie: any): boolean {
    const favorite = this.favorites.filter((title) => title === movie.Title);
    return favorite.length ? true : false;
  }

  addTitleToFavorites(movie: any): void {
    this.addFavorite.addFavoriteMovie(movie.Title).subscribe((resp: any) => {
      console.log(resp);
      // update FavoriteMovies in the local storage
      const user = JSON.parse(localStorage.getItem('currentUser') || '');
      user.FavoriteMovies.push(movie.Title);
      localStorage.setItem('currentUser', JSON.stringify(user));

      // update the favorites array to reflect the favorite state without reloading the page
      this.favorites.push(movie.Title);
      this.snackBar.open('Movie added', 'Success', {
        duration: 2000,
      });
    });
  }

  removeTitleFromFavorites(movie: any): void {
    this.removeFavorite
      .removeMovieFromFavorites(movie.Title)
      .subscribe((resp: any) => {
        console.log(resp);

        // update FavoriteMovies in the local storage
        const user = JSON.parse(localStorage.getItem('currentUser') || '');
        user.FavoriteMovies = user.FavoriteMovies.filter(
          (title: string) => title !== movie.Title
        );
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Update the favorites array to reflect the favorite state without reloading the page
        this.favorites = this.favorites.filter(
          (title: string) => title !== movie.Title
        );
        this.snackBar.open('Movie removed', 'Success', {
          duration: 2000,
        });
      });
}
}