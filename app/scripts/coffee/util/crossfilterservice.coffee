angular.module('charts').service 'CrossfilterService', ->
    @coerceNumber = (number) ->
        if number? and !isNan(number) then +number else null
    @coerceDate = (timeFormat, date) ->
        if date? then timeFormat.parse(data) else null
    @coerceArray = (array) ->
        if array? then array.split(',').reduce (previous, current) ->
            previous[current.trim()] = true
            previous
        , {}
        else null
    @coerceString = (string) ->
        if string? then string else null
    @accessor = (property) ->
        (d) -> d[property]
    @reduceAvg = (group, accessor) ->
        group.reduce (p, v) ->
            p.count += 1
            p.sum += accessor v
            p
        , (p, v) ->
            p.count -= 1
            p.sum -= accessor v
            p
        , (p) ->
            count: 0
            sum: 0
            valueOf: ->
                if @count isnt 0 then @sum / @count else 0
    @reduceCount = (group) ->
        group.reduce (p,v) ->
            p + 1
        , (p, v) ->
            p - 1
        , (p) -> 0
    @reduceSum = (group, accessor) ->
        group.reduce (p,v) ->
            val = accessor v
            if val? then p + val else p
        , (p,v) ->
            val = accessor v
            if val? then p - val else p
        , (p) -> 0
    @avgOthersGrouper = (chart) ->
        (topRows) ->
            topRowsCount = d3.sum topRows, (d) -> d.value.count
            topRowsSum = d3.sum topRows, (d) -> d.value.sum
            allRows = chart.group().all()
            allRowsCount = d3.sum allRows, (d) -> d.value.count
            allRowsSum = d3.sum allRows, (d) -> d.value.sum
            topKeys = topRows.map chart.keyAccessor()
            allKeys = allRows.map chart.keyAccessor()
            topSet = d3.set topKeys
            others = allKeys.filter (d) -> !topSet.has d
            if allRows > topRowsSum then topRows.concat
                others: others
                key: chart.othersLabel()
                value: (allRowsSum - topRowsSum) / (allRowsCount - topRowsCount)
            else topRows
    null
