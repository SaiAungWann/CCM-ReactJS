import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";
import useTheme from "../../hook/useTheme";

export default function Layout() {
  const location = useLocation(); // for patchname (location.pathname)

  let { isDark } = useTheme();

  // fixing the bug when switching the pages
  useEffect(() => {
    let body = document.body;
    if (isDark) {
      body.classList.add("bg-dbg");
    } else {
      body.classList.remove("bg-dbg");
    }
  }, [isDark]);

  // console.log(location.pathname);
  return (
    <div className={`${isDark ? `bg-dbg` : ""}`}>
      <Navbar />
      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <div className=" max-w-6xl mx-auto p-3">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
