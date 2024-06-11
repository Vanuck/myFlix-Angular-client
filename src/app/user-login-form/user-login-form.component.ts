import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The UserLoginFormComponent is used for users to login.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Object holding user data for login
   * @property {string} Username - User's username
   * @property {string} Password - User's password
   */
  @Input() userData = {
    Username: '',
    Password: '',
  };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData - API data fetching service.
   * @param dialogRef - Angular Material dialog reference.
   * @param snackBar - Angular Material snackbar service.
   * @param router - Angular Router service.
   */
  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * The lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user by sending the user data to the backend.
   * On success, stores user data and token in local storage, closes the dialog, shows a success message, and navigates to the movies page.
   * On failure, shows an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open(result, 'Login Successful', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (result) => {
        this.snackBar.open(result, 'Login Unsuccessful', {
          duration: 9000,
        });
      },
      complete: () => console.log('complete'),
    });
  }
}
