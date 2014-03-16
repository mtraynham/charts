angular.module('charts').controller('Example2Ctrl', ['$scope', 'CrossfilterService', function($scope, CrossfilterService) {

    var timeFormat = d3.time.format("%b %e, %Y");
    var numberFormat = d3.format(".2f");

    /**
     * Handles parsing of CSV data.
     *  critic_score: "46"
     *  genre: "Miscellaneous, Rhythm, Music, Music"
     *  platform: "ps3"
     *  publisher: "SCEA"
     *  rating: "E"
     *  release: "Oct 15, 2009"
     *  score: "3.9"
     *  title: ".detuned"
      * url: "/game/playstation-3/de"
     */
    function parseData(data, callback) {
        d3.csv(data, function(row) {
            row['critic_score'] = CrossfilterService.coerceNumber(row['critic_score']);
            row['genre'] = CrossfilterService.coerceArray(row['genre']);
            row['platform'] = CrossfilterService.coerceString(row['platform']);
            row['publisher'] = CrossfilterService.coerceString(row['publisher']);
            row['rating'] = CrossfilterService.coerceString(row['rating']);
            row['release'] = CrossfilterService.coerceDate(timeFormat, row['release']);
            row['score'] = CrossfilterService.coerceNumber(row['score']);
            row['title'] = CrossfilterService.coerceString(row['title']);
            row['url'] = CrossfilterService.coerceString(row['url']);
            return row;
        }, function(data) {
            callback(null, data);
        });
    }

    /**
     * Rendering of data
     */
    function render(error, data) {
        // Accessors
        var criticScoreAccessor = CrossfilterService.accessor("critic_score"),
            genreAccessor = CrossfilterService.accessor("genre"),
            platformAccessor = CrossfilterService.accessor("platform"),
            publisherAccessor = CrossfilterService.accessor("publisher"),
            ratingAccessor = CrossfilterService.accessor("rating"),
            releaseAccessor = CrossfilterService.accessor("release"),
            releaseByMonthAccessor = function(d) {
                var date = releaseAccessor(d);
                return new Date(date.getFullYear(), date.getMonth());
            },
            releaseByYearAccessor = function(d) {
                return new Date(releaseAccessor(d).getFullYear());
            },
            scoreAccessor = CrossfilterService.accessor("score"),
            titleAccessor = CrossfilterService.accessor("title");

        // Crossfilter Index
        var index = crossfilter(data);

        // Chart 1
        var dimension1 = index.dimension(platformAccessor),
            group1 = CrossfilterService.reduceCount(dimension1.group()),
            chart1 = dc.rowChart("#chart1")
            .width(350)
            .height(300)
            .dimension(dimension1)
            .group(group1)
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart1.render();

        // Chart 1
        var dimension2 = index.dimension(platformAccessor),
            group2 = CrossfilterService.reduceAvg(dimension2.group(), criticScoreAccessor);
            chart2 = dc.rowChart("#chart2")
            .width(350)
            .height(300)
            .dimension(dimension2)
            .group(group2)
            .valueAccessor(function(p) {
                return p.value.valueOf();
            })
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart2.render();

        // Chart 1
        var dimension3 = index.dimension(platformAccessor),
            group3 = CrossfilterService.reduceAvg(dimension3.group(), scoreAccessor);
            chart3 = dc.rowChart("#chart3")
            .width(350)
            .height(300)
            .dimension(dimension3)
            .group(group3)
            .valueAccessor(function(p) {
                return p.value.valueOf();
            })
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart3.render();

        // Chart 3
        var dimension4 = index.dimension(publisherAccessor),
            group4 = CrossfilterService.reduceCount(dimension4.group()),
            chart4 = dc.rowChart("#chart4")
            .width(350)
            .height(400)
            .dimension(dimension4)
            .group(group4)
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart4.render();

        // Chart 5
        var dimension5 = index.dimension(publisherAccessor),
            group5 = CrossfilterService.reduceAvg(dimension5.group(), criticScoreAccessor);
            chart5 = dc.rowChart("#chart5")
            .width(350)
            .height(400)
            .dimension(dimension5)
            .group(group5)
            .valueAccessor(function(p) {
                if(p.key === "Others") {
                    return p.value;
                }
                return p.value.valueOf();
            })
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart5.othersGrouper(CrossfilterService.avgOthersGrouper(chart5));
        chart5.render();

        // Chart 6
        var dimension6 = index.dimension(publisherAccessor),
            group6 = CrossfilterService.reduceAvg(dimension6.group(), scoreAccessor);
            chart6 = dc.rowChart("#chart6")
            .width(350)
            .height(400)
            .dimension(dimension6)
            .group(group6)
            .valueAccessor(function(p) {
                if(p.key === "Others") {
                    return p.value;
                }
                return p.value.valueOf();
            })
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart6.othersGrouper(CrossfilterService.avgOthersGrouper(chart6));
        chart6.render();

        // Chart 7
        var dimension7 = index.dimension(titleAccessor),
            group7 = CrossfilterService.reduceAvg(dimension7.group(), criticScoreAccessor);
            chart7 = dc.rowChart("#chart7")
            .width(350)
            .height(400)
            .dimension(dimension7)
            .group(group7)
            .valueAccessor(function(p) {
                if(p.key === "Others") {
                    return p.value;
                }
                return p.value.valueOf();
            })
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart7.othersGrouper(CrossfilterService.avgOthersGrouper(chart7));
        chart7.render();

        // Chart 8
        var dimension8 = index.dimension(titleAccessor),
            group8 = CrossfilterService.reduceAvg(dimension8.group(), scoreAccessor);
            chart8 = dc.rowChart("#chart8")
            .width(350)
            .height(400)
            .dimension(dimension8)
            .group(group8)
            .valueAccessor(function(p) {
                if(p.key === "Others") {
                    return p.value;
                }
                return p.value.valueOf();
            })
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13);
        chart8.othersGrouper(CrossfilterService.avgOthersGrouper(chart8));
        chart8.render();

        // Chart 9
        var dimension9 = index.dimension(platformAccessor),
            group9 = dimension9.group().reduce(function(p, v) {
                ++p.count;
                var critic_score = criticScoreAccessor(v);
                if(critic_score) {
                    ++p.critic_count;
                    p.critic_sum += critic_score;
                }
                var user_score = scoreAccessor(v);
                if(user_score) {
                    ++p.user_count;
                    p.user_sum += user_score;
                }
                return p;
            }, function(p, v) {
                --p.count;
                var critic_score = criticScoreAccessor(v);
                if(critic_score) {
                    --p.critic_count;
                    p.critic_sum -= critic_score;
                }
                var user_score = scoreAccessor(v);
                if(user_score) {
                    --p.user_count;
                    p.user_sum -= user_score;
                }
                return p;
            }, function() {
                return {
                    count: 0,
                    user_count: 0,
                    user_sum: 0,
                    user_avg : function() {
                        return this.user_sum / this.user_count;
                    },
                    critic_count: 0,
                    critic_sum: 0,
                    critic_avg : function() {
                        return this.critic_sum / this.critic_count;
                    }
                };
            }),
            chart9 = dc.bubbleChart("#chart9")
            .width(1000)
            .height(400)
            .dimension(dimension9)
            .group(group9)
            .colorAccessor(function (d) {
                return d.value.critic_avg();
            })
            .keyAccessor(function (p) {
                return p.value.critic_avg();
            })
            .valueAccessor(function (p) {
                return p.value.user_avg();
            })
            .radiusValueAccessor(function (p) {
                return p.value.count;
            })
            .maxBubbleRelativeSize(0.1)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 10]))
            .r(d3.scale.linear().domain([0, 11000]))
            .elasticY(true)
            .elasticX(true)
            .xAxisLabel('Average Critic Score')
            .yAxisLabel('Average User Score')
            .yAxisPadding(0.5)
            .xAxisPadding(3)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .renderTitle(true)
            .title(function (p) {
                return [p.key,
                   "# of Titles: " + p.value.count,
                   "Average Critic Score: " + numberFormat(p.value.critic_avg()),
                   "Average User Score: " + numberFormat(p.value.user_avg())]
                   .join("\n");
            });
        chart9.render();
    }

    var q = queue();
    q.defer(parseData, 'data/metacritic/videoGames/metacritic_games_20130313_formatted.csv');
    q.await(render);
}]);
