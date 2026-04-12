import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Toast } from 'src/app/components/toast/toast';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

/**
 * Основной компонент приложения
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Toast,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  //region Fields

  /**
   * Текущий язык
   */
  readonly currentLang = signal(localStorage.getItem('lang') ?? 'ru');


  //endregion
  //region inject

  /**
   * Сервис для работы с 18n
   */
  private translate = inject(TranslateService);

  //endregion
  //region Events

  /**
   * Выполняет переключение языка
   * @param lang выбираемый язык
   */
  switchLang(lang: string): void {

    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  //endregion

}
