import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const RenderComments = ({ dish }) => {
    return (
        <div className="col-12 col-md">
            <h1>Comments:</h1>
            { dish.comments.map((comment) => {
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
        </div>
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

const DishDetails = ({ dish }) => {

    if (dish !== null && dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 m-1">
                        <RenderDish dish={ dish } />
                    </div>
                    <RenderComments dish={ dish } />
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