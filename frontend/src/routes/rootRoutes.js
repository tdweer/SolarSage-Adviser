import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AdminIndexPage from "../pages/admin/AdminIndexPage";

function RootRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<AdminIndexPage/>}/>
            </Routes>
        </Router>
    )
}

export default RootRoutes;
