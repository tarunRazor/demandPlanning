import React from "react";
import { Link } from "react-router-dom";
function UnAuthorised() {
  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base text-3xl font-bold  text-primary">403</p>
          <h1 className="mt-4 capitalize font-bold tracking-tight text-gray-900 sm:text-5xl">
            access denied
          </h1>
          <p className="mt-6 capitalize text-title leading-7 text-gray-600">
            you don't have permission to access this page
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link className="btn btn-secondary " to="/">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UnAuthorised;
