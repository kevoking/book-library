<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;

class AuthorApiController extends Controller
{
    /**
     * return a list of authors
     */
    public function index()
    {
        return AuthorResource::collection(Author::query()->orderby('created_at', 'desc')->get());
    }

    /**
     * return a single author
     */
    public function show(Author $author)
    {
        return AuthorResource::make($author);
    }

    /**
     * create an author
     */
    public function store(StoreAuthorRequest $request)
    {
        $author = Author::create($request->validated());
        return AuthorResource::make($author);
    }

    /**
     * update an author
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        $author->update($request->validated());

        return AuthorResource::make($author);
    }
}
