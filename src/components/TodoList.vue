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
    props: ['todoItems', 'userId'],
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

<style>

</style>