import "./Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="footer-text">
                &copy; {year} TaskFlow — Built with the MERN Stack
            </p>
        </footer>
    );
}