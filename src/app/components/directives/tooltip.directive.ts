import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

/**
 * Директива для отображения текстового тултипа при наведении на элемент.
 */
@Directive({
  selector: '[appTooltip]',
  exportAs: 'appTooltip',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
  },
})
export class TooltipDirective implements OnDestroy {
  //region Injected services

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly viewContainerRef = inject(ViewContainerRef);
  //endregion
  //region Inputs

  /**
   * Контент для тултипа. Может быть как простой строкой,
   * так и ссылкой на шаблон (TemplateRef) для более сложной разметки.
   */
  readonly appTooltip = input.required<string | TemplateRef<any>>({ alias: 'appTooltip' });

  //endregion
  //region Fields

  /**
   * DOM-элемент созданного тултипа.
   */
  private tooltipElement: HTMLElement | null = null;

  /**
   * Ссылка на созданное представление (view), если используется TemplateRef.
   */
  private viewRef: EmbeddedViewRef<any> | null = null;

  //endregion
  //region Hooks

  /**
   * Хук жизненного цикла. Вызывается при уничтожении директивы.
   */
  ngOnDestroy(): void {

    this.hide();
  }

  //endregion
  //region Events

  /**
   * Показывает тултип.
   */
  show(): void {

    const content = this.appTooltip();

    if (!content || this.tooltipElement) {

      return;
    }

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'app-tooltip');

    if (content instanceof TemplateRef) {

      this.viewRef = this.viewContainerRef.createEmbeddedView(content);
      this.viewRef.rootNodes.forEach((node) => {
        this.renderer.appendChild(this.tooltipElement, node);
      });
    }
    else {

      const textNode = this.renderer.createText(String(content));
      this.renderer.appendChild(this.tooltipElement, textNode);
    }

    this.renderer.appendChild(document.body, this.tooltipElement);
    this.setPosition();
  }

  /**
   * Скрывает и удаляет тултип из DOM.
   */
  hide(): void {

    if (this.tooltipElement) {

      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }

    if (this.viewRef) {

      this.viewRef.destroy();
      this.viewRef = null;
    }
  }

  //endregion
  //region Private

  /**
   * Рассчитывает и устанавливает позицию тултипа над хост-элементом.
   */
  private setPosition(): void {

    if (!this.tooltipElement) {

      return;
    }

    const hostPos = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const top = hostPos.top - tooltipPos.height - 10;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left + window.scrollX}px`);
  }

  //endregion
}
