import { useEffect, useState } from "react"
import LandingPage from "./pages/LandingPage"
import { useAuth } from "./context/authContextAndApi"
import './index.css'
import { Loader2 } from "lucide-react"
import { AuthProvider } from "./AuthProvider"
import AuthPage from "./pages/AuthPage"
import TodoAppPage from "./pages/TodoAppPage"
import { Toaster } from "react-hot-toast"

const AppRouter = () => {
  const { user, isLoading } = useAuth();
  const [page, setPage] = useState("landing");

  const handleNavigate = (targetPage) => {
    setPage(targetPage);
  };

  useEffect(() => {
    if (user) {
      setPage("todo");
    } else if (!user && page !== 'landing' && !isLoading) {
      setPage("landing");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-indigo-400 text-xl">
        <Loader2 className="w-8 h-8 animaite-spin mr-3" /> Initializing Application...
      </div>
    )
  };

  let CurrentPage;

  if (user) {
    CurrentPage = TodoAppPage;
  } else {
    switch (page) {
      case 'auth':
        CurrentPage = AuthPage;
        break;
      case 'landing':
      default:
        CurrentPage = LandingPage;
        break;
    }
  }

  const PageComponent = CurrentPage;

  return (
    <PageComponent onNavigate={handleNavigate} />
  )

}

function App() {

  return (
    <>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              border: '1px solid #4f46e5'
            },
            duration: 3000
          }}
        />
      </AuthProvider>

    </>
  )
}

export default App
