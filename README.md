# book-library

A small PHP/Laravel, ReactJS & MySQL web application to manage a list of Books. Each book has a name, ISBN, and author. Each author has a name, gender, age, country and genre of books.

### It consists of two main sections
- laravel-api
- react-app

### laravel-api
I side the main repo you will find a folder ` /laravel-api/` which contains the backend section of the app. It's a REST API using a MySQL database and PHP/Laravel.

#### Installation
- Clone this repo 
    ```sh
        gh repo clone kevoking/book-library
        cd book-library
    ```
- laravel-api
    ```sh
        cd laravel-api
        composer install
        npm install
    ```
    - Copy `.env.example` to `.env` edit the `.env` file to update the database configuration
        ```
            DB_CONNECTION=mysql
            DB_HOST=127.0.0.1
            DB_PORT=3306
            DB_DATABASE=book_library_db
            DB_USERNAME=root
            DB_PASSWORD=
        ```
    - Now run laravel migrations to create our database tables. If you haven't created the database yet the      migration event will create it for you using the config provided in the `.env` file.
        ```sh
            php artisan migrate
        ```
    - after a successful migration run the api
        ```sh
            php artisan serve
        ```
        By default laravel will serve your app at `http://127.0.0.1:8000` this maybe different depending on the available ports in you machine. Take note of laravels server address since you will need it in the react-app.