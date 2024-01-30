class Movie {
    constructor(id, title, description, rate, year, runtime, genre, country, images) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.rate = rate;
      this.year = year;
      this.runtime = runtime;
      this.genre = genre;
      this.country = country;
      this.images = images;
    }
  }
  
  module.exports = Movie;
  