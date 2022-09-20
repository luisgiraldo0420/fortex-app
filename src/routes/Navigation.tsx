import React from 'react';
import routes from './routesAdmin';
import { map } from 'lodash';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
export function Navigation() {
  return (
    <BrowserRouter>
    <Routes> 
      {
        map(routes, (route: any, index: any) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          ></Route>
        ))
      }
      </Routes>
  </BrowserRouter>
);
}





/**
 *  <Routes>
      {
        routes ? 
        (map(routes, (route: any, index: any) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))) : 
          (
          <>

          </>
          )
      }
    </Routes>
 */