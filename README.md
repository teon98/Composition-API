# Vue 3 중급 - Composition API
인스턴스 옵션 속성 방식과 Compositoin API 방식의 차이점을 알고, <br/>
Composition API로 TODO 기능 만들어보기

## 할 일 추가 기능
```javascript
<template>
    <div>
        <input type="text" v-model="todoInput">
        <button @click="addTodo">추가</button>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(props, context) {
        // data
        const todoInput = ref('');

        // methods
        function addTodo() {
            const todo = todoInput.value;
            context.emit('add', todo);
            clearTodo();
        }

        const clearTodo = () => todoInput.value = '';

        return { todoInput , addTodo }
    }
}
</script>
```
```javascript
function addTodoItem(todo) {
  todoItems.value.push(todo); //todoItems 배열에 todo추가
  localStorage.setItem(todo, todo);//localStorage에 todo 추가
}
```

## 할 일 삭제 & 수정 기능
```javascript
<template>
  <ul>
    <li v-for="(item, index) in todoItems" v-bind:key="index">
        <span>{{ item }}</span>
        <button @click="removeTodo(item, index)">삭제</button>
        <button @click="modifyTodo(item, index)">수정</button>
    </li>
  </ul>
</template>

<script>
export default {
    props: ['todoItems'],
    setup(props, context) {
        function removeTodo(item, index) {
            context.emit('remove', item, index);
        }

        function modifyTodo(item, index) {
            let modifyText = prompt("수정할 내용을 입력하세요", item);
            context.emit('modify',item, modifyText, index);
        }
        
        return { removeTodo, modifyTodo }
    }
}
</script>
```
```javascript
function removeTodoItem(item, index) {
  todoItems.value.splice(index, 1);
  localStorage.removeItem(item);
}

function modifyTodoItem(item, modifyText, index) {
  todoItems.value.splice(index, 1, modifyText);
  localStorage.removeItem(item);
  localStorage.setItem(modifyText, modifyText);
}
```
수정 버튼을 누르면 prompt 창으로 수정할 값을 받아 수정되는 기능을 가볍게 추가하였다:)
