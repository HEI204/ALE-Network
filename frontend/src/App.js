import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";
import PostList from "./pages/PostList";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./App.css";

const AuthPage = lazy(() => import("./pages/AuthPage"));

function App() {
  return (
    <div className="App">
      <div className="container-xs">
        <div className="row g-0">
          <BrowserRouter>
            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<PostList type="all" />} />
                  <Route
                    path="following_posts"
                    element={
                      <ProtectedRoute>
                        <PostList type="following" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="liked_posts"
                    element={
                      <ProtectedRoute>
                        <PostList type="liked" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":username/profile"
                    element={<UserProfilePage />}
                  />
                </Route>
                <Route
                  path="/login"
                  element={
                    <Suspense
                      fallback={
                        <h1 className="text-center mt-5">Loading....</h1>
                      }
                    >
                      <AuthPage authMode={"login"} />
                    </Suspense>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Suspense
                      fallback={
                        <h1 className="text-center mt-5">Loading....</h1>
                      }
                    >
                      <AuthPage authMode={"register"} />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={<div>This route does not exist...</div>}
                />
              </Routes>
            </AuthContextProvider>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
