import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm md:text-base">&copy; {currentYear} Legal Injury Advocates. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            <a href="#" className="hover:text-primary-hover mx-2 my-1 text-sm transition-colors duration-200">Home</a>
            <a href="#" className="hover:text-primary-hover mx-2 my-1 text-sm transition-colors duration-200">Blog</a>
            <a href="#" className="hover:text-primary-hover mx-2 my-1 text-sm transition-colors duration-200">Terms and Conditions</a>
            <a href="#" className="hover:text-primary-hover mx-2 my-1 text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-primary-hover mx-2 my-1 text-sm transition-colors duration-200">CCPA</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer