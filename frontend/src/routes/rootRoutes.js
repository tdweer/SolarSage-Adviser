import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AdminIndexPage from "../pages/admin/AdminIndexPage";
import SignUp from "../pages/auth/SignUp";

function RootRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<SignUp/>}/>
                <Route path={'/admin'} element={<AdminIndexPage/>}/>
            </Routes>
        </Router>
    )
}

export default RootRoutes;
