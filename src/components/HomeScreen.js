import React from 'react';
import Repo from './Repo'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      repo: '',
      addedRepos: localStorage.getItem("addedRepos") ?  JSON.parse(localStorage.getItem("addedRepos")) : [],
      showFiltered: false
    };   
    this.handleOwner = this.handleOwner.bind(this);
    this.handleRepo = this.handleRepo.bind(this); 
    this.addItem = this.addItem.bind(this);
    this.handleClick = this.handleClick.bind(this); 
    this.filterRead = this.filterRead.bind(this); 
  }
  

  addItem(event){
    fetch("https://api.github.com/repos/" + this.state.owner + "/" + this.state.repo + "/releases")
    .then(res => res.json())
    .then(
      (result) => {
        
        if(!result.message){
          this.state.addedRepos.push(
            {
              owner: this.state.owner,
              repo: this.state.repo,
              releaseDate: result.length > 0 && "published_at" in result[0] ? result[0]['published_at'] : "No Publish Date",
              glow: true,
              index: Math.random() * 1000000,
            }
          )
          localStorage.setItem("addedRepos", JSON.stringify(this.state.addedRepos));

          this.setState({addedRepos: this.state.addedRepos})
        } else {
          alert('API Failed: Please try another owner or repo')
        }
      }
    )
  }


  handleOwner(event) {
    this.setState({owner: event.target.value});
  }

  filterRead(event){
    this.setState({showFiltered: !this.state.showFiltered});
  }

  handleRepo(event) {
    this.setState({repo: event.target.value});
  }

  handleClick(id){
    
    var obj = this.state.addedRepos.filter((repo) => repo.index == id)[0]
  
    obj.glow = !obj.glow;
    this.setState({addedRepos: this.state.addedRepos})
    localStorage.setItem("addedRepos", JSON.stringify(this.state.addedRepos));


  }


  handleDelete(id){
    this.setState(
      {
        addedRepos: this.state.addedRepos.filter((repo) => repo.index !== id)
      }
    )
    localStorage.setItem("addedRepos", JSON.stringify(this.state.addedRepos));

  }

  render(){
      return (
        <div> 
            <div>
                  <div>
                    <input
                      type="text"
                      className="input"
                      id="addInput"
                      placeholder="Owner"
                      onChange={this.handleOwner}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      className="input"
                      id="addInput2"
                      placeholder="Repo"
                      onChange={this.handleRepo}
                    />
                  </div>

                  <button className="button is-info" onClick={this.addItem}>
                    Add Item
                  </button>

                  <button className="button is-info" onClick={this.filterRead}>
                    {this.state.showFiltered ? "Filter Unread": "Show Read && Unread"}
                  </button>
            </div>


            
              <div>

              {          
              this.state.showFiltered ? 

                ( this.state.addedRepos.filter( (repo) => repo.glow).map( (repo) => ( <div> <Repo key={repo.index} 
                  onClick={() => this.handleClick(repo.index)} 
                  owner={repo.owner} 
                  repo = {repo.repo} 
                  releaseDate={repo.releaseDate} 
                  handleDelete={() => this.handleDelete(repo.index)}
                  glow={repo.glow}/> 
                  
                  </div> ))) : (  this.state.addedRepos.map( (repo) => ( <div> <Repo key={repo.index} 
                                                                                onClick={() => this.handleClick(repo.index)} 
                                                                                owner={repo.owner} 
                                                                                repo = {repo.repo} 
                                                                                releaseDate={repo.releaseDate} 
                                                                                handleDelete={() => this.handleDelete(repo.index)}
                                                                                glow={repo.glow}/> 
                                                                            </div>
                                                              ))) 
                                                              




                }
              </div>
            

         
     </div>
    )
  
  
  }
   
  
}

export default HomeScreen;