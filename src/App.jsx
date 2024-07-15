import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import Labs from "./pages/Labs";
import Management from "./pages/Management";
import Project from "./pages/Project";
import SignIn from "./pages/SignIn";
import Test from "./pages/Test";
import Header from "./components/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Protected routes */}
        {/* <Route
          path="/createuser"
          element={
            <ProtectedRoute element={CreateUser} requiredRoutes={["admin"]} />
          }
        /> */}
        {/* <Route
          path="/labs"
          element={<ProtectedRoute element={Labs} requiredRoutes={["labs"]} />}
        /> */}
        {/* <Route element={<PrivateRoutes />}>
          {" "}
          <Route path="/home" element={<Home />} />
        </Route> */}
        <Route element={<ProtectedRoute requiredRoutes={["management"]} />}>
          <Route path="/management" element={<Management />} />
        </Route>

        <Route element={<ProtectedRoute requiredRoutes={["project"]} />}>
          <Route path="/project" element={<Project />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoutes={["createuser"]} />}>
          <Route path="/createuser" element={<CreateUser />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoutes={["labs"]} />}>
          <Route path="/labs" element={<Labs />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoutes={["test"]} />}>
          <Route path="/test" element={<Test />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoutes={["settings"]} />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
