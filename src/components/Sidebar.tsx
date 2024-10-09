import React, { useState, useEffect } from 'react'
import { Home, FileText, Users, Settings, HelpCircle, Menu } from 'lucide-react'
import LIAExtendedLogo from './LIAExtendedLogo'

interface SidebarProps {
  onNavigate: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(-1)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust this breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { icon: Home, label: 'Dashboard', action: () => onNavigate('dashboard') },
    { icon: FileText, label: 'Documents', action: () => onNavigate('documents') },
    { icon: Users, label: 'User Information', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: HelpCircle, label: 'Help', action: () => {} },
  ]

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen)
      if (!isMenuOpen) {
        setActiveMenuItemIndex(0)
        const interval = setInterval(() => {
          setActiveMenuItemIndex(prevIndex => {
            if (prevIndex >= menuItems.length - 1) {
              clearInterval(interval)
              return prevIndex
            }
            return prevIndex + 1
          })
        }, 100)
      } else {
        setActiveMenuItemIndex(-1)
      }
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div
      className={`bg-primary text-white h-screen p-4 transition-all duration-300 ${
        isMobile ? 'w-16' : isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className="flex items-center justify-between mb-8">
        {!isMobile && isExpanded ? (
          <LIAExtendedLogo className="w-48 h-auto" />
        ) : (
          <div className="w-8 h-8 bg-white rounded-full"></div>
        )}
        <button
          onClick={toggleMenu}
          className="p-1 rounded-full hover:bg-primary-light transition-colors duration-200"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`mb-4 transition-all duration-300 ease-in-out ${
                isMobile && !isMenuOpen ? 'hidden' : ''
              } ${
                isMobile && isMenuOpen && activeMenuItemIndex >= index ? 'opacity-100 translate-x-0' : isMobile && isMenuOpen ? 'opacity-0 -translate-x-full' : ''
              }`}
            >
              <button
                onClick={item.action}
                className="flex items-center w-full p-2 rounded hover:bg-primary-light transition-colors duration-200"
              >
                <item.icon 
                  size={20} 
                  className={`transition-all duration-300 ease-in-out ${
                    (!isMobile && isExpanded) ? 'mr-3' : 'mx-auto'
                  }`} 
                />
                {(!isMobile && isExpanded) && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar