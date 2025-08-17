// src/components/Nav.jsx
// Inline-styled Nav component that uses buttons + useNavigate()
// This avoids <a href="..."> so browsers won't show the URL on hover.
// Accessibility: buttons are keyboard-focusable; active route is exposed via aria-current="page".

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import littlelemon_logo from "../images/littlelemon_logo.png";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  const navStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    padding: "0 1rem",
    gap: 20,
  };

  const logoStyle = {
    width: 200,
    height: "auto",
    objectFit: "contain",
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    gap: "0.75rem",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const liStyle = {
    display: "inline-block",
    padding: "0.25rem 0.5rem",
  };

  const btnBase = {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    font: "inherit",
    cursor: "pointer",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "1rem",
    borderRadius: 8,
    height: "36px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const activeIndicator = {
    boxShadow: "inset 0 -3px 0 0 #F4CE14",
  };

  const focusStyle = {
    outline: "none",
    boxShadow: "0 0 0 4px rgba(99,102,241,0.12)",
  };

  // nav items (order + paths)
  const items = [
    { label: "Home", path: "/" },
    { label: "About", path: "#" },
    { label: "Menu", path: "/#" },
    { label: "Reservations", path: "/#" },
    { label: "Order Online", path: "/#" },
    { label: "Login", path: "/#" },
  ];

  return (
    <nav style={navStyle} aria-label="Primary navigation">
      <img src={littlelemon_logo} alt="Little Lemon Logo" style={logoStyle} />
      <ul style={ulStyle}>
        {items.map((it) => {
          const isActive = current === it.path;
          return (
            <li key={it.path} style={liStyle}>
              <button
                type="button"
                onClick={() => navigate(it.path)}
                // inline styles merged so active looks distinct
                style={{
                  ...btnBase,
                  ...(isActive ? activeIndicator : {}),
                }}
                // accessibility: indicate current page to assistive tech
                aria-current={isActive ? "page" : undefined}
                // keyboard focus visual (we add onFocus/onBlur to apply focus ring inline)
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = focusStyle.boxShadow;
                }}
                onBlur={(e) => {
                  // restore activeIndicator (if active) or remove shadow
                  e.currentTarget.style.boxShadow = isActive
                    ? activeIndicator.boxShadow
                    : "none";
                }}
              >
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;

