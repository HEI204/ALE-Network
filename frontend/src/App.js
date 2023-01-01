import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { AuthContextProvider } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";
import Loading from "./components/Loading";
import PostList from "./pages/PostList";
import UserProfilePage from "./pages/UserProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ScrollToTop from "./helpers/ScrollToTop";

// import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";

const AuthPage = lazy(() => import("./pages/AuthPage"));

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <div className="container-xs">
        <div className="row g-0">
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ScrollToTop />
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
                      <Suspense fallback={<Loading />}>
                        <AuthPage authMode={"login"} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <Suspense fallback={<Loading />}>
                        <AuthPage authMode={"register"} />
                      </Suspense>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AuthContextProvider>
            </BrowserRouter>
            {/* <ReactQueryDevtools initialIsOpen={true} />  */}
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
