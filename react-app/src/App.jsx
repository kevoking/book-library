import { useState } from 'react'
import { Tab } from "@headlessui/react"
import Books from './pages/Books'
import Authors from './pages/Authors'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function App() {
  const [tabs] = useState(["Books", "Authors"])

  return (
    <>
      <div className="w-full max-w-5xl px-2 py-16 sm:px-0 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {tabs.map((tab) =>
              <Tab
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
              </Tab>
            )}
          </Tab.List>
          <Tab.Panels className="py-8">
            <Tab.Panel>
              <Books />
            </Tab.Panel>
            <Tab.Panel>
              <Authors />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}

export default App
