import { ExercisesPage } from './pages/ExercisesPage'
import { Sidebar } from './components/Sidebar'
import './App.css'

function App() {
  return (
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <ExercisesPage />
        </main>
      </div>
  )
}

export default App