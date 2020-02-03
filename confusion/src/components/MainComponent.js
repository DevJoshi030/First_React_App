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
import { postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, ratings, author, comment) => dispatch(postComment(dishId, ratings, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
  
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
        return (
            <Home dish={ this.props.dishes.dishes.filter((dish) => dish.featured)[0] }
              dishesLoading={ this.props.dishes.isLoading }
              dishesErrorMsg={ this.props.dishes.errormsg } 
              leader={ this.props.leaders.leaders.filter((leader) => leader.featured)[0] }
              leadersLoading={ this.props.leaders.isLoading }
              leadersErrorMsg={ this.props.leaders.errormsg }
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
          postComment={ this.props.postComment }
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
        <TransitionGroup>
          <CSSTransition key={ this.props.location.key } classNames="page" timeout={ 300 }>
            <Switch>
                <Route path='/home' component={ HomePage } />
                <Route exact path='/menu' component={ () => <Menu dishes={ this.props.dishes } /> } />
                <Route exact path='/contactus' component={ () =>  <Contact resetFeedbackForm={ this.props.resetFeedbackForm } postFeedback={ this.props.postFeedback } /> } />
                <Route path="/menu/:dishId" component={ DishWithId } />
                <Route path="/aboutus" component={ AboutPage } />
                <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
