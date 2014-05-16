angular.module('charts').controller('Example2Ctrl', ['$scope', 'CrossfilterService',
    function ($scope, CrossfilterService) {

    var timeFormat = d3.time.format("%b %e, %Y");
    var numberFormat = d3.format(".2f");
    var colors = d3.map({
        // Dreamcast
        "dreamcast": colorbrewer.Oranges[9][5],
        // PC
        "pc": colorbrewer.Purples[9][2],
        // Nintendo
        "n64": colorbrewer.Reds[9][3],
        "gamecube": colorbrewer.Reds[9][4],
        "wii": colorbrewer.Reds[9][5],
        "wii-u": colorbrewer.Reds[9][6],
        // Playstation
        "ps": colorbrewer.Blues[9][3],
        "ps2": colorbrewer.Blues[9][4],
        "ps3": colorbrewer.Blues[9][5],
        "ps4": colorbrewer.Blues[9][6],
        // XBox
        "xbox": colorbrewer.Greens[9][3],
        "xbox360": colorbrewer.Greens[9][4],
        "xboxone": colorbrewer.Greens[9][5]
    });

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
        d3.csv(data, function (row) {
            /* jshint camelcase: false */
            row.critic_score = CrossfilterService.coerceNumber(row.critic_score);
            /* jshint camelcase: true */
            row.genre = CrossfilterService.coerceArray(row.genre);
            row.platform = CrossfilterService.coerceString(row.platform);
            row.publisher = CrossfilterService.coerceString(row.publisher);
            row.rating = CrossfilterService.coerceString(row.rating);
            row.release = CrossfilterService.coerceDate(timeFormat, row.release);
            row.score = CrossfilterService.coerceNumber(row.score);
            row.title = CrossfilterService.coerceString(row.title);
            row.url = CrossfilterService.coerceString(row.url);
            return row;
        }, function (data) {
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
            releaseByMonthAccessor = function (d) {
                var date = releaseAccessor(d);
                return new Date(date.getFullYear(), date.getMonth());
            },
            releaseByYearAccessor = function (d) {
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
            .width(1000)
            .height(300)
            .dimension(dimension1)
            .group(group1)
            .elasticX(true)
            .cap(20)
            .gap(1)
            .labelOffsetY(13)
            .colors(function (d) {
                return colors.get(d);
            });
        chart1.render();

        // Chart 2
        var dimension2 = index.dimension(platformAccessor),
            group2 = dimension2.group().reduce(function (p, v) {
                ++p.count;
                var criticScore = criticScoreAccessor(v);
                if (criticScore) {
                    ++p.criticCount;
                    p.criticSum += criticScore;
                }
                var userScore = scoreAccessor(v);
                if (userScore) {
                    ++p.userCount;
                    p.userSum += userScore;
                }
                return p;
            }, function (p, v) {
                --p.count;
                var criticScore = criticScoreAccessor(v);
                if (criticScore) {
                    --p.criticCount;
                    p.criticSum -= criticScore;
                }
                var userScore = scoreAccessor(v);
                if (userScore) {
                    --p.userCount;
                    p.userSum -= userScore;
                }
                return p;
            }, function () {
                return {
                    count: 0,
                    userCount: 0,
                    userSum: 0,
                    userAvg : function () {
                        return this.userSum / this.userCount;
                    },
                    criticCount: 0,
                    criticSum: 0,
                    criticAvg : function () {
                        return this.criticSum / this.criticCount;
                    }
                };
            }),
            chart2 = dc.bubbleChart("#chart2")
            .width(1000)
            .height(400)
            .dimension(dimension2)
            .group(group2)
            .keyAccessor(function (p) {
                return p.value.criticAvg();
            })
            .valueAccessor(function (p) {
                return p.value.userAvg();
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
                   "Average Critic Score: " + numberFormat(p.value.criticAvg()),
                   "Average User Score: " + numberFormat(p.value.userAvg())]
                   .join("\n");
            })
            .colorAccessor(function (d) {
                return d.key;
            })
            .colors(function (d) {
                return colors.get(d);
            });
        chart2.render();

        // Chart 3
        var dimension3 = index.dimension(releaseAccessor),
            group3Critic = CrossfilterService.reduceAvg(dimension2.group(), criticScoreAccessor),
            group3User = CrossfilterService.reduceAvg(dimension2.group(), scoreAccessor),
            chart3 = dc.lineChart("#chart3")
            .width(1000)
            .height(400)
            .dimension(dimension3)
            .group(group3Critic, "Average Critic Score")
            .x(d3.time.scale().domain(d3.extent(dimension3.top(Number.POSITIVE_INFINITY), releaseAccessor)))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .y(d3.scale.linear().domain([0, 20]))
            .stack(group3User, "Average User Score")
            .elasticY(true)
            .xAxisLabel('Release Date')
            .yAxisLabel('Score')
            .yAxisPadding(0.5)
            .xAxisPadding(3)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .colorAccessor(function (d) {
                return d.key;
            })
            .colors(function (d) {
                return colors.get(d);
            });
        chart3.render();


    }

    var q = queue();
    q.defer(parseData, 'data/metacritic/metacritic_games_20130313_formatted.csv');
    q.await(render);
}]);
