import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import{ Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const RenderComments = ({ comments }) => {
    return (
        <>
            <h1>Comments:</h1>
            { comments.map((comment) => {
                return (
                    <div className="row">
                        <div className="col-12 col-md m-1">
                            <h4>{ comment.comment }</h4>
                            <br />
                            <h5>-- { comment.author }, { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date))) }</h5>
                            <br />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

const RenderDish = ({ dish }) => {
    return (
        <Card>
            <CardImg width='100%' src={ dish.image } alt={ dish.name } />
            <CardBody>
                <CardTitle>
                    { dish.name }
                </CardTitle>
                <CardText>
                    { dish.description }
                </CardText>
            </CardBody>
        </Card>
    );
}

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !(val) || val.length <= len;
const allChar = (val) => {
    if (val){
        for(var i = 0; i < val.length; i++) {
            if (!((val.charCodeAt(i) > 64 && val.charCodeAt(i) < 91) || (val.charCodeAt(i) > 96 && val.charCodeAt(i) < 123) || val[i] === ' '))
                return false;
        }
        return true;
    }
    return false
}
const isRated = (val) => val && val !== 'Choose Ratings Stars...';

class RenderCommentInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCommentModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.ratings, values.name, values.comment)
        this.setState({
            isCommentModalOpen: false
        })
    }

    render() {
        return (
            <>
                <Button color="secondary" className="border m-2 btn btn-lg" onClick={ this.toggleModal }><span className="fa fa-pencil"></span> Submit Comment</Button>

                <Modal isOpen={ this.state.isCommentModalOpen } toggle={ this.toggleModal }>
                    <ModalHeader>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                            <Label htmlFor="ratings">Ratings</Label>
                            <Control.select model='.ratings' id='ratings' name='ratings' className="form-control" 
                                validators={ { isRated, } }
                            >
                                <option>Chooes Ratings Stars...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            <Errors className="text-danger"
                                model=".ratings"
                                show="touched"
                                messages={ { isRated: "Choose a Rating" } }
                            />
                            <Label htmlFor="name">Your Name</Label>  
                            <Control.text model='.name' id="name" name="name" className="form-control" validators={ {
                                minLength: minLength(3),
                                maxLength: maxLength(15),
                                allChar,
                            } } />
                            <Errors className="text-danger"
                                model='.name'
                                show="touched"
                                messages={ { 
                                    minLength: "Must be > than 2, ",
                                    maxLength: "Must be < than 16, ",
                                    allChar: "Must be a Char."
                                }
                        } />
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model='.comment' id='comment' name='comment' className='form-control' rows="6" />
                            <Button className="btn btn-primary m-1" color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

const DishDetails = ({ dish, isLoading, ErrorMsg, comments, addComment }) => {

    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (ErrorMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{ ErrorMsg }</h4>
                </div>
            </div>
        );
    }
    else if (dish !== null && dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{ dish.name }</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{ dish.name }</h3>
                    <hr />
                </div>
            </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        <RenderDish dish={ dish } />
                    </div>
                    <div className="col-12 col-md">
                        <RenderComments comments={ comments } />
                        <RenderCommentInput
                            addComment={ addComment }
                            dishId={ dish.id }
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


export default DishDetails;