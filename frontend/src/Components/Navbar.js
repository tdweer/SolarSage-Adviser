import { link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <link to ="/">
                    <h1>Solar Sage Advisor</h1>
                </link>
            </div>
        </header>       
    )
}


export default Navbar;