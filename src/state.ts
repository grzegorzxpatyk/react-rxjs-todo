import { nanoid } from 'nanoid';
import { combineLatest, Subject } from 'rxjs';

export type Task = {
  id: string;
  content: string;
  isDone: boolean;
};

const todosSubject = new Subject();

const initialState: Task[] = [];

let state = initialState;

export const todoStore = {
  subscribe: (setState: any) => {
    todosSubject.subscribe(setState);
  },
  init: () => {
    todosSubject.next(state);
  },
  addTask: (content: string) => {
    const task = {
      content,
      id: nanoid(),
      isDone: false,
    };
    state = [...state, task];
    todosSubject.next(state);
  },
  removeTask: (id: string) => {
    const tasks = state.filter((task) => task.id !== id);
    state = tasks;
    todosSubject.next(state);
  },
  completeTask: (id: string) => {
    const tasks = state.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    state = tasks;
    todosSubject.next(state);
  },
};

const showCompletedSubject = new Subject();

const initialShowCompltedState: boolean = undefined;

let showCompletedState = initialShowCompltedState;

export const showCompletedStore = {
  subscribe: (setState: any) => {
    showCompletedSubject.subscribe(setState);
  },
  init: () => {
    showCompletedSubject.next(showCompletedState);
  },
  setShowCompleted: (status: boolean) => {
    showCompletedState = status;
    showCompletedSubject.next(showCompletedState);
  },
};

export const combinedObservable = combineLatest([
  todosSubject,
  showCompletedSubject,
]);
