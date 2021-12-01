import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header";
import Soon from "./components/soon.jsx";
import Home from "./pages/home";

function App() {
  return (
    <div className="w-full min-h-full bg-black text-gray-50">
      {/* <Header /> */}
      <main className="w-full min-h-full">
        <div className="max-w-7xl h-full mx-auto py-6 sm:px-6 lg:px-8 text-center">
          <div className="px-4 py-4 sm:px-0">
            <p className="font-mono">Coming soon</p>
            {/* <Routes>
              <Route path="/" element={<Home />} />
            </Routes> */}
          </div>
        </div>
        <Soon />
      </main>
    </div>
  );
}

export default App;
