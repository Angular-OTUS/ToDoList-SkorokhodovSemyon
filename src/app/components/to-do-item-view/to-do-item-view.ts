import { Component, inject, Signal } from '@angular/core';
import { ToDoTask } from 'src/app/models/to-do-task';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-to-do-item-view',
  imports: [
    TranslatePipe
  ],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
})
export class ToDoItemView {
  //region Input

  /**
   * Выбранная задача
   */
  task = inject(ROUTER_OUTLET_DATA) as Signal<ToDoTask>;

  //endregion
}
