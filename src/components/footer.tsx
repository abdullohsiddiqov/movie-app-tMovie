import logo from '../assets/images/logo-dark.png'
import '../assets/styles/footer.css'

export function Footer(){ 
    return(
        <>
        <div className="footer">
        <footer>
            <div className="mainlogo">
                <img src={logo} alt="" className='logoo'/>
            </div>
            <div className="gridd">
            <ul className="text-ul">
                <li className="text-center">Live</li>
                <li className="text-center">You Must Watch</li>
                <li className="text-center">Home</li>
                <li className="text-center">Contact Us</li>
                <li className="text-center">FAQ</li>
                <li className="text-center">About Us</li>
                <li className="text-center">Premium</li>
                <li className="text-center">Privacy Policy</li>
                <li className="text-center">Top IMDB</li>
                <li className="text-center">Recent Release</li>
                <li className="text-center">Term Of Services</li>
            </ul>
            </div>
        </footer>
        </div>
        </>
    )
}