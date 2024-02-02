import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import myHeaders, { API_URL } from "../utils/api"
import { Link } from "react-router-dom"
import htmlDecode from "../utils/decodeHtml"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Authors() {

    // array to hold a list of authors received from the server
    const [authorList, setAuthors] = useState([])
    const [pagination, setPagination] = useState()

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
     * app data
     * used for form dropdown inputs for gender/country
     */
    const gender = ["Male", "Female"]
    const countries = ["Kenya", "Cananda", "Japan", "France"]

    /**
     * handle form submit event
     */
    const onSubmit = (data) => {

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
        fetch(API_URL + "authors", requestOptions)
            .then(response => {
                // on response received from the request
                response.text()
                // close the form modal
                setIsOpen(false)
                // hide progress bar
                setIsLoading(false)
                // reload the authors table
                getAuthors(API_URL + "authors")
            })
            .then(result => console.log(result))
            .catch(error => {
                // on request error
                console.log('error', error)
                // hide the loading progress bar
                setIsLoading(false)
            })
    }

    function nextPage(link) {
        
        console.log(link)
        if (link["url"] != null && !link["active"]) {
            getAuthors(link["url"])
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        getAuthors(API_URL + "authors")
    }, [])

    function getAuthors(url) {
        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data["data"])
                setAuthors(data["data"])
                setPagination(data["meta"])
            })
    }

    return (
        <>
            {isLoading ?
                <div>
                    <p>Creating author, please wait ....</p>
                </div>
            :
                <div>

                    {/* display a table to list the books */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-100">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
                            <div></div>
                            <div>
                            <button
                                type="button"
                                onClick={openModal}
                                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                >
                                    Create Author
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Authors
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Browse a list of authors.
                                </p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Author Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Age
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Genre
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {authorList.map((author) =>
                                <tr key={author["id"]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {author["name"]}
                                    </th>
                                    <td className="px-6 py-4">
                                        {author["gender"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {author["age"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {author["country"]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {author["genre"]}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={'/authors/' + author["id"]} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                    </td>
                                </tr>
                            )}
                                
                            </tbody>
                        </table>
                        {pagination != null &&
                            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                    Showing <span className="font-semibold text-gray-900 dark:text-white">
                                        {pagination["from"]}-{pagination["to"]}
                                    </span> of <span className="font-semibold text-gray-900 dark:text-white">
                                        {pagination["total"]}
                                    </span>
                                </span>
                                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                    
                                    {pagination["links"].map((link, index) => 
                                        <li
                                            key={index}
                                        >
                                            <button                                                
                                                className={
                                                    classNames(
                                                        "pagination-link",
                                                        (index == 0)
                                                        ? "rounded-s-lg"
                                                        : "",
                                                        (index == (pagination["links"].length -1))
                                                        ? "rounded-e-lg"
                                                        : "",
                                                        link["active"]
                                                        ? "text-blue-600 bg-blue-50"
                                                        : ""
                                                    )
                                                }
                                                onClick={() => nextPage(link)}
                                            >
                                                {htmlDecode(link["label"])}
                                            </button>
                                        </li>
                                    )}
                                                                        
                                </ul>
                            </nav>
                        }
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
                                    Create Author
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
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
                                            <select
                                                {...register("gender", {required: {value: true, message: 'Required'}})}
                                                className="input"
                                                placeholder="Gender">
                                                    <option value="">Gender</option>
                                                    {gender.map((e) =>
                                                        <option key={e} value={e}>{e}</option>
                                                    )}
                                            </select>
                                            {errors.gender && <p className="input-error">{errors.gender.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <input
                                                {...register("age", {
                                                    required: {value: true, message: 'Required'},
                                                    min: {value: 12, message: 'Minimun age is 12'},
                                                    max: {value: 100, message: 'Max age is 100'}
                                                })}
                                                type="number"
                                                className="input"
                                                placeholder="Age" />
                                                {errors.age && <p className="input-error">{errors.age.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <select
                                                {...register("country", {required: {value: true, message: 'Required'},minLength: 2})}
                                                className="input"
                                                placeholder="Country">
                                                    <option value="">Country</option>
                                                    {countries.map((e) =>
                                                        <option key={e} value={e}>{e}</option>
                                                    )}
                                            </select>
                                            {errors.country && <p className="input-error">{errors.country.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <input
                                                {...register("genre", {required: {value: true, message: 'Required'}})}
                                                type="text"
                                                className="input"
                                                placeholder="Genre" />
                                                {errors.genre && <p className="input-error">{errors.genre.message}</p>}
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

export default Authors