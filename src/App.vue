<template>
  <TodoHeader v-bind:appTitle="title"></TodoHeader>
  <!-- <TodoInput @하위컴포넌트 이벤트 이름="상위컴포넌트의 메서드 이름"></TodoInput>-->
  <TodoInput @add="addTodoItem"></TodoInput>
  <!-- <TodoList: 프롭스이름="상위 컴포넌트의 데이터이름"></TodoList:>-->
  <TodoList v-bind:todoItems="todoItems" 
            @remove="removeTodoItem"
            @modify="modifyTodoItem">
  </TodoList>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import { onBeforeMount, ref } from 'vue';
import { useTodo } from './hooks/useTodo';

export default {
  components: {
    //'컴포넌트 이름': 컴포넌트 내용 (컴포넌트 이름과 내용이 같으면 하나만 써서 줄일 수 있다.)
    TodoHeader,
    TodoInput,
    TodoList
  },
  setup() {
    //data
    const title = ref('할일 앱');
    
    const { todoItems, fetchTodos, addTodoItem, removeTodoItem, modifyTodoItem } = useTodo();

    //라이프 사이클 API : 명확한 동작은 컴포넌트에서 확인되는 것이 좋다.
    onBeforeMount(() => {
      todoItems.value = fetchTodos();
    });  

    return { title, todoItems, addTodoItem, removeTodoItem, modifyTodoItem };
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