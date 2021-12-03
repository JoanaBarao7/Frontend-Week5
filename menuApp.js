class Movie {
    constructor(title, producer) {
        this.title = title;
        this.producer = producer;
    }


    describe() {
        return `${this.title} was produced by ${this.producer}.`;
    }
}

class Genre {
    constructor(genre) {
        this.genre = genre;
        this.movies = [];
        }

     addMovie(movie) {
         if(movie instanceof Movie) {
            this.movies.push(movie);
         } else {
             throw new Error (`You can only add an instance of Movie. Argument is not a movie: ${movie}`);
         }
     }  
     describe() {
         return `${this.genre} has ${this.movies.length} movies.`; 
     } 
}

class Menu {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createGenre();
                    break;
                case '2':
                    this.viewGenre();
                    break;
                case '3':
                    this.deleteGenre();
                    break;
                case '4':
                    this.displayGenres();
                    break;   
                default:
                    selection = 0; 
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    } 

    
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new genre
            2) view genre
            3) delete genre
            4) display all genres
        `);
    }
    
    showGenreMenuOptions(genreInfo) {
        return prompt(`
        0) back
        1) create movie
        2) delete movie
        ------------------
        ${genreInfo}
        `);
    }

    displayGenres() {
        let genreString = '';
        for(let i = 0 ; i < this.genres.length; i++) {
            genreString += i + ') ' + this.genres[i].genre + '\n';
        }
        alert(genreString);
    }
    createGenre() {
        let genre = prompt('Enter genre type:');
        this.genres.push(new Genre(genre));
    }

    viewGenre() {
        let index = prompt('Enter the index of the genre you wish to view:');
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            let description = 'Genre type: ' + this.selectedGenre.genre + '\n';

            for(let i = 0; i < this.selectedGenre.movies.length; i++) {
                description += i + ') ' + this.selectedGenre.movies[i].title +
                  ' - ' + this.selectedGenre.movies[i].producer + '\n';
            }

            let selection = this.showGenreMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createMovie();
                    break;
                case '2':
                    this.deleteMovie();
                    
            }
        }
    }


deleteGenre() {
    let index = prompt('Enter the index of the genre you wish to delete');
    if (index > -1 && index < this.genres.length) {
        this.genres.splice(index, 1);
    }
}

createMovie() {
    let title = prompt('Enter title for new movie:');
    let producer = prompt('Enter name for new producer:');
        this.selectedGenre.movies.push(new Movie(title, producer));
}  


    deleteMovie() {
        let index = prompt('Enter the index of the movie you wish to delete:');
            if(index > -1 && index < this.selectedGenre.movies.length) {
             this.selectedGenre.movies.splice(index, 1);
         }

     }
}

let menu = new Menu();
menu.start();