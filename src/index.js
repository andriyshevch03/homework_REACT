import React, { Fragment, Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import './index.css';

// React router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import AddContact from "./Components/AddContact/AddContact";

class App extends Component {

  state = {
    List: [
      {
        "Id": uuidv4(),
        "Avatar": 67,
        "Gender": "men",
        "Name": "Alexander Verdnam",
        "Phone": "+1-800-600-9898",
        "Email": "example@gmail.com",
        "Status": "Friend"
      },
      {
        "Id": uuidv4(),
        "Avatar": 5,
        "Gender": "men",
        "Name": "Jack Jackson",
        "Phone": "+1-800-700-1234",
        "Email": "jack@gmail.com",
        "Status": "Friend"
      },
      {
        "Id": uuidv4(),
        "Avatar": 77,
        "Gender": "women",
        "Name": "Camilla Terry",
        "Phone": "+1-800-745-1854",
        "Email": "camt@gmail.com",
        "Status": "Friend"
      },
    ],
    statusUser:[
      'Friend','Work','Family'
    ]
  }

  onDelete = (Id) => {
    console.log(Id)
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const partOne = this.state.List.slice(0, index);
    const partTwo = this.state.List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    this.setState({
      List: tmpList
    })
  }

  onStatus = (Id) =>{
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    let tmpList = this.state.List.slice();
    let indexStatus = this.state.statusUser.findIndex((elem) => elem === tmpList[index].Status);
    this.state.statusUser.length - 1 <= indexStatus ? (indexStatus = 0) : indexStatus++;
    tmpList[index].Status = this.state.statusUser[indexStatus]

    this.setState(()=>{
      return{
        List:tmpList
      }
    })
  }


  onAddContact = (newContact) => {
    let tmpList = this.state.List.slice();
    tmpList.unshift(newContact);
    this.setState({
      List: tmpList
    })
  }

  render() {
    const { List } = this.state;
    return (
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact render={() => <ContactList ContactList={List} onDelete={this.onDelete} onStatus = {this.onStatus}/>} />
            <Route path="/about" exact component={About} />
            <Route path="/add-contact" exact render={() => <AddContact onAddContact={this.onAddContact} />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>

    )
  }
}
ReactDOM.render(<App />, document.getElementById("root"));