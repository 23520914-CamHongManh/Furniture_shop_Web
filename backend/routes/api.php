<?php
//use App\Http\Controllers\admin\Authcontroller;

use App\Http\Controllers\admin\BrandController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\CategoryController;

//Route::post('/admin/login',[Authcontroller::class,'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Route::get('categories', [CategoryController::class, 'index']);
    // Route::get('categories/{id}', [CategoryController::class, 'show']);
    // Route::put('categories/{id}', [CategoryController::class, 'update']);
    // Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
    // Route::post('categories', [CategoryController::class, 'store']);

    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
});
