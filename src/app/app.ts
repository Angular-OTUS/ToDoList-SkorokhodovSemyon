import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoList } from 'src/app/components/to-do-list/to-do-list';
import { Toast } from 'src/app/components/toast/toast';

/**
 * Основной компонент приложения
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoList, Toast,],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
