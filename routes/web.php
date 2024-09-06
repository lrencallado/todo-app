<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::controller(TodoController::class)->prefix('todos')->group(function () {
    Route::post('/', 'store')->name('todo.store');
    Route::get('/', 'index')->name('todo.index');
    Route::post('/{todo}/update', 'update')->name('todo.update');
    Route::delete('/{todo}/delete', 'delete')->name('todo.delete');
});
