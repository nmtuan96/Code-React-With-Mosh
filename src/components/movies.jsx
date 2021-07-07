import React, {Component} from 'react';
import Pagination from './common/pagination';
import { getMovies } from '../Starter Code/services/fakeMovieService';
import { paginate } from '../utils/paginate';
import ListGroup  from './common/listGroup';
import { getGenres } from '../Starter Code/services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component{    
    state = {
        movies: [],
        genres: [],
        currentPage:1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    };
    componentDidMount(){
        const genres = [{_id: "" ,name:"All Genres"}, ...getGenres() ]
        this.setState({ movies: getMovies(), genres});
    };
    getPagedData = ()=> {
        const { pageSize, currentPage, selectedGenre ,movies: allMovies, sortColumn} = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted , currentPage , pageSize);
        return { totalCount: filtered.length, data:movies};
    }
    render(){
        
        if( this.state.movies.length === 0 ) return "There are no movies in database";
        const { pageSize, currentPage , sortColumn} = this.state;
        const {totalCount , data } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                        items={this.state.genres} 
                        selectedItem = {this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col-10">
                <MoviesTable
                    movies={data} 
                    sortColumn = {sortColumn}
                    onDelete={this.handleDelete} 
                    onSort={this.handleSort}
                />
                <Pagination itemsCount = {totalCount} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChange={this.handlePageChange} 
                />
                </div>
            </div>
        );
    };
    handleDelete = movie =>{
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState( {movies} )
    };
    handlePageChange = page => {
        this.setState({currentPage:page});
    };
    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage:1 });
    };
    handleSort = sortColumn =>{
        this.setState({ sortColumn });
    };
}
export default Movies;