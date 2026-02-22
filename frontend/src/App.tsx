import "./App.css"

import { BrowserRouter } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import PagesRouter from "@/routes/PagesRouter"


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-muted/30 text-foreground">
        <PagesRouter />
        <Toaster richColors position="top-right" />
      </div>
    </BrowserRouter>
  )
}

export default App
