<script setup>
import { ref } from 'vue';
import { useTodos } from '../store';
import { onMounted } from 'vue'
import { storeToRefs } from "pinia";

const todo = ref('');
const todoCheckbox = ref('');
const rules = ref([value => {
    if (value) return true;

    return 'You must enter a value';
}]);
const todosStore = useTodos();
const { addTodo, fetchTodos, updateTodo, deleteTodo }  = todosStore;
const { todos } = storeToRefs(todosStore);
const currentTodo = ref(null);

const setCurrentTodoId = (selectedTodo) => {
    currentTodo.value = selectedTodo;
    todo.value = selectedTodo.todo
};

const onSelected = (selectedTodo) => {
    todoCheckbox.value = selectedTodo
};

onMounted(() => {
    fetchTodos();
});

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
            <template v-for="item in todos">
                <v-checkbox v-model="todoCheckbox" :value="item.id" :label="item.todo" @click="setCurrentTodoId(item)" @change="onSelected(item.id)"></v-checkbox>
            </template>

            <v-form @submit.prevent="addTodo(todo)">
                <v-text-field
                    v-model="todo"
                    :rules="rules"
                    label="Todo"
                ></v-text-field>
                <v-btn class="mt-2" type="submit" block>Add</v-btn>
                <v-btn class="mt-2" block @click="updateTodo(currentTodo, todo)">Update</v-btn>
                <v-btn class="mt-2" block @click="deleteTodo(currentTodo)">Delete</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
