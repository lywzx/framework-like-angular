import { Module } from '@framework-like-angular/core';
import { TodoService } from '../services/todo.service';

@Module({
  provider: [TodoService],
})
export class ReduxStoreModule {}
