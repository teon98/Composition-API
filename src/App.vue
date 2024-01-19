<template>
  <TodoHeader></TodoHeader>
  <!-- <TodoInput @하위컴포넌트 이벤트 이름="상위컴포넌트의 메서드 이름"></TodoInput>-->
  <TodoInput @add="addTodoItem"></TodoInput>
  <!-- <TodoList: 프롭스이름="상위 컴포넌트의 데이터이름"></TodoList:>-->
  <TodoList v-bind:todoItems="todoItems" @remove="removeTodoItem"></TodoList>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import { ref } from 'vue';

export default {
  components: {
    //'컴포넌트 이름': 컴포넌트 내용 (컴포넌트 이름과 내용이 같으면 하나만 써서 줄일 수 있다.)
    TodoHeader,
    TodoInput,
    TodoList
  },
  setup() {
    //data
    const todoItems = ref([]);

    //methods
    function fetchTodos() {
      const result = [];
        for (let i = 0; i < localStorage.length; i++) {
          const todoItem = localStorage.key(i);
          todoItems.value.push(todoItem);
          result.push(todoItem);
        }
      return result;
    }
  
    todoItems.value = fetchTodos();

    function addTodoItem(todo) {
      todoItems.value.push(todo); //todoItems 배열에 todo추가
      localStorage.setItem(todo, todo);//localStorage에 todo 추가
    }

    function removeTodoItem(item, index) {
      todoItems.value.splice(index, 1);
      localStorage.removeItem(item);
    }

    return { todoItems, addTodoItem, removeTodoItem }
  },
  // methods: {
  //   removeTodoItem(item, index){
  //     this.todoItems.splice(index, 1);
  //     localStorage.removeItem(item);
  //   }
  // }
}
</script>

<style>

</style>