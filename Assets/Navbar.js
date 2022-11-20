//import styles from "./Navbar.module.css"
import Link from "next/link";
import {useRouter} from "next/router";
import {auth} from "../Components/Firebase"
import {signOut} from "firebase/auth"

const Navbar = () => {
    const user = auth.currentUser;
	const router = useRouter();

	const SignOut = (e) => {
		e.preventDefault();
        if (confirm("Are you sure want to Logout?")) {
            signOut(auth).then(() => {
                router.push('/');
            });
        } else {
            // do nothing
        }
	}

    return (
        <div className="navbar p-0">
            <input type="checkbox" id="navbar-check" />
            <div className="navbar-header">
                <div className="navbar-title">
                <Link className="nav-link" href="/">NEXT FIREBASE APP</Link>
                </div>
            </div>
            <div className="navbar-btn">
                <label htmlFor="navbar-check">
                <span></span>
                <span></span>
                <span></span>
                </label>
            </div>
            {user ? 
              <div className="navbar-links">
                <Link href="/Profile">{user.displayName || user.email}</Link>
                <Link href="" onClick={SignOut}>LOGOUT</Link> 
              </div>
              :
              <div className="navbar-links">
                <Link href="/Login">LOGIN</Link>
                <Link href="/Register">REGISTER</Link>
              </div>  
            }
        </div>
    )
}

export default Navbar;