import { NavLink } from "react-router";

export default function NavMenu() {
    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/ricette'>Le mie Ricette</NavLink>
            <NavLink to='/about'>Chi siamo</NavLink>
        </nav>
    )
}