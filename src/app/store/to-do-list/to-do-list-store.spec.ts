import { TestBed } from '@angular/core/testing';

import { ToDoListStore } from 'src/app/store/to-do-list/to-do-list-store';

describe('ToDoListStore', () => {
  let service: ToDoListStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
