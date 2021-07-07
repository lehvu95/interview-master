// sample data
/**
 * {
    "word": "swashbuckler",
    "comment": "Yar, a good word, matey! Shiver me timbers!",
    "date": "19 Sep 2019 12:12:00 GMT",
    "rating": 85
  },
 */

// example: 
// swashbuckler: Yar, a good word, matey! Shiver me timbers! ★★★★ (9/19/2019)

// always have word, comment, and stars
// if length > 80, omit date
// if length > 80 and date omitted, truncate comment until feedback length = 80

// TODO
// function for stars
// function for dates, or use date converter
// function for truncation

// constant allows for quick updating of max length
const MAX_LENGTH = 80;

module.exports = class FeedbackApp {
  truncateText(string, stars) {
    const ellipses = '...';
    const substringLength = MAX_LENGTH - stars.length - ellipses.length;
    return string.substring(0, substringLength) + ellipses + stars;
  }

  formatStars(rating) {
    if (rating) {
      let stars = '';
      const numStars = Math.floor(rating / 20);
      for (let i = 0; i < numStars; i++) {
        stars += '★';
      }
      // use ½ for half stars
      if (rating % 20 >= 10) {
        stars += '½';
      }
      return ' ' + stars;
    }
    // return empty string if rating is null
    return '';
  }

  formatDate(date) {
    const newDate = new Date(date);
    const [month, day, year] = [newDate.getMonth(), newDate.getDate(), newDate.getFullYear()];

    return ' (' + (month + 1) + '/' + day + '/' + year + ')';
  }

  formatFeedback(feedback) {
    const {word, comment, date, rating} = feedback;

    let formattedFeedback = word + ': ' + comment;
    let feedbackLength = formattedFeedback.length;
    
    const formattedStars = this.formatStars(rating);
    const starsLength = formattedStars.length;

    // stars are required for all feedback
    if (feedbackLength + starsLength >= MAX_LENGTH) {
      return this.truncateText(formattedFeedback, formattedStars);
    } else {
      const formattedDate = this.formatDate(date);
      const dateLength = formattedDate.length;
      // omit date if date makes feedback too long
      if (feedbackLength + starsLength + dateLength > MAX_LENGTH) {
        return formattedFeedback + formattedStars;
      }
      return formattedFeedback + formattedStars + formattedDate;
    }
  }
};
