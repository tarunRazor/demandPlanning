import Home from "../../assets/icons/home";
import Bell from "../../assets/icons/bell";
import User from "../../assets/icons/User";
import FileIcon from "../../assets/icons/File";
import LocationIcon from "../../assets/icons/Location";
import mainlogo from "../../assets/logo.svg";
import ChartLines from "../../assets/icons/ChartLines";
import LockIcon from "../../assets/icons/LockIcon";
import MultiArrow from "../../assets/icons/MultiArrow";
import { Fragment, useState, useContext } from "react";
import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DownArrow from "../../assets/icons/downArrow";
import { Label } from "@radix-ui/react-select";
import { AppContext } from "@/contexts/AppContext";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  {
    type: "link",
    for: "dp_validation_team",
    name: "Dashboard",
    href: "/",
    icon: Home,
    current: true,
  },

  {
    type: "link",
    for: "dp_validation_admin",
    name: "Dashboard",
    href: "/",
    icon: Home,
    current: true,
  },
  {
    type: "link",
    for: "dp_validation_admin",
    name: "Core",
    icon: "",
    current: false,
    children: [
      {
        type: "link",
        for: "dp_validation_admin",
        name: "Core Demand Planning ",
        href: "/core",
        icon: FileIcon,
      },
      {
        type: "link",
        for: "dp_validation_admin",
        name: "Assign Reviews",
        href: "/core/assign-reviews",
        icon: FileIcon,
      },
    ],
  },

  {
    type: "link",
    for: "dp_validation_admin",
    name: " Non-Core",
    Label: "Non-Core",

    icon: "",
    children: [
      {
        type: "link",
        name: "Latam",
        href: "/latam",
        icon: LocationIcon,
        current: false,
      },
      {
        type: "link",
        name: "NPD",
        href: "/npd",
        icon: FileIcon,
        current: false,
      },
      {
        type: "link",
        name: "Geo Expansion",
        href: "/geo-expansion",
        icon: MultiArrow,
        current: false,
      },
      {
        type: "link",
        name: "D2C & OSC",
        href: "/d2c-and-osc",
        icon: ChartLines,
        current: false,
      },
    ],
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { userGroups } = useContext(AppContext);

  const location = useLocation();
  const isCoreActive = location.pathname.includes("core");
  const { sidebarCollapse, setSidebarCollapse } = useContext(AppContext);
  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <User className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                {/* <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-[0px 5px 12px 0px rgba(0, 0, 0, 0.10)]">
                  <div className="flex h-16 shrink-0 items-center justify-center">
                    <img src={mainlogo} className="logo" alt="razor logo" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-background-alt text-primary"
                                    : "text-gray-700 hover:text-primary hover:bg-background-alt group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-bold"
                                }
                              >
                                <item.icon
                                  color={"currentcolor"}
                                  className={classNames(
                                    item.current
                                      ? "text-primary fill-primary"
                                      : " fill-black group-hover:text-primary",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li className="mt-auto">
                      <NavLink
                       
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 leading-6  hover:text-primary"
                        >
                          <User
                            color={"currentcolor"}
                            className="h-6 w-6 shrink-0  text-black"
                            aria-hidden="true"
                          />
                          Settings
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div>
        <div
          data-collapsed={sidebarCollapse}
          className="hidden
       
       data-[collapsed=true]:max-w-12
       data-[collapsed=false]:lg:w-72

         lg:fixed lg:inset-y-0 lg:z-50 lg:flex  lg:flex-col shadow-xl"
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto   bg-white px-6 pb-4 data-[collapsed=true]:p-0">
            <div className="flex h-16 shrink-0 items-center">
              <h3 className="text-primary font-bold" hidden></h3>

              <img src={mainlogo} className="logo" alt="razor logo" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item, index) =>
                      item.for && userGroups.includes(item.for) ? (
                        <div key={item.name}>
                          {sidebarCollapse ? (
                            <TooltipProvider>
                              <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                  <NavLink href="#">
                                    {item.icon && (
                                      <item.icon
                                        className="h-6 w-6 shrink-0 hover:stroke-primary"
                                        aria-hidden="true"
                                      />
                                    )}
                                    <span className="sr-only">
                                      {item.title}
                                    </span>
                                  </NavLink>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="right"
                                  className="flex items-center gap-4"
                                >
                                  {item.name}
                                  {item.name && (
                                    <span className="ml-auto text-muted-foreground">
                                      {item.name}
                                    </span>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <>
                              {item.type === "header" ? (
                                <li
                                  className="text-heading tracking-wide  stroke-gray-700  group flex uppercase gap-x-3 rounded-md pb-0 px-2 pt-2 text-subtitle lett leading-6"
                                  key={item.name}
                                >
                                  {item.name}
                                </li>
                              ) : (
                                <li key={item.name}>
                                  {!item.children ? (
                                    <NavLink
                                      key={item.name}
                                      to={item.href}
                                      className={({ isActive }) =>
                                        isActive
                                          ? "bg-background-alt text-heading stroke-primary group-hover:text-primary flex gap-x-3 rounded-md p-2 text-sm leading-6 font-bold"
                                          : "text-heading  stroke-gray-700  hover:bg-background-alt group flex gap-x-3 rounded-md p-2 text-sm leading-6 items-center"
                                      }
                                    >
                                      {item.icon && (
                                        <item.icon
                                          className="h-6 w-6 shrink-0 hover:stroke-primary"
                                          aria-hidden="true"
                                        />
                                      )}
                                      {item.name}
                                    </NavLink>
                                  ) : (
                                    <Disclosure as="div">
                                      {({ open, current }) => (
                                        <>
                                          {item.type === "header" ? (
                                            <li
                                              className="text-heading tracking-wide  stroke-gray-700  group flex uppercase gap-x-3 rounded-md pb-0 px-2 pt-2 text-subtitle lett leading-6"
                                              key={item.name}
                                            >
                                              <Disclosure.Button
                                                className={classNames(
                                                  open
                                                    ? "bg-background-alt"
                                                    : " ",
                                                  "flex items-center w-full text-left  hover:bg-background-alt rounded-md p-2 gap-x-3 text-sm leading-6  text-heading ChildItems"
                                                )}
                                              >
                                                {item.icon && (
                                                  <item.icon
                                                    className="h-6 w-6 shrink-0 hover:stroke-primary"
                                                    aria-hidden="true"
                                                  />
                                                )}
                                                <span>{item.name} </span>
                                                <DownArrow
                                                  className={classNames(
                                                    open
                                                      ? "rotate-180 ml-auto text-body"
                                                      : "text-body rotate-160",
                                                    " transition-all w-5 h-6 ml-auto"
                                                  )}
                                                  aria-hidden="true"
                                                />
                                              </Disclosure.Button>
                                            </li>
                                          ) : (
                                            <NavLink
                                              to={item.href != "" && item.href}
                                              key={item.name}
                                              item={item.href}
                                            >
                                              <Disclosure.Button
                                                className={classNames(
                                                  open ? "" : " ",
                                                  "flex items-center w-full text-left  hover:bg-background-alt rounded-md p-2 gap-x-3 text-sm leading-6  text-heading ChildItems"
                                                )}
                                              >
                                                {item.icon && (
                                                  <item.icon
                                                    className="h-6 w-6 shrink-0 hover:stroke-primary"
                                                    aria-hidden="true"
                                                  />
                                                )}
                                                <span>{item.name} </span>
                                                <DownArrow
                                                  className={classNames(
                                                    open
                                                      ? "rotate-180 ml-auto text-body"
                                                      : "text-body rotate-160",
                                                    " transition-all w-5 h-6 ml-auto"
                                                  )}
                                                  aria-hidden="true"
                                                />
                                              </Disclosure.Button>
                                            </NavLink>
                                          )}
                                          <Disclosure.Panel
                                            as="ul"
                                            className="mt-1 "
                                          >
                                            {item.children.map((subItem) => (
                                              <li key={subItem.name}>
                                                <NavLink
                                                  to={subItem.href}
                                                  className={({ isActive }) =>
                                                    isActive
                                                      ? "bg-background-alt text-heading stroke-primary group-hover:text-primary flex gap-x-3 rounded-md p-2 text-sm leading-6 font-bold"
                                                      : "text-heading  stroke-gray-700  hover:bg-background-alt group flex gap-x-3 rounded-md p-2 text-sm leading-6 items-center"
                                                  }
                                                >
                                                  {subItem.icon && (
                                                    <subItem.icon
                                                      className="h-6 w-6 shrink-0 hover:stroke-primary transition-all"
                                                      aria-hidden="true"
                                                    />
                                                  )}

                                                  {subItem.name}
                                                </NavLink>
                                              </li>
                                            ))}
                                          </Disclosure.Panel>
                                        </>
                                      )}
                                    </Disclosure>
                                  )}
                                </li>
                              )}
                            </>
                          )}
                        </div>
                      ) : null
                    )}
                  </ul>
                </li>

                {/* <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm  leading-6 text-black  hover:bg-background-alt "
                >
                  <User
                    color={"currentcolor"}
                    className="h-6  w-6 shrink-0 text-heading "
                    aria-hidden="true"
                  />
                  Settings
                </a>
              </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
