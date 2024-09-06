<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Todo::all()]);
    }

    public function store(TodoRequest $request)
    {
        return Todo::create(['todo' => $request->todo]);
    }

    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    public function update(Todo $todo, TodoRequest $request)
    {
        $todo->todo = $request->todo;
        $todo->save();

        return response()->json($todo);
    }

    public function delete(Todo $todo)
    {
        $todo->delete();

        return response()->json(['message' => 'Resource deleted successfully.']);
    }
}
