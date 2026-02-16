import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToDoItem } from './create-to-do-item';

describe('CreateToDoItem', () => {
  let component: CreateToDoItem;
  let fixture: ComponentFixture<CreateToDoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateToDoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateToDoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
