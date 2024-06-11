import { Component, OnInit } from '@angular/core';
import {
  AddFavoriteMovieService,
  AllMoviesService,
  UserListService,
  RemoveFavoriteMovieService,
} from '../fetch-api-data.service';

import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to store all movies.
   */
  movies: any[] = [];

  /**
   * Array to store all users.
   */
  users: any[] = [];

  /**
   * Array to store favorite movies.
   */
  FavoriteMovies: any[] = [];

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

  /**
   *
   * @param fetchMovies - Service for fetching movies from the API.
   * @param addFavorite - Service for adding a favorite movie to the API.
   * @param removeFavorite - Service for removing a favorite movie from the API.
   * @param fetchUsers - Service for fetching users from the API.
   * @param snackBar - Angular Material's MatSnackBar service.
   * @param dialog - Reference to the dialog opened.
   */
  constructor(
    public fetchMovies: AllMoviesService,
    public addFavorite: AddFavoriteMovieService,
    public removeFavorite: RemoveFavoriteMovieService,
    public fetchUsers: UserListService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /**
   * The lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsers();
  }
  /**
   * Fetches all movies.
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog to display movie synopsis about movie selected.
   * @param movie - The movie object.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie },
      width: '600px',
    });
  }

  /**
   * Opens a dialog to display director information about movie selected.
   * @param movie - The movie object.
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { movie },
      width: '600px',
    });
  }

  /**
   * Opens a dialog to display movie genre information about movie selected.
   * @param movie - The movie object.
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: { movie },
      width: '600px',
    });
  }

  /**
   * Fetches all users.
   */
  getUsers(): void {
    const { Username } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    this.fetchUsers.getUserList().subscribe((resp: any) => {
      this.users = resp;
      const currentUser = this.users.filter(
        (user) => user.Username === Username
      );

      this.FavoriteMovies = currentUser[0].FavoriteMovies;
    });
  }

  /**
   * Checks if a movie is marked as favorite.
   * @param movie - The movie object.
   * @returns True if the movie is favorite, otherwise false.
   */
  isFavorite(movie: any): boolean {
    const FavoriteMovies = this.FavoriteMovies.filter((id) => id === movie._id);
    return FavoriteMovies.length ? true : false;
  }

  /**
   * Adds a movie title to favorites.
   * @param movie - The movie object.
   */
  addTitleToFavorites(movie: any): void {
    this.addFavorite.addFavoriteMovie(movie._id).subscribe((resp: any) => {
      console.log(resp);
      // update FavoriteMovies in the local storage
      const user = JSON.parse(localStorage.getItem('currentUser') || '');
      user.FavoriteMovies.push(movie._id);
      localStorage.setItem('currentUser', JSON.stringify(user));

      // update the favorites array to reflect the favorite state without reloading the page
      this.FavoriteMovies.push(movie._id);
      this.snackBar.open('Movie added', 'Success', {
        duration: 2000,
      });
    });
  }

  /**
   * Removes a movie title from favorites.
   * @param movie - The movie object.
   */
  removeTitleFromFavorites(movie: any): void {
    this.removeFavorite
      .removeMovieFromFavorites(movie._id)
      .subscribe((resp: any) => {
        console.log(resp);

        // update FavoriteMovies in the local storage
        const user = JSON.parse(localStorage.getItem('currentUser') || '');
        user.FavoriteMovies = user.FavoriteMovies.filter(
          (id: string) => id !== movie._id
        );
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Update the favorites array to reflect the favorite state without reloading the page
        this.FavoriteMovies = this.FavoriteMovies.filter(
          (id: string) => id !== movie._id
        );
        this.snackBar.open('Movie removed', 'Success', {
          duration: 2000,
        });
      });
  }
}
