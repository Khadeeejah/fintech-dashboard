import React from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import routes from "./routes";
import { useStyles } from "./styles";
import Dashboard from "./pages/Dashboard";
import { ToastProvider } from 'react-toast-notifications';


const App = () => {
  const classes = useStyles();
  return (
    <ToastProvider>
<div className={classes.appRoot}>
      <BrowserRouter>
        <Navigation />
        <Dashboard />
        <div>
          <div className={classes.appBarSpacer}></div>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={<route.component/>}/>
              );
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </ToastProvider>
    
  );
};

export default App;
