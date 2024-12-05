import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Error from "./pages/Error";
import ResetNewPassword from "./pages/ResetNewPassword";
import ForgotPasswordToken from "./pages/ForgotPasswordToken";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { useSelector } from "react-redux";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard";
import ManageCategories from "./components/core/Dashboard/ManageCategories";
import PaymentHistory from "./components/core/Dashboard/PaymentHistory";

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route
          path="/catalog/:catalogName"
          element={<Catalog></Catalog>}
        ></Route>

        <Route
          path="/courses/:courseId"
          element={<CourseDetails></CourseDetails>}
        ></Route>

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/reset-password"
          element={
            <OpenRoute>
              <ForgotPasswordToken></ForgotPasswordToken>
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/reset-password/:id"
          element={
            <OpenRoute>
              <ResetNewPassword></ResetNewPassword>
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail></VerifyEmail>
            </OpenRoute>
          }
        ></Route>

        <Route path="/about" element={<AboutUs></AboutUs>}></Route>

        <Route path="/contact" element={<ContactUs></ContactUs>}></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile></MyProfile>}
          ></Route>

          <Route
            path="/dashboard/settings"
            element={<Settings></Settings>}
          ></Route>

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses></EnrolledCourses>}
              ></Route>

              <Route path="/dashboard/cart" element={<Cart></Cart>}></Route>

              <Route
                path="/dashboard/payment-history"
                element={<PaymentHistory></PaymentHistory>}
              ></Route>
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/my-courses"
                element={<MyCourses></MyCourses>}
              ></Route>

              <Route
                path="/dashboard/instructor"
                element={<InstructorDashboard></InstructorDashboard>}
              ></Route>

              <Route
                path="/dashboard/add-course"
                element={<AddCourse></AddCourse>}
              ></Route>

              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse></EditCourse>}
              ></Route>
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <Route
              path="/dashboard/manage-categories"
              element={<ManageCategories></ManageCategories>}
            ></Route>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse></ViewCourse>
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails></VideoDetails>}
            ></Route>
          )}
        </Route>

        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
