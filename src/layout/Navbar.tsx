/* eslint-disable react-refresh/only-export-components */
import { Navbar, Nav, Button } from 'react-bootstrap';
import { showAIModal, showLoginModal, showRegisterModal } from '../actions/modal';
import { ConnectedProps, connect } from 'react-redux';
import State from '../types/State';
import { logout } from '../actions/user';
import { useNavigate } from 'react-router-dom';
import { clearCurrRecipe } from '../actions/recipe';

const mapStateToProps = (state: State) => ({
  user: state.user
});

const connector = connect(mapStateToProps, { showLoginModal, showRegisterModal, logout, clearCurrRecipe, showAIModal });

type Props = ConnectedProps<typeof connector>;

const NavigationBar: React.FC<Props> = ({ user, showLoginModal, showRegisterModal, logout, clearCurrRecipe, showAIModal }) => {
	const navigate = useNavigate();

	const handleNewRecipe = () => {
		clearCurrRecipe();
		navigate("/recipe/new");
	};

	const handleAIRecipe = () => {
		clearCurrRecipe();
		showAIModal();
	}

	return (
		<Navbar bg="dark" expand="lg" fixed="top">
			<Navbar.Brand href="/" className='ms-4 text-light bg-dark'>Reciger</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
				<Nav.Link href="/dashboard" className='text-light'>Home</Nav.Link>
				<Nav.Link href="/link" className='text-light'>Link</Nav.Link>
				<Nav.Link href="/about" className='text-light'>About</Nav.Link>
				<Nav.Link href="/contact" className='text-light'>Contact</Nav.Link>
			</Nav>
			{!user.isAuthenticated ?
			(
				<Nav className='me-4'>
				<Button variant="primary" onClick={showRegisterModal}>
					Register
					<i className="fa-solid fa-user-plus ms-2"></i>
				</Button>
				<Button variant="outline-primary" className="ms-2" onClick={showLoginModal}>
					Login
					<i className="fa-solid fa-right-to-bracket ms-2"></i>
				</Button>
				</Nav>
			)
			: 
			(
				<Nav className='me-4'>
				<Button variant="outline-primary" className="me-2" onClick={handleNewRecipe}>
					Create Recipe
					<i className="fa-solid fa-book ms-2"></i>
				</Button>
				<Button variant="primary" className="me-2" onClick={handleAIRecipe}>
					Generate AI Recipe
					<i className="fa-solid fa-microchip ms-2"></i>
				</Button>
				<Button variant="primary" onClick={logout}>
					Logout
					<i className="fa-solid fa-right-from-bracket ms-2"></i>
				</Button>
				</Nav>
			)
			}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default connector(NavigationBar);
