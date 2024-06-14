import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The UserRegistrationFormComponent is used for users to  register.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   *Creates an instance of UserRegistrationFormComponent
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthdate: Date,
  };
  /**
   * Creates an instance of UserRegistrationFormComponent
   * @param fetchApiData - Service to interact with the API.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service to show snack bar notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * The lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending userData to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log(response);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      error: (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 5000,
        });
      },
    });
  }
}
