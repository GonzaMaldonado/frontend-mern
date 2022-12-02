import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import {WebRouter, AdminRouter} from "./router";
import {AuthProvider} from "./contexts"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <WebRouter />
        <AdminRouter />
      </Router>
    </AuthProvider>
    
  );
}

