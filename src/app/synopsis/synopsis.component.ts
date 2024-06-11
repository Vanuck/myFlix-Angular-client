import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Represents a dialog component displaying movie synopsis.
 */
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss',
})
export class SynopsisComponent {
  movie: any;

  /**
   * Creates an instance of SynopsisComponent.
   * @param dialogRef - Angular Material dialog reference.
   * @param data - Data injected into the dialog.
   *               Contains a synopsis of the movie selected & a famouse movie line for that movie.
   */
  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
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
