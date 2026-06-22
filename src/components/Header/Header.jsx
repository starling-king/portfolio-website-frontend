import React from "react";
import { LogoutBtn, Container } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Header() {
  const authstatus = useSelector((state) => state.AuthReducer.status);
  const navigate = useNavigate();


  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Contact",
      url: "/contact",
      active: true,
    },
    {
      name: "Project",
      url: "/project",
      active: authstatus,
    },
     {
      name:"Login",
      url:"/login",
      active:!authstatus
    },
     {
      name:"SignUp",
      url:"/signUp",
      active:!authstatus
    },
  ];

  return (
    <header className="">
      <Container>
        <nav>
          <ul className="flex ml-auto">
            {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.url)} className="">{item.name}</button>
                </li>
              ):null
            )}

            {authstatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}

          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header;
