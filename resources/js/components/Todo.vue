<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useTodos } from '../store';
import { onMounted } from 'vue'
import { storeToRefs } from "pinia";

const todo = ref('')
const rules = ref([value => {
    if (value) return true;

    return 'You must enter a value';
}])
const todosStore = useTodos();
const { todos } = storeToRefs(todosStore);
const currentTodo = ref(null);

const fetchTodos = async() => {
    await todosStore.fetchTodos();
}

const setCurrentTodoId = (selectedTodo) => {
    currentTodo.value = selectedTodo;
    todo.value = selectedTodo.todo
}

onMounted(() => {
    todosStore.fetchTodos();
})

</script>

<template>
    <v-card
        class="mx-auto"
        prepend-icon="$vuetify"
        subtitle="Todo App"
        width="400"
    >
        <template v-slot:title>
            <span class="font-weight-black">Welcome to Vuetify</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
            <template v-for="todo in todos">
                <v-checkbox :label="todo.todo" @click="setCurrentTodoId(todo)"></v-checkbox>
            </template>

            <v-form @submit.prevent="todosStore.addTodo(todo)">
                <v-text-field
                    v-model="todo"
                    :rules="rules"
                    label="Todo"
                ></v-text-field>
                <v-btn class="mt-2" type="submit" block>Add</v-btn>
                <v-btn class="mt-2" block @click="todosStore.updateTodo(currentTodo, todo)">Update</v-btn>
                <v-btn class="mt-2" block @click="todosStore.deleteTodo(currentTodo)">Delete</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
