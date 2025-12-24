<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\RoomTypeController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\PasswordController;
use App\Http\Controllers\front\OrderController;
use App\Http\Controllers\admin\OrderController as AdminOrderController;
use App\Http\Controllers\admin\ShippingController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use App\Http\Controllers\front\ShippingController as FrontShippingController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthController::class, 'authenticate']);
Route::get('get-latest-products', [FrontProductController::class, 'latestProducts']);
Route::get('get-featured-products', [FrontProductController::class, 'featuredProducts']);
Route::get('get-categories', [FrontProductController::class, 'getCategories']);
Route::get('get-roomtypes', [FrontProductController::class, 'getRoomTypes']);
Route::get('get-products', [FrontProductController::class, 'getProducts']);
Route::get('get-product/{id}', [FrontProductController::class, 'getProduct']);
Route::post('register', [AccountController::class, 'register']);
Route::post('login', [AccountController::class, 'authenticate']);
Route::post('forgot-password', [PasswordController::class, 'sendResetLinkEmail']);
Route::post('reset-password', [PasswordController::class, 'resetPassword']);
Route::get('get-shipping-front', [FrontShippingController::class, 'getShipping']);

Route::group(['middleware' => ['auth:sanctum', 'checkUserRole']], function () {
    Route::post('save-order', [OrderController::class, 'saveOrder']);
    Route::get('get-order-details/{id}', [AccountController::class, 'getOrderDetails']);
    Route::get('get-orders', [AccountController::class, 'getOrders']);
    Route::post('update-profile', [AccountController::class, 'updateProfile']);
    Route::get('get-profile-details', [AccountController::class, 'getAccountDetails']);
    Route::post('create-payment-intent', [OrderController::class, 'createPaymentIntent']);
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Route::get('categories', [CategoryController::class, 'index']);
    // Route::get('categories/{id}', [CategoryController::class, 'show']);
    // Route::put('categories/{id}', [CategoryController::class, 'update']);
    // Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
    // Route::post('categories', [CategoryController::class, 'store']);

    Route::resource('categories', CategoryController::class);
    Route::resource('roomtypes', RoomTypeController::class);
    Route::resource('products', ProductController::class);
    Route::post('temp-images', [TempImageController::class, 'store']);

    Route::post('save-product-images', [ProductController::class, 'saveProductImages']);
    Route::get('change-product-default-images', [ProductController::class, 'updateProductImages']);
    Route::delete('delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);


    Route::get('orders', [AdminOrderController::class, 'index']);
    Route::get('orders/{id}', [AdminOrderController::class, 'detail']);
    Route::post('update-order/{id}', [AdminOrderController::class, 'updateOrder']);

    Route::get('get-shipping', [ShippingController::class, 'getShipping']);
    Route::post('save-shipping', [ShippingController::class, 'updateShipping']);

    // Authenticated users can change their password
    Route::post('change-password', [PasswordController::class, 'changePassword']);

    // Admin only user management
    Route::group(['middleware' => 'checkAdminRole'], function () {
        Route::resource('users', UserController::class);
    });

    // Route::get('/admin/dashboard-stats', function () {
    // return response()->json([
    //     'status' => 200,
    //     'users' => \App\Models\User::count(),
    //     'orders' => \App\Models\Order::count(),
    //     'products' => \App\Models\Product::count(),
    // ]);
    // });

Route::get('/admin/dashboard-stats', function () {

    $months = collect(range(1, 6))->map(function($i){
        return now()->subMonths(6 - $i)->format('M');
    });

    $usersByMonth = collect(range(1, 6))->map(function($i){
        return \App\Models\User::whereMonth('created_at', now()->subMonths(6 - $i))
            ->whereYear('created_at', now())
            ->count();
    });

    $ordersByMonth = collect(range(1, 6))->map(function($i){
        return \App\Models\Order::whereMonth('created_at', now()->subMonths(6 - $i))
            ->whereYear('created_at', now())
            ->count();
    });

    // ⭐⭐⭐ PRODUCTS BY MONTH
    $productsByMonth = collect(range(1, 6))->map(function($i){
        return \App\Models\Product::whereMonth('created_at', now()->subMonths(6 - $i))
            ->whereYear('created_at', now())
            ->count();
    });

    return response()->json([
        'status' => 200,
        'users' => \App\Models\User::count(),
        'orders' => \App\Models\Order::count(),
        'products' => \App\Models\Product::count(),

        'chart' => [
            'months' => $months,
            'users' => $usersByMonth,
            'orders' => $ordersByMonth,
            'products' => $productsByMonth, // 👈 THÊM NÈ
        ]
    ]);
});



});
