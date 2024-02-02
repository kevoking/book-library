import { Link, Outlet } from 'react-router-dom'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

function App() {
  // const [tabs] = useState(["Books", "Authors"])

  return (
    <>
      <div className="w-full">

        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li className='py-4 border-b border-gray-200'>
                  <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
                      <svg className="h-8 w-8 text-orange-700 dark:text-orange-500" data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"></path>
                      </svg>
                      <span className="self-center text-2xl font-semibold whitespace-nowrap">
                        <span className="text-orange-600 dark:text-orange-300">Book</span>
                        <span className="text-green-600 dark:text-green-300">Libary</span>
                      </span>
                  </h1>
                </li>
                <li>
                    <Link to={'books'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <svg className='h-6 w-6' data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" ></path>
                      </svg>
                      <span className="ms-3">Books</span>
                    </Link>
                </li>
                <li>
                    <Link to={'authors'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <svg className='h-6 w-6' data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"></path>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Authors</span>
                    </Link>
                </li>

              </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">
          <div className="p-4 max-w-7xl mx-auto">
              <Outlet />
          </div>
        </div>


      </div>
    </>
  )
}

export default App

{/* <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    'w-48 rounded-lg py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-500'
                  )
                }
              >
                {tab}
              </Tab> */}