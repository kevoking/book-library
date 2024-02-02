import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/spinner"
import { API_URL } from "../utils/api"

function AuthorDetails() {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ author, setAuthor ] = useState(null)
    const { id } = useParams()

    useEffect(() => {

        setIsLoading(true)

        fetch(API_URL + 'authors/' + id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setAuthor(data)
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
        {isLoading ?                
                <Spinner />
            :
            <div className="">
                {author != null && 
                    <div className="flex justify-center items-center">                    

                        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            
                            <div className="flex flex-col items-center py-10">
                                <div className="w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center bg-green-50">
                                    <svg className="h-20 w-20 text-green-500" data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                    </svg>
                                </div>
                                
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {author["name"]}
                                </h5>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <p className="flex flex-row justify-center items-center space-x-4">
                                        <span>Gender</span>
                                        <span className="font-semibold">{author["gender"]}</span>
                                    </p>
                                    <p className="flex flex-row justify-center items-center space-x-4">
                                        <span>Age</span>
                                        <span className="font-semibold">{author["age"]}</span>
                                    </p>
                                    <p className="flex flex-row justify-center items-center space-x-4">
                                        <span>Country</span>
                                        <span className="font-semibold">{author["country"]}</span>
                                    </p>
                                    <p className="flex flex-row justify-center items-center space-x-4">
                                        <span>Genre</span>
                                        <span className="font-semibold">{author["genre"]}</span>
                                    </p>
                                </div>

                                <div className="mt-4 border-t border-gray-100 py-4 w-full flex flex-row justify-center items-center space-x-4">
                                    <svg className='h-6 w-6' data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path>
                                    </svg>
                                    <span>{author["book_count"]} books.</span>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                }
            </div>
        }
        </>
    )
}

export default AuthorDetails