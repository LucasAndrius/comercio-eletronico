import React from 'react';
import { HeaderArea } from './styled';
import {Link} from 'react-router-dom';

import {isLogged, doLogout} from '../../../helpers/AuthHandler';

const Header =  () => {

    let logged = isLogged();

    const handleLogout = () =>{
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
           <div className="container">
               <div className="logo">
                <Link to="/">
                    <span className="logo-1">C</span>
                    <span className="logo-2">M</span>
                    <span className="logo-3">E</span>
                    Online
                </Link>
               </div>

               <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/my-account" >Minha Conta</Link>
                                </li>
                                <li>
                                    <Link to="/post-an-ad" className="button">Novo anúncio</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                
                            </>
                        }

                        {!logged &&
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="signup">Cadastrar</Link>
                                </li>
                            </>
                        }
                       
                       
                    </ul>
               </nav>
           </div>
        </HeaderArea>
    );
}

export default Header;