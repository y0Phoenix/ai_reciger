/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import {Navigate, Outlet } from 'react-router-dom';
import State from '../types/State'

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated,
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
  // determines whether its protected routes or unprotected routes ex landing vs dashboard pages
  Protected: boolean
}

const ProtectedRoutes: React.FC<Props> = ({isAuthenticated, Protected}) =>  {
	// There is a logical error, the isAuthenticated boolean will always be null right away after a refresh.
	// So we need to make sure the proper authentication is completed before we can properly use the logic below
	if (isAuthenticated == null) {
		return null;
	}
	if (isAuthenticated) {
		if (Protected) {
			return <Outlet />;
		}
		return <Navigate to={'/dashboard'}/>;
	}
	else {
		if (Protected) {
			return <Navigate to={'/'}/>
		}
		return <Outlet />
	}
	return (
		<>
			{
				// if authenticated 
					// authenticated is true 
					// if Protected
						// Protected is true
						// render outlet which would be dashboard account page etc
					// else
						// navigate to dashboard the user is authorized to view the the protected routes
				// else
					// if Protected
						// Protected is true
						// navigate to home the user isn't authorized to view the outlet pages
					// else 
						// render outlet which would be the home page. this ternary is so that react doesn't navigate to '/' over and over forever
				isAuthenticated ? (Protected ? <Outlet /> : <Navigate to={'/dashboard'}/>) : (Protected ? <Navigate to={'/'}/> : <Outlet />)
			}
		</>
	);
}


export default connector(ProtectedRoutes);