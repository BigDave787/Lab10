import { Component, OnInit } from '@angular/core';
import {Todo} from '../todo';
import {TodoService} from '../todo.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

  @Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService]
})
export class TodoAppComponent implements OnInit {

  todos: Observable<Todo[]>;
  singleTodo$: Observable<Todo>;

  newTodo: Todo = new Todo();

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoService`
  // and assign it to a property called `todoService`
  constructor(private todoService: TodoService) { 
  }

  addTodo() {
    this.newTodo.createdAt = new Date().toJSON();
    this.todoService.create(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  deleteTodo(todoId: number) {
    this.todoService.remove(todoId);
  }

  ngOnInit() {
this.todos = this.todoService.todos;
this.singleTodo$ = this.todoService.todos
      .map(todos => todos.find(item => item.id === '1'));
this.todoService.loadAll();
this.todoService.load('1');
  }
}
