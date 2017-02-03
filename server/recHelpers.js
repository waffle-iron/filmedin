var _ = require ('underscore');

module.exports = {
	generateAllFriendsRecs: function (myFilmRatings, friendsFilmRatings) {


    //helper functions to retreive film and rank for one friend
    var getListOfFriendsFilmsNotSeenByUser = function(usersFilms, friendsFilms) {
      var listOfFriendsFilmsNotSeenByUser = {};
      _.each(friendsFilms, function(rank, film) {
        if (usersFilms[film] === undefined) {
          listOfFriendsFilmsNotSeenByUser[film] = rank;
        }
      })
      return listOfFriendsFilmsNotSeenByUser;
    }

    var difference = function(a, b) { return Math.abs(a - b) }

    var getDifferenceOfRankOfSharedFilms = function(usersFilms, friendsFilms) {
      var sumOfDifferenceInRanks = 0;
      var numOfFilmsSeenByBoth = 0;
      _.each(usersFilms, function(rank, film) {
        if (friendsFilms[film] !== undefined && friendsFilms[film] !== rank) {
          sumOfDifferenceInRanks += difference(friendsFilms[film], rank);
          numOfFilmsSeenByBoth++;
        }
      })
      var aveDifferenceInRank = sumOfDifferenceInRanks/numOfFilmsSeenByBoth;
      return aveDifferenceInRank
    }

    var getRecommendedFilmsFromFriend = function(usersFilms, friendsFilms) {
      var listOfFriendsFilmsNotSeenByUser = getListOfFriendsFilmsNotSeenByUser(usersFilms, friendsFilms)
      var diffenceInRank = getDifferenceOfRankOfSharedFilms(usersFilms, friendsFilms)
      var recommendedFilms = {}
      if (diffenceInRank < 2.5) {
        _.each(listOfFriendsFilmsNotSeenByUser, function(rank, film) {
          if (rank >= 4) {
            recommendedFilms[film] = rank;
          }
        })
      }
      return recommendedFilms
    }

    //loop over allfriends and use helper functions to generate suggested films for friend
    var recommendedFilms = {};

    _.each(friendsFilmRatings, (friend) => {
      recommendedFilms[friend] = getRecommendedFilmsFromFriend(myFilmRatings, friend)
    });

    return recommendedFilms;

	}
}