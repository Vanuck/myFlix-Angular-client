import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Represents the Director Info Component.
 * This component is responsible for displaying information about a director.
 */

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss',
})
export class DirectorInfoComponent {
  Director: any;
  movie: any;

  /**
   * Creates an instance of DirectorInfoComponent.
   * @param dialogRef - Angular Material dialog reference.
   * @param data - Data injected into the dialog.
   *               Contains director's name, bio & birth date.
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
    this.Director = data.movie.Director;
  }

  /**
   * The lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {}

  /**
   * Closes the dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
