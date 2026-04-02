<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [\App\Http\Controllers\Auth\AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [\App\Http\Controllers\Auth\AuthController::class, 'login']);
    Route::get('/register', [\App\Http\Controllers\Auth\AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [\App\Http\Controllers\Auth\AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Auth\AuthController::class, 'logout'])->name('logout');
});

// Public service listing
Route::get('/services', [\App\Http\Controllers\ServiceController::class, 'index'])->name('services.index');

// Customer routes
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/bookings', [\App\Http\Controllers\BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/create', [\App\Http\Controllers\BookingController::class, 'create'])->name('bookings.create');
    Route::post('/bookings', [\App\Http\Controllers\BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}', [\App\Http\Controllers\BookingController::class, 'show'])->name('bookings.show');
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/bookings', [\App\Http\Controllers\Admin\AdminBookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [\App\Http\Controllers\Admin\AdminBookingController::class, 'show'])->name('bookings.show');
    Route::patch('/bookings/{booking}/status', [\App\Http\Controllers\Admin\AdminBookingController::class, 'updateStatus'])->name('bookings.status');
    Route::post('/bookings/{booking}/assign', [\App\Http\Controllers\Admin\AdminBookingController::class, 'assign'])->name('bookings.assign');
    Route::get('/services', [\App\Http\Controllers\ServiceController::class, 'adminIndex'])->name('services.index');
    Route::post('/services', [\App\Http\Controllers\ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [\App\Http\Controllers\ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [\App\Http\Controllers\ServiceController::class, 'destroy'])->name('services.destroy');
});

// Staff routes
Route::middleware(['auth', 'role:staff'])->prefix('staff')->name('staff.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Staff\StaffDashboardController::class, 'index'])->name('dashboard');
    Route::patch('/jobs/{booking}/status', [\App\Http\Controllers\Staff\StaffDashboardController::class, 'updateJobStatus'])->name('jobs.status');
});
