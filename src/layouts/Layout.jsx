import { useState } from 'react'
 import { Outlet } from 'react-router-dom'
  import Navbar from '../components/Navbar'
   import Sidebar from '../components/Sidebar' 
   export default function Layout() { const [sidebarOpen, setSidebarOpen] = useState(false) 
    return ( <div className="min-h-screen bg-bg flex flex-col"> <Navbar onMenuClick={() => setSidebarOpen(true)} /> <div className="flex flex-1"> <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> <div className="flex-1 min-w-0"> <Outlet /> </div> </div> </div> ) } 