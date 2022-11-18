import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                Alfath Muqoddas
                </div>
            </div>
            <div className="nav-btn">
                <label for="nav-check">
                <span></span>
                <span></span>
                <span></span>
                </label>
            </div>
            
            <div className="nav-links">
                <a href="//github.io/alfathmuqoddas" target="_blank">Github</a>
                <a href="https://id.linkedin.com/id/alfathmuqoddas" target="_blank">LinkedIn</a>
                <a href="https://codepen.io/alfathmuqoddas/" target="_blank">Codepen</a>
            </div>
        </div>
    )
}

export default Navbar;