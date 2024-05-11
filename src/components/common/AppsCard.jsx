import LockIcon from "../../assets/icons/LockIcon";
import { useEffect, useState, React, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function AppsCard({ item, index}) {
  const fullGrid = index === 0 ? 'col-span-3' : '';
  return (
    <div  className={`rounded-lg h-max relative bg-white  shadow-sm ring-1 ring-border-subtle lg:grid-cols-2 overflow-hidden ${fullGrid}`}>
      <div className="p-3 bg-background-alt flex justify-between  border-b border-border-subtle">
        <div className="flex flex-col">
          <h1 className="flex items-center">
            <span className="mr-2">{item.appName}</span>
          </h1>
        </div>
      </div>

      <div className="p-3">{item.description && <p>{item.description}</p>}</div>

      <div className="flex items-center gap-2 mt-6 pb-4  px-4">
        {item.actions.map((action, actionIndex) => (
          <div key={actionIndex} className=" ">
            <div className="btn btn-default">{action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppsCard;
