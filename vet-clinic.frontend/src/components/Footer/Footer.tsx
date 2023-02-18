import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer className="container bg-gray-700 px-2 py-10 to-bottom">
          <div className="px-7 border-b-gray-70">
            <div className="flex justify-between">
              <div>
                <p className="text-white">г. Казань</p>
                <p className="text-white">прос. Ямашева д.89</p>
              </div>
              <div className="flex">
                <p className="text-white m-auto">Project made by <a href="https://github.com/i-Nur23" style={{ color: "white" }}>
                  Ainur Iskhakov
                </a></p>
              </div>
            </div>

          </div>
        </footer>)
}

export default Footer
