import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { assets } from "../../public/assets";
import Image from "next/image";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [theme, setTheme] = useState("");

  useLayoutEffect(() => {
    const stored = localStorage.theme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const resolved = stored || (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", resolved === "dark");
    setTheme(resolved);
  }, []);

  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    localStorage.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50
        ${
          isScroll
            ? "bg-white/70 dark:bg-gray-950 backdrop-blur-md shadow dark:shadow-gray-400"
            : ""
        }`}
      >
        <a href="#top">
          <img src={assets.logo} alt="" className="w-28 cursor-pointer mr-14" />
        </a>
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
          ${
            isScroll
              ? ""
              : "bg-white/70 dark:bg-gray-950 backdrop-blur-md shadow-md dark:shadow-gray-400 dark:shadow-sm"
          } `}
        >
          <li>
            <a className="font-ovo" href="#top">
              Home
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#contact">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode}>
            <img
              src={theme === "dark" ? assets.sun_icon : assets.moon_icon}
              alt=""
              className="w-6"
            />
          </button>

          <button className="block md:hidden ml-3" onClick={openMenu}>
            <img
              src={theme === "dark" ? assets.menu_white : assets.menu_black}
              alt=""
              className="w-6"
            />
          </button>
        </div>

        {/** mobile menu */}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed
        -right-64 top-0 bottom-0 w-64 z-50 h-screen 
         bg-white dark:bg-zinc-900 text-black dark:text-white
          transition duration-500"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <img
              src={assets.close_black}
              alt=""
              className="w-5 cursor-pointer"
            />
          </div>
          <li>
            <a className="font-ovo" href="#top" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#projects" onClick={closeMenu}>
              Projects
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
