## book-library

A small PHP/Laravel, ReactJS & MySQL web application to manage a list of Books. Each book has a name, ISBN, and author. Each author has a name, gender, age, country and genre of books.

### It consists of two main sections

- laravel-api
- react-app

### laravel-api

Inside the main repo you will find a folder ` /laravel-api/` which contains the backend section of the app. It's a REST API using a MySQL database and PHP/Laravel.

### react-app

I side the main repo you will find a folder ` /react-app/` which contains the frontend section of the app. It's a react app using JavaScript and Tailwind CSS.

#### Installation

- Clone this repo 

    ```sh
        gh repo clone kevoking/book-library
        cd book-library
    ```
- #### laravel-api

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
            php artisan migrate:fresh --seed
        ```

        The `--seed` option will generate sample data in the database

    - after a successful migration run the api

        ```sh
            php artisan serve
        ```

        By default laravel will serve your app at `http://127.0.0.1:8000` this maybe different depending on the available ports in you machine. Take note of laravels server address since you will need it in the react-app.

    - Testing has been implemented using [Pest](https://pestphp.com "The elegant PHP testing framework"), run the following comand to test
        
        ```sh
            ./vendor/bin/pest
        ```
    
- #### react-app

    ```sh
        cd react-app
        npm install
    ```

    - If your laravel-api is not running on the default port `http://127.0.0.1:8000` you will need to set the correct API_URL in the react app
        - Browse and edit file `book-library/react-app/src/utils/api.js` and set the correct laravel-api url

        ```sh
            ...

            export const API_URL="http://127.0.0.1:8000/api/v1/"
        ```
        **Please note the trailing forward slash in the url.**