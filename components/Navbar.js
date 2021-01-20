import React from 'react';

// import { Container } from './styles';

export default function NavBar({user}) {
  return ( 
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">My Todos</p>
      <div className="flex">
        {user && (
          <a 
          href="/api/logout"
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Logout
          </a>
        )}

        {!user && (
          <a 
          href="/api/login"
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Login
          </a>
        )}
       
       
      </div>
    </nav>
  )


}
