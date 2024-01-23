# Vue 3 중급 - Composition API
인스턴스 옵션 속성 방식과 Compositoin API 방식의 차이점을 알고, <br/>
Composition API로 TODO 기능 만들어보기

## Custom Compoistion 함수로 setUp()함수 정리하기
Composition API의 가장 큰 장점인 로직 재사용성을 이용하여 <br/>
src폴더 밑에 hooks폴더를 생성 및 useTodo.js 파일을 생성하여<br/>
기존 App.vue의 setup() 함수 안에 있던 메서드들을 옮겨보았다.<br/>
이를 통해 App.vue의 setup()함수는 다음과 같이 간단해질 수 있다.
```
  setup() {
    //data
    const title = ref('할일 앱');

    const { todoItems, addTodoItem, removeTodoItem, modifyTodoItem } = useTodo();

    return { title, todoItems, addTodoItem, removeTodoItem, modifyTodoItem };
  },
  
```