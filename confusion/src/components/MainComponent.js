import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetails from './DishDetailsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchPromos, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, ratings, author, comment) => dispatch(addComment(dishId, ratings, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {

    const HomePage = () => {
        return (
            <Home dish={ this.props.dishes.dishes.filter((dish) => dish.featured)[0] }
            dishesLoading={ this.props.dishes.isLoading }
            dishesErrorMsg={ this.props.dishes.errormsg } 
            leader={ this.props.leaders.filter((leader) => leader.featured)[0] }
            promosLoading={ this.props.promotions.isLoading }
            promosErrorMsg={ this.props.promotions.errormsg } 
            promotion={ this.props.promotions.promotions.filter((promotion) => promotion.featured)[0] } />
        );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetails dish={ this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
        isLoading={ this.props.dishes.isLoading }
        ErrorMsg={ this.props.dishes.errormsg } 
        comments={ this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId)) }
        commentsErrorMsg={ this.props.comments.errormsg }     
        addComment={ this.props.addComment }
        />
      );
    }

    const AboutPage = () => {
      return (
        <About leaders={ this.props.leaders } />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path='/home' component={ HomePage } />
            <Route exact path='/menu' component={ () => <Menu dishes={ this.props.dishes } /> } />
            <Route exact path='/contactus' component={ () =>  <Contact resetFeedbackForm={ this.props.resetFeedbackForm } /> } />
            <Route path="/menu/:dishId" component={ DishWithId } />
            <Route path="/aboutus" component={ AboutPage } />
            <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
