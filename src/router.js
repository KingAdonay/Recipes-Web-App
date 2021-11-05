import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Card } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import Home from './views/Home';
import Details from './views/Details';
import CreatorsPage from './views/CreatorsPage';
import CategoriesPage from './views/CategoriesPage';
import FeaturedRecipes from './views/FeaturedRecipes';
import FavoriteList from './views/FavoriteList';
import About from './views/About';
import Spinner from './components/Spinner';
import ErrorComponent from './components/Error';

const CATEGORIES_QUERY = gql`
query MyQuery {
    categories {
      title
      thumbnail
    }
  }
`;


export default function MyRouter() {
    const { data, loading, error } = useQuery(CATEGORIES_QUERY);

    if (loading) return <Spinner size={100} />
    if (error) return <ErrorComponent />


    return (
        <BrowserRouter>
            <Card>
                <div>
                    <Navbar fixed="top" collapseOnSelect expand="lg" style={{ backgroundColor: "rgba(132, 214, 207, 0.8)", color: "#fff" }} variant="light">
                        <Container>
                            <Navbar.Brand><img
                                src="/assets/logo.png"
                                width="55"
                                height="40"
                                className="d-inline-block align-top"
                                alt="Recipes"
                            /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Item ><Link className="nav-link text-dark" to="/home">Home</Link></Nav.Item>
                                    <Nav.Item ><Link className="nav-link text-dark" to="/featured">Featured Recipes</Link></Nav.Item>
                                    <Nav.Item ><Link className="nav-link text-dark" to="/favourites">Favorite Recipes</Link></Nav.Item>
                                    <NavDropdown className="text-dark" title="Categories" id="collasible-nav-dropdown">
                                        {
                                            data.categories.map((category, index) => {
                                                return <NavDropdown.Item ><Link className="nav-link text-dark" to={{ pathname: "/categoriesPage", state: { category: category.title, img: category.thumbnail } }}>{category.title}</Link></NavDropdown.Item>
                                            })
                                        }
                                    </NavDropdown>
                                </Nav>
                                <Nav>
                                    <Nav.Item>
                                        <Link to={{pathname:"/creatorspage", state:{categories: data.categories}}} className="nav-link text-dark">My Recipes</Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/details">
                            <Details />
                        </Route>
                        <Route path="/creatorspage">
                            <CreatorsPage />
                        </Route>
                        <Route path="/categoriesPage">
                            <CategoriesPage />
                        </Route>
                        <Route path="/featured">
                            <FeaturedRecipes />
                        </Route>
                        <Route path="/favourites">
                            <FavoriteList />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Card>
            <footer style={{ backgroundColor: "rgba(181, 106, 106, 0.8)" }}>
                <div class="container py-3">
                    <div class="mb-2 mb-lg-0"><img src="img/logo.png" alt="" width="180" class="mb-3" />
                        <h6 class="text-uppercase font-weight-bold ">Contact Us.</h6>
                        <p><i class="bi bi-telephone-fill text-primary"></i> +251932207260</p>
                        <ul class="list-inline mt-2">
                            <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="bi bi-twitter"></i></a></li>
                            <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="bi bi-facebook"></i></a></li>
                            <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="bi bi-instagram"></i></a></li>
                            <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="bi bi-pinterest"></i></a></li>
                            <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="bi bi-vimeo"></i></a></li>
                        </ul>
                    </div>
                    <div class="container mt-4">
                        <div class="">
                            <h6 class="text-uppercase font-weight-bold mb-2">Privacy</h6>
                            <ul class="list-unstyled mb-0">
                                <li class="mb-1" ><Link to="/about" style={{ color: 'black' }} class="nav-link">About Us</Link></li>
                                <li class="mb-1" ><Link to="/about" style={{ color: 'black' }} class="nav-link">Terms </Link></li>
                                <li class="mb-1" ><Link to="/about" style={{ color: 'black' }} class="nav-link">Privacy Policies</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* <!-- Copyrights --> */}
                <div class=" py-2">
                    <div class="container text-center">
                        <p class="text-dark mb-0 py-2">© 2021 The Recipe Web App.</p>
                    </div>
                </div>
            </footer>
        </BrowserRouter>
    )
}