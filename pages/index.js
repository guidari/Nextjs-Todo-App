import Head from 'next/head'
import NavBar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContext } from '../contexts/TodosContext'
import { useEffect, useContext } from 'react'
import auth0 from './api/utils/auth0'
import TodoForm from '../components/TodoForm'

export default function Home({initialTodos, user}) {
  console.log(user)

  const {todos, setTodos} = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div className="px-5">
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar user={user}/>
      <main>
        {user && (
          <>
            <hr/>
            <h1 className="text-2xl text-center mb-4 my-5">Welcome, {user.nickname}</h1>
            <TodoForm/>
            <ul>
              {todos && 
                todos.map(todo => (
                  <Todo key={todo.id} todo={todo}/>
                ))
              }
              
            </ul>
          </>
        )}
        {!user && 
          <>
            <div class="relative py-3 sm:max-w-xl sm:mx-auto my-10">
              <div class="absolute bg-gradient-to-r from-blue-600 inset-0 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
              <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <p className="text-center my-3 font-medium">You should log in to save your TODOs</p>
              </div>
            </div>
          </> 
        }
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];

  try {
    if(session?.user) {
      todos = await table
        .select({
        filterByFormula: `userId = '${session.user.sub}'`,
      }).firstPage();
    }
   
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      }
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
 
}
