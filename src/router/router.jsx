import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UnprotectedRoute } from "./components/UnprotectedRoute";
import { NotFound } from "../error/pages/NotFound";
import TestPage from "../debug/pages/TestPage";
import { LoginPage, RegisterPage } from "../sections/auth";
import { CurriculumsPage } from "../sections/curriculums";
import { SettingsPage } from "../sections/settings/pages/SettingsPage";
import { CurriculumNewPage } from "../sections/curriculums/pages/CurriculumNewPage";
import { MicrosoftAuthCallback } from "../sections/auth/pages/MicrosoftAuthCallback";
import { CurriculumProvider } from "../sections/curriculums/context/CurriculumContext";
import { CurriculumDetail } from "../sections/curriculums/pages/CurriculumDetail";

export const futures = {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
}

export const PublicRoutes = {
    path: "/auth/*",
    element: <UnprotectedRoute/>,
    errorElement: <NotFound/>,
    children: [
        {
            path: 'login',
            element: <LoginPage/>
        },
        {
            path: 'register',
            element: <RegisterPage/>
        },
        {
            path: 'callback',
            element: <MicrosoftAuthCallback/>
        },
    ]
}

export const PrivateRoutes =  {
    path: "/",
    element: <ProtectedRoute/>,
    errorElement: <NotFound/>,
    children: [
        {
            index: true,
            element: <CurriculumsPage/>
        }
        ,{
            path:'new',
            element: (<CurriculumNewPage/>)
        }
        ,{
            path:'curriculum/:id',
            element: (<CurriculumDetail/>)
        }
        ,{
            path:'settings',
            element: <SettingsPage/>
        }
    ]
}

export const DebugRoutes = {
    path: "/test",
    element: <TestPage/>
}

const routes = [
    DebugRoutes,
    PublicRoutes,
    PrivateRoutes
]

export const router = createBrowserRouter(routes,{
    future: futures
})