import React from 'react'; 
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userAction'
function Header(){

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    //console.log('logout')
    dispatch(logout())

  }

    return(
        <header>
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>MedInShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <LinkContainer to = '/koszyk'>
            <Nav.Link><i className='fas fa-shopping-cart'></i>Koszyk</Nav.Link>
           </LinkContainer>
           {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profil</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Wyloguj</NavDropdown.Item>

            </NavDropdown>
           ):(
            <LinkContainer to = '/login'>
            <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
            </LinkContainer>           
           )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
 );
}

export default Header;