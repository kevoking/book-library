import { Link, Outlet } from 'react-router-dom'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

function App() {
  // const [tabs] = useState(["Books", "Authors"])

  return (
    <>
      <div className="w-full">
        
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Book Libary</span>
          </Link>
          
          <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to={'books'} className="nav-item">Books</Link>
              </li>
              <li>
              <Link to={'authors'} className="nav-item">Authors</Link>
              </li>
              
            </ul>
          </div>
          </div>
        </nav>

        <div className="pt-60 md:pt-20 max-w-7xl mx-auto p-12">
          <Outlet />
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