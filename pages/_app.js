import '../styles/index.css'
import { TodosProvider } from '../contexts/TodosContext.js';

export default function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
    
  ) 
}
