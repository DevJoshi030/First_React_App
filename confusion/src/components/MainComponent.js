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
import { addComment, fetchDishes }from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = (dispath) => ({
  addComment: (dishId, ratings, author, comment) => dispath(addComment(dishId, ratings, author, comment)),
  fetchDishes: () => { dispath(fetchDishes()) }
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () => {
        return (
            <Home dish={ this.props.dishes.dishes.filter((dish) => dish.featured)[0] }
            dishesLoading={ this.props.dishes.isLoading }
            dishesErrorMsg={ this.props.dishes.errormsg } 
            leader={ this.props.leaders.filter((leader) => leader.featured)[0] } 
            promotion={ this.props.promotions.filter((promotion) => promotion.featured)[0] } />
        );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetails dish={ this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
        isLoading={ this.props.dishes.isLoading }
        ErrorMsg={ this.props.dishes.errormsg } 
        comments={ this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId)) }
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
            <Route exact path='/contactus' component={ Contact } />
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
