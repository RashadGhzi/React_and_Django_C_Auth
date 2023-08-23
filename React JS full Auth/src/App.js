import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import Layout from "./Layout";
import Contact from "./component/pages/Contact";
import LoginReg from "./component/pages/auth/LoginReg";
import PasswordReset from "./component/pages/auth/PasswordReset";
import PasswordResetConfirm from "./component/pages/auth/PasswordResetConfirm";
import Dashboard from "./component/pages/Dashboard";
import Error from "./error/Error"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="auth" element={<LoginReg />} />
            <Route path="password/reset" element={<PasswordReset />} />
            <Route
              path="reset/password/confirm/:id/:token/"
              element={<PasswordResetConfirm />}
            />
            <Route path="error" element={<Error />} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
