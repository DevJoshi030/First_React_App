import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetails extends Component {

    constructor(props) {
        super(props);
        this.dish = null;
    }

    render() {

        this.dish = this.props.dish;
        if (this.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-1">
                            <Card>
                                <CardImg width='100%' src={ this.dish.image } alt={ this.dish.name } />
                                <CardBody>
                                    <CardTitle>
                                        { this.dish.name }
                                    </CardTitle>
                                    <CardText>
                                        { this.dish.description }
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md">
                            <h1>Comments:</h1>
                            { this.dish.comments.map((comment) => {
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

}

export default DishDetails;