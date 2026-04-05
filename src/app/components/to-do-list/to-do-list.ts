import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { FormsModule } from '@angular/forms';
import { CreateToDoTask, TaskStatus, ToDoTask } from 'src/app/models/to-do-task';
import { ToDoListItem } from 'src/app/components/to-do-list-item/to-do-list-item';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Spinner } from 'src/app/components/spinner/spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { CreateToDoItem } from 'src/app/components/create-to-do-item/create-to-do-item';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Компонент для отображения списка тасок и управления ими
 */
@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItem,
    MatFormFieldModule,
    MatInputModule,
    Spinner,
    MatSelect,
    MatOption,
    CreateToDoItem,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  //region Fields

  /**
   * Сервис для работы с тасками
   */
  readonly toDoListService = inject(ToDoListService);

  /**
   * Текущий ActivatedRoute — объект, описывающий активный маршрут
   */
  private readonly route = inject(ActivatedRoute);

  /**
   * Сервис для работы с навигацией
   */
  private readonly router = inject(Router);

  /**
   * Текущий id задачи
   */
  readonly currentRouteId = signal<string | null>(null);

  /**
   * Происходит ли загрузка данных
   */
  public isLoading: Signal<boolean> = this.toDoListService.getIsLoading();

  /**
   * Список тасок
   */
  public taskList: Signal<ToDoTask[]> = this.toDoListService.getTaskList();

  /**
   * Выбранная таска для отображения описания
   */
  readonly selectedTask = computed(() => {

    const currentId = this.currentRouteId();
    if (!currentId) {

      return null;
    }

    return this.taskList().find(t => t.id === currentId) || null;
  });

  /**
   * Выбранный фильтр: null = ALL
   */
  readonly statusFilter = signal<TaskStatus | null>(null);

  /**
   * Ссылка на контекст уничтожения компонента для отписок
   */
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Отфильтрованный список для отображения
   */
  readonly filteredTaskList: Signal<ToDoTask[]> = computed(() => {

    const filter = this.statusFilter();
    const tasks = this.taskList();

    return filter === null ? tasks : tasks.filter(t => t.status === filter);
  });

  //endregion
  //region Hooks

  ngOnInit() {

    this.toDoListService.loadTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.extractIdFromRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.extractIdFromRoute();
    });
  }

  //endregion
  //region Handler

  /**
   * Добавляет новую таску
   */
  addTaskHandler(payload: CreateToDoTask) {

    this.toDoListService.addTask({
      title: payload.title,
      description: payload.description,
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  /**
   * Удаляет выбранную таску
   *
   * @param id идентификатор таски
   */
  removeTaskHandler(id: string) {

    this.toDoListService.deleteTask(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  /**
   * Обновляет задачу
   */
  updateTaskHandler(updatedTask: ToDoTask) {

    this.toDoListService.updateTask(updatedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  //endregion
  //region Private

  /**
   * Извлекает id из пути
   */
  private extractIdFromRoute() {

    const childRoute = this.route.firstChild;
    if (childRoute) {

      const id = childRoute.snapshot.paramMap.get('id');
      this.currentRouteId.set(id);
    }
    else {

      this.currentRouteId.set(null);
    }
  }

  //endregion
}
