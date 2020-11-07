<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        <input :checked="todo.done" @change="toggle(todo)" type="checkbox" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo, index)">remove</button>
      </li>
      <li>
        <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
      </li>
    </ul>
    <input @keyup.enter="setCookie" style="background-color: white;" type="text" 
      />
    <div>
      <span>{{ $store.getters['user/getLoginUser'] }}</span>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      todos() {
        return this.$store.state.todos.list
      }
    },
    methods: {
      addTodo(e) {
        this.$store.commit('todos/add', e.target.value)
        e.target.value = ''
      },
      ...mapMutations({
        toggle: 'todos/toggle',
        // removeTodo: 'todos/remove'
      }),
      removeTodo(todo, index) {
        console.log(index);
        this.$store.commit('todos/remove', index);
      },
      setCookie(e) {
        console.log(`set cookie [${e.target.value}]`);
        this.$store.commit('user/login', e.target.value);
        console.log(this.$store.getters['user/getLoginUser']);

      }
    }
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>