import React, {Component} from 'react';
import Pagination from './common/pagination';
import { getMovies } from '../Starter Code/services/fakeMovieService';
import { paginate } from '../utils/paginate';

class Movies extends Component{
    state = {
        movies: getMovies(),
        currentPage:1,
        pageSize: 4
        
    }
    render(){
        const { length : count } = this.state.movies;
        console.log(count);
        const { pageSize, currentPage, movies: allMovies } = this.state;
        if( this.state.movies.length === 0 ) return "There are no movies in database";
        const movies = paginate(allMovies , currentPage , pageSize)
        
        return (
            <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map ( movies => (
                        <tr key = {movies._id}>
                            <td>{movies.title}</td>
                            <td>{movies.genre.name}</td>
                            <td>{movies.numberInStock}</td>
                            <td>{movies.dailyRentalRate}</td>
                            <td><button onClick= {() => this.handleDelete(movies)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Pagination itemsCount = {count} 
                    pageSize={pageSize} 
                    currentPage={currentPage} 
                    onPageChange={this.handlePageChange} 
            />
            </React.Fragment>
        );
    }
    handleDelete = movie =>{
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState( {movies} )
    } 
    handlePageChange = page => {
        this.setState({currentPage:page});
    }
}
export default Movies;