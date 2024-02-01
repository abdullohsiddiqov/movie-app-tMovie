class Movie {
  constructor(id, title, description, rate, year, runtime, genre, country, images, comments, videoLink) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rate = rate;
    this.year = year;
    this.runtime = runtime;
    this.genre = genre;
    this.country = country;
    this.images = images;
    this.comments = comments;
    this.videoLink = videoLink;
  }
}

module.exports = Movie;
