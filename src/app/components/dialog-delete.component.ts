import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/user';

@Component({
  selector: 'dialog-delete',
  template: `
    <h1 mat-dialog-title>Delete {{ user.name }}</h1>
    <div mat-dialog-content>
      <p>Are you sure?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="user.id">
        Confirm
      </button>
    </div>
  `,
})
export class DialogDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: User) {
    // data received when dialog is opened
    console.log('open dialog', user);
  }
}
