import { Outlet } from "react-router";
import AppHeader from "./AppHeader";

export default function DefaultLayout() {

    return (
        <>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}