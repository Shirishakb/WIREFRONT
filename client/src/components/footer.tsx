import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer" className="footer footer-expand-lg footer-dark bg-dark">
            <Link target="_blank" className="footerLink" to="https://github.com/Shirishakb">
                <img className="footerImg" src="https://avatars.githubusercontent.com/u/176852650?v=4" alt="Shirishakb" />
                <h3 className="footerH3">Shirisha</h3>
            </Link>
            <Link target="_blank" className="footerLink" to="https://github.com/dylprograms">
                <img className="footerImg" src="https://avatars.githubusercontent.com/u/174823570?v=4" alt="dylprograms" />
                <h3 className="footerH3">Daniel</h3>
            </Link>
            <Link target="_blank" className="footerLink" to="https://github.com/eslickjr">
                <img className="footerImg" src="https://avatars.githubusercontent.com/u/66076336?v=4" alt="eslickjr" />
                <h3 className="footerH3">Josh</h3>
            </Link>
            <Link target="_blank" className="footerLink" to="https://github.com/PotatoDoge1">
                <img className="footerImg" src="https://avatars.githubusercontent.com/u/81260899?v=4" alt="PotatoDoge1" />
                <h3 className="footerH3">Ryan</h3>
            </Link>
        </footer>
    );
}

export default Footer;