//import styles from "./Navbar.module.css"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, signOutFunc } from "../Components/Firebase";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const SignOut = (e) => {
    e.preventDefault();
    if (confirm("Are you sure want to Logout?")) {
      signOutFunc(auth).then(() => {
        router.push("/");
      });
    } else {
      // do nothing
    }
  };

  return (
    <div className="navbar p-0">
      <input type="checkbox" id="navbar-check" />
      <div className="navbar-header">
        <div className="navbar-title">
          <Link className="nav-link" href="/">
            NEXT FIREBASE APP
          </Link>
        </div>
      </div>
      <div className="navbar-btn">
        <label htmlFor="navbar-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {user ? (
        <div className="navbar-links">
          <Link href="/profile">{user.displayName || user.email}</Link>
          <Link href="/add-product">Add Product</Link>
          <Link href="" onClick={SignOut}>
            LOGOUT
          </Link>
        </div>
      ) : (
        <div className="navbar-links">
          <Link href="/login">LOGIN</Link>
          <Link href="/register">REGISTER</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
