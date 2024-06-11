import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss'],
})
export class GenreInfoComponent {
  Genre: any;
  movie: any;

  /**
   * Creates an instance of GenreInfoComponent.
   * @param dialogRef - Angular Material dialog reference.
   * @param data - Data injected into the dialog.
   *              Contains information on the selected Genre of movie.
   */
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log({ data });
    this.movie = data.movie;
    this.Genre = data.movie.Genre;
    // this.Description = data.Genre.Description;
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
