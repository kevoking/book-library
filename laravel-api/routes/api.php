<?php

use App\Http\Controllers\Api\v1\AuthorApiController;
use App\Http\Controllers\Api\v1\BookController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/// grouping my API routes for versioning
Route::prefix('v1')->group(function() {
    
    /**
     * Author APi end points
     * GET: /authors
     * GET: /authors/{id}
     * POST: /authors
     * PUT: /authors/{id}
     */
    Route::apiResource('/authors', AuthorApiController::class);

    /**
     * Book APi end points
     * GET: /books
     * GET: /books/{id}
     * POST: /books
     * PUT: /books/{id}
     */
    Route::apiResource('/books', BookController::class);
});
