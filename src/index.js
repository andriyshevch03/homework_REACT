import React, { Fragment, Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import './index.css';

// React router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {withRouter} from 'react-router'
// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import AddContact from "./Components/AddContact/AddContact";
import EditContact from "./Components/EditContact/EditContact";
//Api
import{updateContacts,getAllContacts} from "./Services/api-services";


class App extends Component {
  componentDidMount(){
    getAllContacts().then(data=>{
      console.log(data)
      if(data === null){
        this.setState({
          List:[]
        })
      }else{
        console.log('else',data)
        this.setState({
          List:data
        })
      }
    })
  }

  state = {
    List: [],
    statusUser:[
      'Friend','Work','Family'
    ],
    CurrentContact:null,
    findContact:"",
    searchStatus:""
  }
  // componentDidMount(){
  //   console.log("componentDidMount")
  // }
  // shouldComponentUpdate(nextProps,nextState){
  //   console.log("shouldComponentUpdate")
  //   console.log("nextProps")
  //   console.log("nextState")
  //   // if(nextState.List.length == 2){
  //   //   return false
  //   // }
  //   return true;
  // }

  // componentDidUpdate(){
  //   console.log("componentDidUpdate")
  // }

  // componentWillUnmount(){
  //   console.log("componentWillUnmount")
  // }

  
  onDelete = (Id) => {
    console.log(Id)
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const partOne = this.state.List.slice(0, index);
    const partTwo = this.state.List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    this.setState({
      List: tmpList
    })
    updateContacts(tmpList)
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
    updateContacts(tmpList)
  }
  onEdit = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    let currentContact = this.state.List[index]
    console.log("currentContact")
    this.setState({
      CurrentContact: currentContact
    })
    updateContacts(currentContact)
    
  }
  onEditCurrentContact =(currentContact)=>{
    const{id} = currentContact
    const index = this.state.List.findIndex((elem)=>elem.id ===id)
    const partOne  = this.state.List.slice(0,index)
    const partTwo = this.state.List.slice(index+1)
    const newList =[...partOne,currentContact,...partTwo]

    this.setState({
      List:newList
    })
    updateContacts(newList)
  }
  showStatus = (event) =>{
    let showStatus = event.target.value
    console.log(showStatus)
    this.setState({
      searchStatus:showStatus
    })
  }
  searchName = (event) =>{
    let searchName = event.target.value;
    console.log(searchName)
    this.setState({
      findContact: searchName
    });
  }
  
  onShowContact = (items, searchValue,searchStatus) => {
    if (searchValue.length === 0) {
      return items;
    }

    return items.filter(item => {
      return (
        item[searchStatus].toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      );
    });
  };


  render() {
    const showContacts = this.onShowContact(
      this.state.List,
      this.state.findContact,
      this.state.searchStatus
    )
    const {CurrentContact} = this.state;
    return (
      <Fragment>
        <Router>
          <Header  searchName={this.searchName} showStatus = {this.showStatus}/>
          <Switch>
            <Route path="/" exact render={() => <ContactList ContactList={showContacts} onEdit={this.onEdit} onDelete={this.onDelete} onStatus = {this.onStatus}/>} />
            <Route path="/about" exact component={About} />
            <Route path="/add-contact" exact render={() => <AddContact onAddContact={this.onAddContact} />} />
            <Route path="/edit-contact" exact render={() => <EditContact onEditCurrentContact ={this.onEditCurrentContact}Contact={CurrentContact}  />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>

    )
  }
}
ReactDOM.render(<App />, document.getElementById("root"));