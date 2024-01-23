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
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

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
    const title = ref('할일 앱');

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

    // 라이프 사이클 API와 같은 동작 - beforeCreate, created
    console.log('1 : setup called');

    //명시적인 라이프 사이클 API 적용
    onBeforeMount(() => {
      console.log('2 : onBeforeMount called');
      todoItems.value = fetchTodos();
    })

    onMounted(() => {
      console.log('3 : onMounted')
    })

    onUnmounted(() => {
      //컴포넌트를 제거해야 호출된다.
      console.log('4 : onUnmounted')
    })

    function addTodoItem(todo) {
      todoItems.value.push(todo); //todoItems 배열에 todo추가
      localStorage.setItem(todo, todo);//localStorage에 todo 추가
    }

    function removeTodoItem(item, index) {
      todoItems.value.splice(index, 1);
      localStorage.removeItem(item);
    }

    function modifyTodoItem(item, modifyText, index) {
      todoItems.value.splice(index, 1, modifyText);
      localStorage.removeItem(item);
      localStorage.setItem(modifyText, modifyText);
    }

    return { title, todoItems, addTodoItem, removeTodoItem, modifyTodoItem}
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