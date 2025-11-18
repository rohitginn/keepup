import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "../constants/appData.js";

// Utility
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ScrollLink = ({ to, children, className = "", onClick = () => {} }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(to);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    onClick();
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={`cursor-pointer transition duration-300 ${className}`}
    >
      {children}
    </a>
  );
};

const NavbarContent = ({ navItems, setIsOpen, isOpen, onNavigate }) => (
  <nav>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="shrink-0">
          <span className="text-2xl font-extrabold text-indigo-400 tracking-wider">
            KeepUp
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.target}
              className="text-gray-300 hover:text-indigo-400 font-medium transition duration-300"
            >
              {item.name}
            </ScrollLink>
          ))}
          <button
            onClick={() => onNavigate("auth")}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-500 transition duration-300"
          >
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-gray-100 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Dropdown */}
    {isOpen && (
      <div className="md:hidden bg-gray-950/90 backdrop-blur-lg border-t border-gray-800">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.target}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
            >
              {item.name}
            </ScrollLink>
          ))}
          <button
            onClick={() => onNavigate("auth")}
            className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-indigo-500 transition duration-300 mt-2"
          >
            Get Started
          </button>
        </div>
      </div>
    )}
  </nav>
);

export default function Header({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navItems = NAV_ITEMS;

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isSticky
          ? "backdrop-blur-lg bg-gray-900/30  shadow-md shadow-indigo-900/20"
          : "bg-transparent"
      }`}
    >
      <NavbarContent
        navItems={navItems}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onNavigate={onNavigate}
      />
    </header>
  );
}
