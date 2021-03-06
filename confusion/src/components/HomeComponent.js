import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

const RenderCard = ({ item, isLoading, ErrorMsg }) => {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (ErrorMsg) {
        return (
            <h4>{ ErrorMsg }</h4>
        );
    }
    else
        return (
            <FadeTransform in
                transfornProps={ {
                    exitTransform: 'scale(0.5) translateY(-50%)'
                } }>
                <Card>
                    <CardImg src={ baseUrl + item.image } alt={ item.name } />
                    <CardBody>
                        <CardTitle>
                            { item.name }
                        </CardTitle>
                        { item.designation ? <CardSubtitle>{ item.designation }</CardSubtitle> : null }
                        <CardText>
                            { item.description }
                        </CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

const Home = ({ dish, dishesLoading, dishesErrorMsg, leader, leadersLoading, leadersErrorMsg, promosLoading, promosErrorMsg, promotion }) => {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={ dish } isLoading={ dishesLoading } ErrorMsg={ dishesErrorMsg } />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={ promotion } isLoading={ promosLoading } ErrorMsg={ promosErrorMsg } />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={ leader } isLoading={ leadersLoading } ErrorMsg={ leadersErrorMsg } />
                </div>
            </div>
        </div>
    );
}

export default Home;