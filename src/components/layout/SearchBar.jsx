import Bell from "../../assets/icons/bell";
import Search from "../../assets/icons/lens";
import DownArrow from "../../assets/icons/downArrow";
import { AppContext } from "../../contexts/AppContext";
import User from "../../assets/icons/User";
import { React, Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../../assets/icons/Logout";
import SelectBox from "../common/SelectDropdown";
import { AccountContext } from "@/components/Authentication/Account";
const listValue = ["admin", "users"];
export default function Searchbar({ userNavigation, setSidebarOpen }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const { logout } = useContext(AccountContext);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 HeaderBg">
      <button
        type="button"
        className="-m-2.5 p-2.5 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        {/* <Sort
          color={"currentcolor"}
          className="h-6 w-6 text-black"
          aria-hidden="true"
        /> */}
      </button>

      {/* Separator */}
      <div className="h-6 w-px  lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ">
        <form
          className="relative flex flex-1 items-center"
          action="#"
          method="GET"
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="absolute  inset-y-0 left-3 h-full flex items-center">
            <Search
              color={"currentcolor"}
              className="pointer-events-none text-black w-5 "
            />
          </div>
          <input
            id="search-field"
            className="block py-2 rounded-lg w-full border-0 bg-background-alt pl-10 pr-0 font-normal  focus:ring-0 min-h-[40px] text-heading text-sm"
            placeholder="Search"
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="m-2.5 px-5 py-2 bg-background-alt  rounded-lg relative"
          >
            <Bell className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="absolute top-2 right-4 flex items-center justify-center bg-primary text-white px-1 text-[10px] rounded-full h-[14px] w-[14px]">
              2
            </span>
          </button>

          <Menu as="div" className="relative ">
            <Menu.Button className="-m-1.5 bg-background-alt flex items-center p-2 py-1  rounded-lg">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  User
                </span>
                <DownArrow
                  className="ml-2 h-5 w-5 text-body"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-[-6px] z-10 mt-2.5 w-[150px] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-border-subtle focus:outline-none">
                <ul role="list">
                  {userNavigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? " text-heading  flex gap-x-3 hover:bg-background-alt p-2 text-sm leading-6 "
                            : "text-heading  stroke-gray-700   group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                        }
                      >
                        <item.icon
                          color={"currentcolor"}
                          className="h-6 w-6 shrink-0  text-heading"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li
                    key="logout"
                    className="border-border-subtle border-t mt-3"
                  >
                    <button
                      onClick={logout}
                      type="button"
                      className="text-heading w-full flex gap-x-3 hover:bg-background-alt pt-2 px-2 text-sm leading-6 "

                      //onClick={()=> setLogoutStatus(true)}
                    >
                      <span className="sr-only">Logout</span>
                      <Logout
                        color={"currentcolor"}
                        className="h-6 w-6 shrink-0  text-heading"
                        aria-hidden="true"
                      />
                      Logout
                    </button>
                  </li>
                </ul>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
