angular.module('charts').controller 'Example1Ctrl', ['$scope', 'GeoService', ($scope, GeoService) ->

    # Ignored datums (Country Name)
    ignoredDatums = d3.set([
        'Arab World'
        'Caribbean small states'
        'Channel Islands'
        'East Asia & Pacific (all income levels)'
        'East Asia & Pacific (developing only)'
        'East Asia and the Pacific (IFC classification)'
        'Euro area'
        'Europe & Central Asia (all income levels)'
        'Europe & Central Asia (developing only)'
        'Europe and Central Asia (IFC classification)'
        'European Union'
        'Heavily indebted poor countries (HIPC)'
        'High income: nonOECD'
        'High income: OECD'
        'High income'
        'Latin America & Caribbean (all income levels)'
        'Latin America & Caribbean (developing only)'
        'Latin America and the Caribbean (IFC classification)'
        'Least developed countries: UN classification'
        'Low & middle income'
        'Low income'
        'Lower middle income'
        'Middle East & North Africa (all income levels)'
        'Middle East & North Africa (developing only)'
        'Middle East and North Africa (IFC classification)'
        'Middle income'
        'North America'
        'Not classified'
        'OECD members'
        'Other small states'
        'Pacific island small states'
        'Small states'
        'South Asia (IFC classification)'
        'South Asia'
        'Sub-Saharan Africa (all income levels)'
        'Sub-Saharan Africa (developing only)'
        'Sub-Saharan Africa (IFC classification)'
        'Turks and Caicos Islands'
        'Upper middle income'
        'World'
    ])

    # D3 Formats
    yearFormat = d3.time.format('%Y')
    priceFormat = d3.format('$s')

    ###
    Handles parsing of CSV data.
    Parse the rows
    Reduces by year
    Nests by Country Name, Year
    Flattens keys of nest
    ###
    parseData = (data, callback) ->
        d3.csv data, ((row) ->
            return null  if ignoredDatums.has(row['Country Name'])
            if GeoService.countryISO3to2.has(row['Country Code'])
                row['Country Code'] = GeoService.countryISO3to2.get(row['Country Code'])
            years = []
            for key of row
                if key is ''
                    delete row[key]
                else unless isNaN(key)
                    years.push
                        year: key
                        value: (if not isNaN(row[key]) then +row[key] else 0)
                    delete row[key]
            row.years = years
            row
        ), (data) ->
            data = data.reduce((previous, current) ->
                i = 0
                while i < current.years.length
                    previous.push
                        'Country Name': current['Country Name']
                        'Country Code': current['Country Code']
                        'Indicator Name': current['Indicator Name']
                        'Indicator Code': current['Indicator Code']
                        Year: current.years[i].year
                        Value: current.years[i].value
                    i += 1
                previous
            , [])
            data = d3.nest().key((d) ->
                d['Country Name']
            ).key((d) ->
                d.Year
            ).rollup((values) ->
                values.reduce ((previous, current) ->
                    previous['Country Code'] = current['Country Code']
                    previous[current['Indicator Name']] = current.Value
                    previous
                ), {}
            ).entries(data)
            data = data.reduce((previous, current) ->
                countryName = current.key
                countryValues = current.values
                i = 0
                while i < countryValues.length
                    year = countryValues[i].key
                    yearValues = countryValues[i].values
                    yearValues['Country Name'] = countryName
                    yearValues.Year = yearFormat.parse year
                    previous.push yearValues
                    i += 1
                previous
            , [])
            callback null, data

    ###
    Rendering of data
    ###
    render = (error, data, worldGeoFeatures) ->
        # Easy accessor function
        accessor = (property) -> (d) -> d[property]

        # Accessors
        countryNameAccessor = accessor 'Country Name'
        countryCodeAccessor = accessor 'Country Code'
        yearAccessor = accessor 'Year'
        paymentsAccessor = accessor 'Charges for the use of intellectual property, payments (BoP, current US$)'
        receiptsAccessor = accessor 'Charges for the use of intellectual property, receipts (BoP, current US$)'

        # Crossfilter Index
        index = crossfilter data

        # Chart 1
        dimension1 = index.dimension yearAccessor
        group1 = dimension1.group().reduceSum paymentsAccessor
        chart1 = dc.barChart '#chart1'
            .width 400
            .height 200
            .dimension dimension1
            .group group1
            .elasticY true
            .x d3.time.scale().domain d3.extent dimension1.top Number.POSITIVE_INFINITY, yearAccessor
                .xUnits d3.time.years
        chart1.yAxis().tickFormat priceFormat
        chart1.render()

        # Chart 2
        dimension2 = index.dimension yearAccessor
        group2 = dimension1.group().reduceSum receiptsAccessor
        chart2 = dc.barChart '#chart2'
            .width 400
            .height 200
            .dimension dimension2
            .group group2
            .elasticY true
            .x d3.time.scale().domain d3.extent dimension2.top Number.POSITIVE_INFINITY, yearAccessor
            .xUnits d3.time.years
        chart2.yAxis().tickFormat priceFormat
        chart2.render()

        # Chart 3
        dimension3 = index.dimension countryNameAccessor
        group3 = dimension3.group().reduceSum paymentsAccessor
        chart3 = dc.rowChart '#chart3'
            .width 400
            .height 400
            .dimension dimension3
            .group group3
            .elasticX true
            .cap 20
            .gap 1
            .labelOffsetY 13
        chart3.xAxis().tickFormat priceFormat
        chart3.render()

        # Chart 4
        dimension4 = index.dimension countryNameAccessor
        group4 = dimension4.group().reduceSum receiptsAccessor
        chart4 = dc.rowChart '#chart4'
            .width 400
            .height 400
            .dimension dimension4
            .group group4
            .elasticX true
            .cap 20
            .gap 1
            .labelOffsetY 13
        chart4.xAxis().tickFormat priceFormat
        chart4.render()

        # Chart 5
        chart5Width = 400
        chart5Height = 250
        dimension5 = index.dimension countryCodeAccessor
        group5 = dimension5.group().reduceSum paymentsAccessor
        chart5 = dc.geoChoroplethChart '#chart5'
            .width chart5Width
            .height chart5Height
            .dimension dimension5
            .group group5
            .title (d) ->
                'Country: ' + GeoService.countryISO2toCountryName.get(d.key) + '\n' + 'Value: ' + d.value
        projection5 = d3.geo.mercator()
        projection5.scale (chart5Width + 1) / 2 / Math.PI
        projection5.translate [ chart5Width / 2, chart5Height / 1.8 ]
        chart5.projection projection5
        chart5.overlayGeoJson worldGeoFeatures, 'state', (d) -> d.id
        chart5.on 'preRender', (chart) ->
            chart.colorDomain d3.extent chart.data(), chart.valueAccessor()
        chart5.on 'preRedraw', (chart) ->
            chart.colorDomain d3.extent chart.data(), chart.valueAccessor()
        chart5.render()

        # Chart 6
        chart6Width = 400
        chart6Height = 250
        dimension6 = index.dimension countryCodeAccessor
        group6 = dimension6.group().reduceSum receiptsAccessor
        chart6 = dc.geoChoroplethChart '#chart6'
            .width chart6Width
            .height chart6Height
            .dimension dimension6
            .group group6
            .title (d) ->
                'Country: ' + GeoService.countryISO2toCountryName.get(d.key) + '\n' + 'Value: ' + d.value
        chart6.overlayGeoJson worldGeoFeatures, 'state', (d) -> d.id
        projection6 = d3.geo.mercator()
        projection6.scale (chart6Width + 1) / 2 / Math.PI
        projection6.translate [ chart6Width / 2, chart6Height / 1.8 ]
        chart6.projection projection6
        chart6.on 'preRender', (chart) ->
            chart.colorDomain d3.extent(chart.data(), chart.valueAccessor())
        chart6.on 'preRedraw', (chart) ->
            chart.colorDomain d3.extent(chart.data(), chart.valueAccessor())
        chart6.render()

    q = queue()
    q.defer parseData, 'data/14_Topic_en_csv_v2/14_Topic_en_csv_v2.csv'
    GeoService.deferWorld50 q
    q.await render
]