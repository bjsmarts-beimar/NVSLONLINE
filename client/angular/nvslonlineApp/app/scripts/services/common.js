'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.common
 * @description
 * # common
 * Service in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .service('common', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getDivisionName(divisionId, lstDivisions) {

    var objDivision = Enumerable.From(lstDivisions)
                   .Where("p => p.DivisionId ==" + divisionId)
                   .FirstOrDefault();

    return objDivision.Division.DivisionName;

}

this.getLstTeamsByDivision = function(divisionId, lstTeams) {
//function getLstTeamsByDivision(divisionId, lstTeams) {
    if (divisionId === null) {
        return lstTeams;
    } else {
        var lstFilterTeams = Enumerable.From(lstTeams)
            .Where("p => p.DivisionId ==" + divisionId)
            .ToArray();

        return lstFilterTeams;
    }
}

function getSeasonName(seasonId, lstSeasons) {

    var objSeason = Enumerable.From(lstSeasons)
                   .Where("p => p.SeasonId ==" + seasonId)
                   .FirstOrDefault();

    return objSeason.Season.SeasonName;

}

function getSearchScheduleBySeason(seasonId, lstSchedule) {

    var lstNewSchedule = Enumerable.From(lstSchedule)
                   .Where("p => p.SeasonId ==" + seasonId)
                   .ToArray();
    return lstNewSchedule;

}

function getSearchScheduleByDivision(seasonId, divisionId, lstSchedule) {

    var lstNewSchedule = Enumerable.From(lstSchedule)
                   .Where("p => p.DivisionId ==" + divisionId + "&& p.SeasonId == " + seasonId)
                   .ToArray();
    return lstNewSchedule;

}


function getTeamsStandingBySeasonIdDivisionId(seasonId, divisionId, lstSchedule, dataTeams) {
    
    var seasonsArray;

    var dataComplete = {};
    if (seasonId === null) {
        seasonsArray = Enumerable.From(lstSchedule)
        .Distinct(function (x) { return x.SeasonId; })
        .Select(function(a) {
                var objSeason = {};
                objSeason.SeasonId = a.SeasonId;
                objSeason.SeasonName = a.Season.SeasonName;
                return { objSeason }
            })
        .ToArray();

        //console.log(seasonsArray);

        getDivisionsArrayStanding(dataComplete, seasonsArray, lstSchedule, dataTeams);

        //console.log(dataComplete);
        return dataComplete;

    } else {
        if (divisionId === null) {
            seasonsArray = Enumerable.From(lstSchedule)
               .Distinct(function (x) { return x.SeasonId; })
               .Select(function (a) {
                   var objSeason = {};
                   objSeason.SeasonId = a.SeasonId;
                   objSeason.SeasonName = a.Season.SeasonName;
                   return { objSeason }
               })
               .Where(function (y) { return y.objSeason.SeasonId === seasonId; })
               .ToArray();

            //console.log(seasonsArray);
            getDivisionsArrayStanding(dataComplete, seasonsArray, lstSchedule, dataTeams);

            

        } else {
            seasonsArray = Enumerable.From(lstSchedule)
               .Distinct(function (x) { return x.SeasonId; })
               .Select(function (a) {
                   var objSeason = {};
                   objSeason.SeasonId = a.SeasonId;
                   objSeason.SeasonName = a.Season.SeasonName;
                   return { objSeason }
               })
               .Where(function (y) { return y.objSeason.SeasonId === seasonId; })
               .FirstOrDefault();

            dataComplete.Season = [];
            dataComplete.Season.push(seasonsArray);
            
            var arrayDivisionMultiple = Enumerable.From(lstSchedule)
                //.Distinct(function (x) { return x.DivisionId; })
                .Select(function (a) { return a; })
                .Where(function (y) { return y.SeasonId === seasonId && y.DivisionId === divisionId; })
                .ToArray();

            var arrayDivision = Enumerable.From(arrayDivisionMultiple).Distinct("p => p.DivisionId ").ToArray();

            dataComplete.Season[0].Division = arrayDivision;

            var lstStanding = getArrayStanding(arrayDivisionMultiple, dataTeams);

            dataComplete.Season[0].Division[0].DataStanding = lstStanding;

            //console.log(dataComplete);
        }
    }

    return dataComplete;
}

function getDivisionsArrayStanding(dataComplete, seasonsArray, lstSchedule, dataTeams) {

    dataComplete.Season = [];

    for (var i = 0; i < seasonsArray.length; i++) {
        dataComplete.Season.push(seasonsArray[i]);
        var arrayDivisionMultiple = getSearchScheduleBySeason(seasonsArray[i].objSeason.SeasonId, lstSchedule);

        var arrayDivision = Enumerable.From(arrayDivisionMultiple).Distinct("p => p.DivisionId ").ToArray();

       // console.log(arrayDivisionMultiple);
        dataComplete.Season[i].Division = arrayDivision;

        for (var k = 0; k < arrayDivision.length; k++) {

            var currentArrayDivisionMultiple = Enumerable.From(arrayDivisionMultiple)
                   .Where("p => p.DivisionId ==" + arrayDivision[k].DivisionId)
                   .ToArray();

            //console.log(arrayDivision.DivisionId);
            var lstStanding = getArrayStanding(currentArrayDivisionMultiple, dataTeams);

            dataComplete.Season[i].Division[k].DataStanding = lstStanding;
        }
    }

}

function getArrayStanding(arrayDivisionMultiple, dataTeams) {
    var lstStanding = [];
    
    for (var j = 0; j < dataTeams.length; j++) {
        var teamsEnJuego = Enumerable.From(arrayDivisionMultiple)
            .Where("p => p.HomeTeamId ==" + dataTeams[j].Id + "|| p.AwayTeamId ==" + dataTeams[j].Id )//+ "&& p.DivisionId == 1 && p.SeasonId == 1")
            .ToArray();

        
        if (teamsEnJuego.length !== 0) {
            //console.log(teamsEnJuego);
            var standing = {};

            standing.TeamName = dataTeams[j].TeamName;
            standing.Wins = 0;
            standing.Losses = 0;
            standing.Ties = 0;
            standing.Points = 0;
            standing.GoalsFor = 0;
            standing.GoalsAgainst = 0;

            for (var l = 0; l < teamsEnJuego.length; l++) {
                if (dataTeams[j].Id === teamsEnJuego[l].HomeTeamId || dataTeams[j].Id === teamsEnJuego[l].AwayTeamId) {


                    if (dataTeams[j].Id === teamsEnJuego[l].HomeTeamId) {
                        standing.GoalsFor += teamsEnJuego[l].GoalsHomeTeam;
                        standing.GoalsAgainst += teamsEnJuego[l].GoalsAwayTeam;
                        if (teamsEnJuego[l].GoalsHomeTeam > teamsEnJuego[l].GoalsAwayTeam) {
                            standing.Wins += 1;
                            standing.Points += 3;

                        }
                        if (teamsEnJuego[l].GoalsHomeTeam < teamsEnJuego[l].GoalsAwayTeam) {
                            standing.Losses += 1;
                        }
                        if (teamsEnJuego[l].GoalsHomeTeam === teamsEnJuego[l].GoalsAwayTeam && teamsEnJuego[l].GoalsHomeTeam !== null) {
                            standing.Ties += 1;
                            standing.Points += 1;
                        }

                    } else {
                        standing.GoalsFor += teamsEnJuego[l].GoalsAwayTeam;
                        standing.GoalsAgainst += teamsEnJuego[l].GoalsHomeTeam;
                        if (teamsEnJuego[l].GoalsAwayTeam > teamsEnJuego[l].GoalsHomeTeam) {
                            standing.Wins += 1;
                            standing.Points += 3;

                        }
                        if (teamsEnJuego[l].GoalsAwayTeam < teamsEnJuego[l].GoalsHomeTeam) {
                            standing.Losses += 1;
                        }
                        if (teamsEnJuego[l].GoalsAwayTeam === teamsEnJuego[l].GoalsHomeTeam && teamsEnJuego[l].GoalsHomeTeam !== null) {
                            standing.Ties += 1;
                            standing.Points += 1;
                        }

                    }

                }
            }
            standing.Differential = standing.GoalsFor - standing.GoalsAgainst;
            lstStanding.push(standing);
        }

    }

    return lstStanding;
}


    this.convertToTime = function(stringDate) {
      var d = new Date(stringDate),
          h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
          m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
      return  h + ':' + m;
    };

   this.convertToDate = function(stringDate) {
      var dateOut = new Date(stringDate);
      dateOut.setDate(dateOut.getDate());
      return dateOut;
    };

  });
