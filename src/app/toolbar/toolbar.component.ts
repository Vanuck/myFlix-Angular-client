import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * This ToolbarComponent is the navigation bar of this app.
 * It allows user to select the main options of the app.
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  /**
   * Initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Creates an instance of ToolbarComponent.
   * @param router - Angular Router service.
   */
  constructor(private router: Router) {}

  /**
   * Navigates to the movies page.
   */
  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Navigates to the welcome page.
   * Also clears the local storage.
   */
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Navigates to the profile page.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Checks if the current route is the profile page.
   * @returns A boolean indicating whether the current route is the profile page.
   */
  isOnProfileRoute(): boolean {
    return this.router.url === '/profile';
  }

  /**
   * Checks if the current route is the movies page.
   * @returns A boolean indicating whether the current route is the movies page.
   */
  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
}
