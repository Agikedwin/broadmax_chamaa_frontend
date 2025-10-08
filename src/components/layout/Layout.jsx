// src/components/layout/Layout.jsx
import Sidebar from './Sidebar'

const Layout = ({ children, activeView, setActiveView }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout