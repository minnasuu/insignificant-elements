import { useState } from 'react'
import './App.css'
import { components } from './mock'

export interface ComponentItem {
  id: string
  title: string
  description: string
  category: string
  date: string
  tags: string[]
  component?: React.ReactNode
  originLink?: string
  html?: string
  css?: string
  js?: string
}


function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(components.map(c => c.category)))]
  
  const filteredComponents = selectedCategory === 'all' 
    ? components 
    : components.filter(c => c.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 py-10 text-center relative flex items-center justify-center overflow-hidden h-48">
        <div className="relative max-w-4xl mx-auto flex flex-col gap-2">
          <h1 className="text-4xl font-bold">A Little Taste</h1>
          <p className="text-lg opacity-90">A collection of refined UI components and interactions</p>
        </div>
      </header>

      <nav className="sticky top-0 z-10 px-4">
        <div className="flex gap-4 bg-wihte opacity-90 backdrop-blur-lg h-12">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category ? 'font-bold' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <main className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className='flex flex-col gap-4 h-full border border-gray-100 rounded-[16px] p-4 hover:shadow-lg hover:translate-y-[-4px] transition-shadow transition-transform duration-300 cursor-pointer'
            >
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-l font-bold">{component.title}</h3>
                  {component.originLink && <a href={component.originLink} className="text-gray-500 text-sm">
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.7073 9.56521L9.85801 24.4145C6.34329 27.9292 6.34329 33.6277 9.85801 37.1424V37.1424C13.3727 40.6571 19.0712 40.6571 22.5859 37.1424L40.2636 19.4647C42.6067 17.1216 42.6067 13.3226 40.2636 10.9794V10.9794C37.9205 8.63628 34.1215 8.63628 31.7783 10.9794L14.1007 28.6571C12.9291 29.8287 12.9291 31.7282 14.1007 32.8997V32.8997C15.2722 34.0713 17.1717 34.0713 18.3433 32.8997L33.1925 18.0505" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>}
                </div>
                
                <p className="text-xs text-gray-500">{component.description}</p>
                
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-gray-500 text-xs">{component.date}</span>
                  <div className="flex gap-2">
                    {component.tags.map(tag => (
                      <span key={tag} className="text-gray-500 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-48 bg-gray-100 rounded-[12px] border border-gray-200">
              {component.component ? <div className="flex items-center justify-center w-full h-full">
                    {component.component}
                </div>:<div className="flex gap-2 items-center justify-center h-full">
                    <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
