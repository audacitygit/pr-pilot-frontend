import { Route, Routes, useNavigate, useParams } from "react-router"

import { Home, Settings } from "lucide-react"
import Dashboard from "./pages/Dashboard"
import { BaseLayout } from "./components/BaseLayout"



const menuItems = [
  { label: "Profile", onClick: () => alert("Go to Profile") },
  { label: "Settings", onClick: () => alert("Go to Settings") },
  { label: "Logout", onClick: () => alert("Logging Out...") },
]

const sideNavItems = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  { icon: <Settings size={20} />, label: "Settings", onClick: () => alert("Go to Settings") },
]

function App() {

  return (
    <BaseLayout logoSrc="/logo.png" headerTitle="PR Pilot" headerSubtitle="AI Reviewed Pull Requests" userProfile={{ name: "Audacitygit", avatarUrl: "/logo.png" }} menuItems={menuItems} sideNavItems={sideNavItems}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BaseLayout>
  )
}

export default App
