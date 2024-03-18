import { LoginComponent } from '@modules/login/login.component';
import { RegistrationComponent } from '@modules/registration/registration.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Error404Component } from '@shared/components/pages/error404.component';
import { HomeComponent } from '@modules/home/home.component';
import { menuList } from '@constants/menu';
import { PrivateRoute } from '@shared/helper/route-filter.helper';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/create-account' element={<RegistrationComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/pagenotfound' element={<Error404Component />} />

        <Route path='/' element={
          <PrivateRoute allowedRoles={["*"]}>
            <HomeComponent />
          </PrivateRoute>
        }>
          {
            menuList.map((menuItem) => {
              return (
                <Route
                  key={menuItem.path}
                  path={menuItem.path}
                  element={
                    <PrivateRoute allowedRoles={menuItem.allowedRoles}>
                      {menuItem.component}
                    </PrivateRoute>
                  }
                />
              )
            })
          }
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
