<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * return a list of authors
     */
    public function index()
    {
        return BookResource::collection(Book::query()->with('author')->paginate(10));
    }

    /**
     * return a single author
     */
    public function show(Book $book)
    {
        $data = Book::with('author')->find($book->id);
        return BookResource::make($data);
    }

    /**
     * create an author
     */
    public function store(StoreBookRequest $request)
    {
        $book = Book::create($request->validated());
        return BookResource::make($book);
    }

    /**
     * update an author
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->validated());

        return BookResource::make($book);
    }
}
