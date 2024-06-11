import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Base URL of the API.
 */
const apiUrl = 'https://themovieapp-d539f95ea100.herokuapp.com';

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Service to handle errors and extract response data
export class ErrorAndResponseService {
  /**
   * Constructs a new ErrorAndResponseService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(protected http: HttpClient) {}

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns An observable with an error message.
   */
  protected handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      const { status, error: innerError, message, statusText } = error;
      // check if error is object
      const finalError =
        typeof innerError === 'object'
          ? JSON.stringify(innerError)
          : innerError;
      // Server-side error
      console.error(
        `Error Status code ${status} [${statusText || 'unkown'}], ` +
          `Error body is: ${finalError}. ${message}`
      );
    }
    // Return an observable with an error message
    const err = new Error('Something went wrong, please try again later.');
    throwError(() => err);
  }
  protected extractResponseData(res: any): any {
    return res || {}; // Return the response body or an empty object
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the user registration endpoint.
export class UserRegistrationService extends ErrorAndResponseService {
  /**
   *Constructs UserRegistrationService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http); // Call the constructor of the ErrorAndResponseService class
  }

  /**
   * Registers a new user.
   * @param userDetails - The details of the user to be registered.
   * @returns An observable with the registration response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    // Make a POST request to the user registration endpoint
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError), map(this.extractResponseData));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the user login endpoint
export class UserLoginService extends ErrorAndResponseService {
  /**
   *Constructs UserLoginService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Logs in a user.
   * @param userDetails - The user credentials.
   * @returns An observable with the login response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Get All Movies endpoint
export class AllMoviesService extends ErrorAndResponseService {
  /**
   *Constructs AllMoviesService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves all movies.
   * @returns An observable with all movies.
   */
  public getAllMovies(): Observable<any> {
    // Check if localStorage is available before accessing it
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');

      return this.http
        .get(apiUrl + '/movies', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    } else {
      console.error('localStorage is not available in this environment.');
      return throwError(
        () => new Error('localStorage is not available in this environment.')
      );
    }
  }
}

// Making the api call for the Get One Movie endpoint.
/**
 * Retrieves details of a specific movie.
 * @param title - The title of the movie.
 * @returns An observable with the movie details.
 */
export class OneMovieService extends ErrorAndResponseService {
  /**
   *Constructs OneMovieService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// Making the api call for the Get Director endpoint.

export class DirectorService extends ErrorAndResponseService {
  /**
   *Constructs DirectorService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves details of a specific director.
   * @param name - The name of the director.
   * @returns An observable with the director details.
   */
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/director/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Movie by Directors name
export class MoviesByDirectorService extends ErrorAndResponseService {
  /**
   *Constructs MoviesByDirectorService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  public getMoviesByDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Get Genre endpoint.
export class MoviesByGenreService extends ErrorAndResponseService {
  /**
   *Constructs MoviesByGenreService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves details of a specific genre.
   * @param genre - The name of the genre.
   * @returns An observable with the genre details.
   */
  public getMoviesByGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/genre/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Get User endpoint.
export class UserListService extends ErrorAndResponseService {
  /**
   *Constructs UserListService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves user details.
   * @returns An observable with the user details.
   */
  public getUserList(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Add a Movie to Favourite Movies endpoint.
export class AddFavoriteMovieService extends ErrorAndResponseService {
  /**
   *Constructs AddFavoriteMovieService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Adds a movie to a user's favorite movies.
   * @param id - The name of the movie to be added.
   * @param Username - The username of the user.
   * @returns An observable with the response after adding the movie to favorites.
   */
  public addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const { Username } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .post(apiUrl + '/users/' + Username + '/movies/' + id, null, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for Updating User endpoint.
export class UpdateInfoUserService extends ErrorAndResponseService {
  /**
   *Constructs UpdateInfoUserService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Updates user details.
   * @param userData - The updated user object.
   * @returns An observable with the updated user details.
   */
  public updateInfoUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const { Username } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .put(apiUrl + '/users/' + Username, userData, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Delete User endpoint
export class DeleteUserService extends ErrorAndResponseService {
  /**
   *Constructs DeleteUserService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Deletes a user.
   * @returns An observable with the response after deleting the user.
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const { _id } = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .delete(apiUrl + '/users/' + _id, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Delete a Movie to Favourite Movies endpoint
export class RemoveFavoriteMovieService extends ErrorAndResponseService {
  /**
   *Constructs RemoveFavoriteMovieService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Deletes a movie from a user's favorite movies.
   * @param id - The name of the movie to be removed.
   * @param Username - The username of the user.
   * @returns An observable with the response after deleting the movie from favorites.
   */
  public removeMovieFromFavorites(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const { Username } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .delete(apiUrl + '/users/' + Username + '/movies/' + id, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
