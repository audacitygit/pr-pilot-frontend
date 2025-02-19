import { Route, Routes } from "react-router";
import { Home, Settings } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import { BaseLayout } from "./components/BaseLayout";
import Landing from "./pages/Landing";

const menuItems = [
  { label: "Profile", onClick: () => alert("Go to Profile") },
  { label: "Settings", onClick: () => alert("Go to Settings") },
  { label: "Logout", onClick: () => alert("Logging Out...") },
];

const sideNavItems = [
  { icon: <Home size={20} />, label: "Home", href: "/dashboard" },
  { icon: <Settings size={20} />, label: "Settings", onClick: () => alert("Go to Settings") },
];

function App() {
  return (
    <Routes>
      {/* Landing Page (No Layout) */}
      <Route path="/" element={<Landing />} />

      {/* Routes that should be wrapped in BaseLayout */}
      <Route
        path="/*"
        element={
          <BaseLayout
            logoSrc="/logo.png"
            headerTitle="PR Pilot"
            headerSubtitle="AI Reviewed Pull Requests"
            userProfile={{ name: "Audacitygit", avatarUrl: "/logo.png" }}
            menuItems={menuItems}
            sideNavItems={sideNavItems}
          >
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              {/* Add more routes here as needed */}
            </Routes>
          </BaseLayout>
        }
      />
    </Routes>
  );
}

export default App;
