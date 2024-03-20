/* eslint-disable react-refresh/only-export-components */
import { Container, Form, FormControl, InputGroup, Button, Row, Col } from 'react-bootstrap';
import State from '../types/State';
import { ConnectedProps, connect } from 'react-redux';
import React, { useEffect } from 'react';
import { getRecipeById, getRecipes } from '../actions/recipe';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
    recipes: state.recipe.recipes,
});

const connector = connect(mapStateToProps, { getRecipes, getRecipeById });

type Props = ConnectedProps<typeof connector>;

const DashboardLayout: React.FC<Props> = ({ recipes, getRecipes, getRecipeById }) => {
    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditRecipe = (e: any) => {
        console.log("start");
        e.preventDefault();
        const id = Number(e.currentTarget.id);
        if (!isNaN(id)) {
            console.log("init get");
            return getRecipeById(id, navigate);
        }
        alert("Error");
    }

    return (
        <Container fluid className='bg-dark text-white p-4 rounded-4 w-100'>
            <h1>Recipe Search</h1>
            <Form className="mb-4">
                <InputGroup className='mb-3'>
                    <InputGroup.Text className='basic-addon1'>
                        <i className="fa-solid fa-magnifying-glass" />   
                    </InputGroup.Text>    
                    <FormControl type="text" placeholder="Search for recipes..."/>
                </InputGroup>    
            </Form>
            <Container className='bg-dark-2 p-4 rounded-2 d-flex-row'>
                <Row>
                    <Col>
                        <h2>Name</h2>
                    </Col>
                    <Col>
                        <h2>Servings</h2>
                    </Col>
                    <Col>
                        <h2 className='me-5'>Actions</h2>
                    </Col>
                </Row>
                {/* <Row xs={1} md={2} lg={3} className="g-4"> */}
                {recipes.map(recipe => (
                    <Row className='bg-dark p-4 m-2 text-white rounded-3' style={{width: "1100px"}}>
                        <Col>
                            <h4 style={{cursor: "pointer"}} onClick={handleEditRecipe} id={`${recipe.recipe.id}`}>{recipe.recipe.name}</h4>
                        </Col>
                        <Col>
                            <h4>{recipe.recipe.servings}</h4>
                        </Col>
                        <Col>
                            <div>
                                <Button variant="primary" className="me-2" onClick={handleEditRecipe} id={`${recipe.recipe.id}`}>Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </div>
                        </Col>
                        </Row>
                        // <Container className='d-flex align-items-center justify-content-between bg-dark p-4 m-2 text-white rounded-3' style={{width: "1100px"}} key={recipe.recipe.id}>
                        // </Container>
                    ))}
                {/* </Row> */}
            </Container>
        </Container>
    );
}

export default connector(DashboardLayout);
