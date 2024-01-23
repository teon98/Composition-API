import { onBeforeMount, ref } from "vue";

function useTodo() {
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
    
    onBeforeMount(() => {
      //console.log('2 : onBeforeMount called');
      todoItems.value = fetchTodos();
    });  
    
    function addTodoItem(todo) {
      todoItems.value.push(todo); //todoItems 배열에 todo추가
      localStorage.setItem(todo, todo); //localStorage에 todo 추가
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

    return { todoItems, addTodoItem, removeTodoItem, modifyTodoItem };
}

export { useTodo };