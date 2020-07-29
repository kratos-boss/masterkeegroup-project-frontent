import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './layouts/dashboard';
import Login from './layouts/login';
import PublicFiles from './layouts/publicFiles';
import PageNotFound from './layouts/pageNotFound';
import { useAuthState } from './contexts/authenticationProvider'

const PublicRoutes = ({component,...rests }) => {
  return (
    <Route 
    {...rests }
    component={function(props){
      if(sessionStorage.getItem("isAuthentication")){
        return <Redirect 
        exact
        to={{
          pathname:"/",
          state: {
            from: props.location,
            }
            }}
            />
          }else{
            return React.createElement(component, props)
          }
        }}
        />
        )
      }
      const PrivateRoutes = ({ component , token,...rests }) => {
       
        return (
          <Route 
          {...rests}
          component={function(props){
            if(sessionStorage.getItem("isAuthentication")){
              return React.createElement(component, props);
            }else{
              return <Redirect 
              exact
              to={{
                pathname:"/login",
                state:{
                  from: props.location
                }
              }}
          />
        }
      }}
    />
  )
}

const Routes = (props) => {  
  const context = useAuthState();
  console.log(context)
  return (
    <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <PrivateRoutes  path="/dashboard" component={Dashboard} />
          <PublicRoutes path="/login" component={Login} />
          <Route path="/mastercloud/:url" component={ PublicFiles } />
          <Route component={ PageNotFound } />
       </Switch>
  )
}
export default Routes ;