import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import myHeaders from "../utils/api"

function Books() {

    // array to hold a list of authors received from the server
    const [authorList, setAuthors] = useState([])
    // array to hold a list of books received from the server
    const [bookList, setBooks] = useState([])
    // boolean to show/hide the create author form modal
    const [isOpen, setIsOpen] = useState(false)

    // boolean to show/hide a progress bar when making an api call
    const [isLoading, setIsLoading] = useState(false)

    /**
     * initialize form components
     * register: for form validation
     * formState: to access validation errors
     * handleSubmit: handles the submit event of the form
     */
    const {register, handleSubmit, formState: { errors }} = useForm()

    /**
     * handle form submit event
     */
    const onSubmitBook = (data) => {

        console.log(JSON.stringify(data))

        // show a progress bar
        setIsLoading(true)
        
        /**
         * prepare request options
         * add headers, request method etc
         */
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        }

        // make a request to the api
        fetch("http://127.0.0.1:8000/api/v1/books", requestOptions)
            .then(response => {
                // on response received from the request
                response.text()
                // close the form modal
                setIsOpen(false)
                // hide progress bar
                setIsLoading(false)
                // reload the books table
                getBooks()
            })
            .then(result => console.log(result))
            .catch(error => {
                // on request error
                console.log('error', error)
                // hide the loading progress bar
                setIsLoading(false)
            })
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        getBooks()
        getAuthors()
    }, [])

    function getBooks() {
        fetch("http://127.0.0.1:8000/api/v1/books")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data["data"])
                setBooks(data["data"])
            })
    }

    function getAuthors() {
        fetch("http://127.0.0.1:8000/api/v1/authors")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data["data"])
                setAuthors(data["data"])
            })
    }

    return (
        <>
            {isLoading ?
                <div>
                    <p>Creating book, please wait ....</p>
                </div>
            :
                <div>

                    {/* display a table to list the books */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
                            <div></div>
                            <div>
                            <button
                                type="button"
                                onClick={openModal}
                                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                >
                                    Create Book
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Books
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Browse a list of books available in the library.
                                </p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Book title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ISBN
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {bookList.map((book) =>
                                <tr key={book["id"]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {book["name"]}
                                    </th>
                                    <td className="px-6 py-4">
                                        {book["isbn"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book["author"]["name"]}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                    </td>
                                </tr>
                            )}
                                
                            </tbody>
                        </table>
                    </div>

                    {/* show a form to create a book in a dialog */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 pb-4"
                                >
                                    Create a book
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmitBook)} className="flex flex-col space-y-4">
                                    <div className="mt-2 flex flex-col space-y-8 w-full">
                                        <div className="w-full">
                                            <input
                                                {...register("name", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="input"
                                                placeholder="Author name" />
                                                {errors.name && <p className="input-error">{errors.name.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <input
                                                {...register("isbn", {
                                                    required: {value: true, message: 'Required'}
                                                })}
                                                type="text"
                                                className="input"
                                                placeholder="ISBN" />
                                                {errors.isbn && <p className="input-error">{errors.isbn.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <select
                                                {...register("author_id", {required: {value: true, message: 'Required'}})}
                                                className="input"
                                                placeholder="Author">
                                                    <option value="">Author</option>
                                                    {authorList.map((e) =>
                                                        <option key={e["id"]} value={e["id"]}>{e["name"]}</option>
                                                    )}
                                            </select>
                                            {errors.author_id && <p className="input-error">{errors.author_id.message}</p>}
                                        </div>

                                        </div>

                                        <div className="mt-4 flex flex-row space-x-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                                >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>

                </div>
            }
        </>
    )
}

export default Books