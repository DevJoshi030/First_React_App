import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import{ Link } from 'react-router-dom';

const RenderComments = ({ comments }) => {
    return (
        <div className="col-12 col-md">
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

const DishDetails = ({ dish, comments }) => {

    if (dish !== null && dish !== undefined) {
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
                    <RenderComments comments={ comments } />
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