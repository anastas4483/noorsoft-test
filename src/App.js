import React, { Component } from 'react';


import './App.css';




class ButtonCreate extends React.Component{
  render() {
   return( <button onClick={ this.props.handleCreateData}>Создать</button>);
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: [],
      index:'',
      isToogleOn:false,
     
     
         
    };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    
  
  }

 

  async componentDidMount() {
    try {
      const url= " http://178.128.196.163:3000/api/records";
      const responce = await fetch(url);
      const posts= await responce.json();
      this.setState({ posts });
      
      


    } catch (err) {
     
    }
  }
  
  
  
  async handleCreateClick(){

    console.log(6);
    const url = 'http://178.128.196.163:3000/api/records/';
    let id =this.state.posts[this.state.posts.length-1]._id;
    
    console.log(id)
    await fetch(url, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        data:{
       
        Login: '',
        Email: '',
        Age: ''
    
    }
 
  })

  })
  const responce = await fetch(url);
  const posts= await responce.json();
  this.setState({ posts });

}


  render(){

    const updateEmail=  async (index,_data) => {
      const newPosts={index:index,
        np:this.state.posts.map((item,_index) =>{
        if(index===_index){
            return {...item,data:{...item.data,Email:_data}};
                }else{
          return item;
        }
      })}
     await this.setState({
          posts:newPosts.np,
          index:newPosts.index
      });
     
    }


    const updateAge =  async (index,_data) => {
      const newPosts={index:index,
        np:this.state.posts.map((item,_index) =>{
        if(index===_index){
            return {...item,data:{...item.data,Age:_data}};
                }else{
          return item;
        }
      })}
     await this.setState({
          posts:newPosts.np,
          index:newPosts.index
      });
      
    }

     const updateLogin= async (index,_data) => {
        const newPosts={index:index,
          np:this.state.posts.map((item,_index) =>{
          if(index===_index){
              return {...item,data:{...item.data,Login:_data}};
                  }else{
            return item;
          }
        })}
       await this.setState({
            posts:newPosts.np,
            index:newPosts.index
        });
       
      }

      const url = 'http://178.128.196.163:3000/api/records/';
      const saveData =  async (id,data) => {
        fetch(url+id, {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            data:data
          })
        });
      }

      const deleteRow= async (id)=>{
        const url = 'http://178.128.196.163:3000/api/records/';

       await fetch(url+id, {
         method: 'delete'
        })
         
        window.location.reload();
         
  
    
  
      }

    return (
      <table className="b-productsContainer" border="1">
        
        <p className ="article"> Таблица значений</p>
        <ButtonCreate handleCreateData={this.handleCreateClick} /> 
           
      <tbody>
      <tr>
       <th></th>
       <th></th>
        <th>
          Email
        </th>
        <th>
          Login
        </th>
        <th>
         Age
        </th>
      </tr>
      {this.state.posts.map((item,index)=>(
        <NewRow post={item} index={index} 
        onSave={(id,data)=>{
          saveData(id,data)

          
        }}
        onDelete={(id)=>{
          console.log(id)
          deleteRow(id)
        }}
        updateEmail={(index,data)=>{updateEmail(index,data)} }
        updateLogin={(index,data)=>{updateLogin(index,data)} }
        updateAge={(index,data)=>{updateAge(index,data)}}/>
      ))}
      </tbody>
      </table>
          );
  }
}


class NewRow extends Component{
  constructor(props){
    super(props);
    this.state={
      isReadOnly:true,
      email:'',
      login:'',
      age:''
    };

  }

  componentDidMount(){
    this.setState({
      email:this.props.post.data.Email,
      login:this.props.post.data.Login,
      age:this.props.post.data.Age
    })
  }

  render() {


    return(
      <tr className="b-productItem">

      <td><button onClick={ (e)=>{

          if(!this.state.isReadOnly){
            this.props.onSave(this.props.post._id,{Email:this.state.email,Login:this.state.login,Age:this.state.age})
            }

          this.setState(state => ({
            isReadOnly: !state.isReadOnly
         }));   

          

      }
      }> {this.state.isReadOnly ?'Редактировать' : 'Сохранить'} </button>
     </td>
      <td><button onClick={ (e)=>{
            this.props.onDelete(this.props.post._id)
            }
      }> Удалить </button></td>


      <td><input readOnly={this.state.isReadOnly}  value={this.state.email} onChange={(e)=>{
        this.setState({email:e.target.value});
       
      }} /></td> 
      <td><input readOnly={this.state.isReadOnly} onChange={(e)=>{
        this.setState({login:e.target.value});
       
      }}  value={this.state.login} /> </td>
      <td><input  readOnly={this.state.isReadOnly} onChange={(e)=>{
        this.setState({age:e.target.value});
       
      }}  value={this.state.age} /></td>
    </tr>
    );
  }
}

export default App;
