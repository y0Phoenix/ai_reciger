/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import State from '../types/State';
import { ConnectedProps, connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCurrRecipe, deleteRecipe, editRecipe, getRecipeById } from '../actions/recipe';
import { Ingredient, Recipe } from '../types/Recipe';
import LoadingButton from '../components/LoadingButton';
import { printPage } from '../utils/printPage';

const mapStateToProps = (state: State) => ({
    curr_recipe: state.recipe.currRecipe,
});

const connector = connect(mapStateToProps, { getRecipeById, clearCurrRecipe, editRecipe, deleteRecipe });

type Props = ConnectedProps<typeof connector>;

const RecipePage: React.FC<Props> = ({ curr_recipe, editRecipe, deleteRecipe, getRecipeById }) => {
    const [recipe, setRecipe] = useState<Recipe>(curr_recipe);
    const { pathname } = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == "instructions") return setRecipe({ ...recipe, instructions: e.target.value });
        setRecipe({
            ...recipe,
            recipe: {...recipe.recipe, [e.target.name]: e.target.value}
        });
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, field: keyof Ingredient) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[i] = {
            ...newIngredients[i],
            [field]: e.target.value
        };
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: newIngredients
        }));
    };
    
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        deleteRecipe(curr_recipe.recipe.id)
    };

    const handleEdit = () => editRecipe(recipe);

    const handlePrint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        printPage(recipe);
    }

    const id = Number(pathname.split('/recipe/').join(''));

    const navigate = useNavigate();

    useEffect(() => {
        if (curr_recipe.recipe.id == -1) getRecipeById(id, navigate);
        return () => {
            // clearCurrRecipe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setRecipe(curr_recipe);
    }, [curr_recipe]);

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body className='bg-dark p-5 rounded-3 text-white'>
                    <Row className="mb-5 bg-dark-2 p-3 rounded-3 text-white">
                        <Col>
                            <Form.Group>
                                <Form.Label>Recipe Name</Form.Label>
                                <Form.Control type="text" value={recipe.recipe.name} name='name' onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Servings</Form.Label>
                                <Form.Control type="number" value={recipe.recipe.servings} name='servings' onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col style={{marginTop: "31px"}}>
                            <Button className="me-1" variant="danger" onClick={handleDelete}>
                                Delete
                                <i className="fa-solid fa-trash-can ms-1"></i>
                            </Button>
                            <LoadingButton className="me-1" variant="primary" callback={() => handleEdit()} text='Save' iconClass='fa-solid fa-cloud-arrow-up ms-1' type='button'/>
                            <Button variant="success" onClick={handlePrint}>
                                Print
                                <i className="fa-solid fa-print ms-1"></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Container className='d-flex-row'>
                        {recipe.ingredients.map((ingredient, i) => (
                            <Row key={i} className="mb-3">
                                <Col>
                                    {i ==0 && <Form.Label>Name</Form.Label>}
                                    <Form.Control type="text" value={ingredient.name} name={`ingredientName${i}`} onChange={(e: any) => handleIngredientChange(e, i, 'name')}/>
                                </Col>
                                <Col>
                                    {i ==0 && <Form.Label>Quantity</Form.Label>}
                                    <Form.Control type="text" value={ingredient.quantity} name={`ingredientQuantity${i}`} onChange={(e: any) => handleIngredientChange(e, i, 'quantity')}/>
                                </Col>
                                <Col>
                                    {i ==0 && <Form.Label>Unit</Form.Label>}
                                    <Form.Control type="text" value={ingredient.unit} name={`ingredientUnit${i}`} onChange={(e: any) => handleIngredientChange(e, i, 'unit')}/>
                                </Col>
                                <Col>
                                    {i ==0 && <Form.Label>Notes</Form.Label>}
                                    <Form.Control type="text" value={ingredient.notes} name={`ingredientNotes${i}`} onChange={(e: any) => handleIngredientChange(e, i, 'notes')}/>
                                </Col>
                            </Row>
                        ))}
                        </Container>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" rows={5} value={recipe.instructions} name='instructions' onChange={handleChange}/>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default connector(RecipePage);
