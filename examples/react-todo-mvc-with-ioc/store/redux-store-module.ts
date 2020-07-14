import { Module } from '@framework-like-angular/core';
import { TodoService } from '../services/todo.service';

@Module({
  providers: [TodoService],
})
export class ReduxStoreModule {}
