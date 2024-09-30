<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login/', [AuthController::class, 'login']);

//Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function (){
    Route::post('logout',  [AuthController::class, 'logout'])
        ->name('logout');

    // products routes
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::get('/{product}', [ProductController::class, 'show'])->name('products.show');
        Route::put('/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });

    Route::prefix('categories')->group(function () {
        Route::get('/get-all', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/create-category', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('/{category}', [CategoryController::class, 'show'])->name('categories.show');
        Route::put('/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    });

    // orders routes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('orders.index');
        Route::post('/', [OrderController::class, 'store'])->name('orders.store');
        Route::get('/{order}', [OrderController::class, 'show'])->name('orders.show');
        Route::put('/{order}', [OrderController::class, 'update'])->name('orders.update');
        Route::delete('/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');
    });

    // customer routes
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('customers.index');
        Route::post('/', [CustomerController::class, 'store'])->name('customers.store');
        Route::get('/{customer}', [CustomerController::class, 'show'])->name('customers.show');
        Route::put('/{customer}', [CustomerController::class, 'update'])->name('customers.update');
        Route::delete('/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    });

    // delivery routes

    Route::prefix('deliveries')->group(function () {
        Route::get('/', [DeliveryController::class, 'index'])->name('deliveries.index');
        Route::post('/', [DeliveryController::class, 'store'])->name('deliveries.store');
        Route::get('/{delivery}', [DeliveryController::class, 'show'])->name('deliveries.show');
        Route::put('/{delivery}', [DeliveryController::class, 'update'])->name('deliveries.update');
        Route::delete('/{delivery}', [DeliveryController::class, 'destroy'])->name('deliveries.destroy');
    });
});
