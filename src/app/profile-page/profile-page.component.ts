import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import {
  AllMoviesService,
  UserListService,
  AddFavoriteMovieService,
  RemoveFavoriteMovieService,
} from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };

  movies: any[] = [];
  FavoriteMovies: any[] = [];
  Username: string = '';

  /**
   * Creates an instance of ProfilePageComponent.
   * @param snackBar - Angular Material snackbar service.
   * @param dialog - Angular Material dialog service.
   * @param fetchMovies - Service for fetching movies from the API.
   * @param fetchUsers - Service for fetching users from the API.
   * @param addFavorite - Service for adding a favorite movie to the API.
   * @param removeFavorite - Service for removing a favorite movie from the API.
   */
  constructor(
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    public fetchMovies: AllMoviesService,
    public fetchUsers: UserListService,
    public addFavorite: AddFavoriteMovieService,
    public removeFavorite: RemoveFavoriteMovieService
  ) {}

  /**
   * The lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {
    this.getFavMovies();
  }

  /**
   * Opens openSynopsisDialog to display movie synopsis information.
   * @param movie - The movie object.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie },
      width: '600px',
    });
  }

  /**
   * Opens openDirectorDialog to display director information.
   * @param movie - The movie object.
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '600px',
    });
  }

  /**
   * Fetches all movies and filters the favorites
   */
  getFavMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      const { Username, FavoriteMovies } = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      this.Username = Username;
      this.FavoriteMovies = this.movies.filter((movie) =>
        FavoriteMovies.includes(movie._id)
      );
      return this.movies;
    });
  }

  /**
   * Function to determine if a movie is in the favorite list
   * @param movie The movie object to check
   * @returns A boolean indicating whether the movie is a favorite or a message if the favorites list is empty
   */
  isFavorite(movie: any): boolean | string {
    // Filter through the favorite movies array to check if the given movie is present
    const FavoriteMovies = this.FavoriteMovies.filter(
      (id: string) => id !== movie._id
    );
    // Check if the filtered array has any elements
    if (FavoriteMovies.length) {
      // If the filtered array is not empty, the movie is a favorite, so return true
      return true;
    } else {
      // If the filtered array is empty, there are no favorite movies, so return a message
      return "Hmm, you don't have any favorite movies. Please add some!";
    }
  }

  /**
   * Removes a movie title from user's favorite list.
   * Updates the local storage and favorites array.
   * @param movie The movie object to be removed from favorites.
   */
  removeTitleFromFavorites(movie: any): void {
    this.removeFavorite.removeMovieFromFavorites(movie._id).subscribe({
      next: (resp: any) => {
        console.log(resp);

        // Update FavoriteMovies in the local storage
        const user = JSON.parse(localStorage.getItem('currentUser') || '');
        user.FavoriteMovies = user.FavoriteMovies.filter(
          (id: string) => id !== movie._id
        );
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Update the favorites array to reflect the favorite state without reloading the page
        this.FavoriteMovies = this.FavoriteMovies.filter(
          (id: string) => id !== movie._id
        );
        this.snackBar.open('Movie has been removed', 'Success', {
          duration: 2000,
        });
      },
      error: (result) => {
        this.snackBar.open(result, 'Cannot remove movie', {
          duration: 9000,
        });
      },
    });
  }
}
