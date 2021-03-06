import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { User } from './model/user';
import { DialogDeleteComponent } from './components/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  users: User[] | null = null;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(delay(1000))
      .subscribe((res) => {
        this.users = res;
      });
  }

  deleteHandler(userToDelete: User) {
    console.log('cancello ', userToDelete);
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: userToDelete,
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      console.log('exiting dialog');
      if (id) {
        this.http
          .delete(
            `https://jsonplaceholder.typicode.com/users/${userToDelete.id}`
          )
          .pipe(delay(1000))
          .subscribe(() => {
            if (this.users) {
              this.users = this.users.filter((u) => u.id !== userToDelete.id);
            }
          });
      }
    });
  }
}
