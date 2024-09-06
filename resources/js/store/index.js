import axios from "axios";
import { defineStore } from "pinia";

export const useTodos= defineStore('todos', {
    state: () => {
        return {
            todos: []
        }
    },
    actions: {
        async addTodo(name) {
            try {
                const response = await axios.post('/todos', {
                    todo: name
                })

                this.fetchTodos();
            } catch (error) {
                console.error(error);
            }
        },
        async fetchTodos() {
            try {
                const response = axios.get('/todos');
                this.todos = (await response).data.data;
            } catch (error) {
                console.log(error);
            }
        },
        async updateTodo(todo, newValue) {
            try {
                const response = await axios.post(`/todos/${todo.id}/update`, {
                    todo: newValue
                })

                this.fetchTodos();
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTodo(todo) {
            try {
                const response = await axios.delete(`/todos/${todo.id}/delete`)

                this.fetchTodos();
            } catch (error) {
                console.error(error);
            }
        },
    }
})
