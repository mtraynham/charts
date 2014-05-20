angular.module('charts').service 'GeoService', ->
    getTopoFeatures = (path, objectPath, callback) ->
        d3.json path, (data) -> callback null, topojson.feature(data, data.objects[objectPath]).features

    @deferWorld50 = (queue) ->
        queue.defer getTopoFeatures, 'vendor/topojsonexports/world-atlas/topo/ne_50m_admin_0_countries_lakes.json',
            'ne_50m_admin_0_countries_lakes'
    @deferUS50 = (queue) ->
        queue defer getTopoFeatures, 'vendor/topojsonexports/world-atlas/topo/ne_50m_us_states_lakes.json', 'states'

    countryList = [
        ["ATA", "AQ", "Antarctica"],
        ["ABW", "AW", "Aruba"],
        ["AND", "AD", "Andorra"],
        ["AFG", "AF", "Afghanistan"],
        ["AGO", "AO", "Angola"],
        ["ALB", "AL", "Albania"],
        ["ARE", "AE", "United Arab Emirates"],
        ["ARG", "AR", "Argentina"],
        ["ARM", "AM", "Armenia"],
        ["ASM", "AS", "American Samoa"],
        ["ATG", "AG", "Antigua and Barbuda"],
        ["AUS", "AU", "Australia"],
        ["AUT", "AT", "Austria"],
        ["AZE", "AZ", "Azerbaijan"],
        ["BDI", "BI", "Burundi"],
        ["BEL", "BE", "Belgium"],
        ["BEN", "BJ", "Benin"],
        ["BFA", "BF", "Burkina Faso"],
        ["BGD", "BD", "Bangladesh"],
        ["BGR", "BG", "Bulgaria"],
        ["BHR", "BH", "Bahrain"],
        ["BHS", "BS", "Bahamas, The"],
        ["BIH", "BA", "Bosnia and Herzegovina"],
        ["BLR", "BY", "Belarus"],
        ["BLZ", "BZ", "Belize"],
        ["BMU", "BM", "Bermuda"],
        ["BOL", "BO", "Bolivia"],
        ["BRA", "BR", "Brazil"],
        ["BRB", "BB", "Barbados"],
        ["BRN", "BN", "Brunei Darussalam"],
        ["BTN", "BT", "Bhutan"],
        ["BWA", "BW", "Botswana"],
        ["CAF", "CF", "Central African Republic"],
        ["CAN", "CA", "Canada"],
        ["CHE", "CH", "Switzerland"],
        ["CHL", "CL", "Chile"],
        ["CHN", "CN", "China"],
        ["CIV", "CI", "Cote d'Ivoire"],
        ["CMR", "CM", "Cameroon"],
        ["COG", "CG", "Congo, Rep."],
        ["COL", "CO", "Colombia"],
        ["COM", "KM", "Comoros"],
        ["CPV", "CV", "Cabo Verde"],
        ["CRI", "CR", "Costa Rica (CRC)"],
        ["CUB", "CU", "Cuba"],
        ["CYM", "KY", "Cayman Islands"],
        ["CYP", "CY", "Cyprus"],
        ["CZE", "CZ", "Czech Republic"],
        ["DEU", "DE", "Germany"],
        ["DJI", "DJ", "Djibouti"],
        ["DMA", "DM", "Dominica"],
        ["DNK", "DK", "Denmark"],
        ["DOM", "DO", "Dominican Republic"],
        ["DZA", "DZ", "Algeria"],
        ["ECU", "EC", "Ecuador"],
        ["EGY", "EG", "Egypt, Arab Rep."],
        ["ERI", "ER", "Eritrea"],
        ["ESP", "ES", "Spain"],
        ["EST", "EE", "Estonia"],
        ["ETH", "ET", "Ethiopia"],
        ["FIN", "FI", "Finland"],
        ["FJI", "FJ", "Fiji"],
        ["FRA", "FR", "France"],
        ["FRO", "FO", "Faeroe Islands"],
        ["FSM", "FM", "Micronesia, Fed. Sts."],
        ["GAB", "GA", "Gabon"],
        ["GBR", "GB", "United Kingdom"],
        ["GEO", "GE", "Georgia"],
        ["GHA", "GH", "Ghana"],
        ["GIN", "GN", "Guinea"],
        ["GMB", "GM", "Gambia, The"],
        ["GNB", "GW", "Guinea-Bissau"],
        ["GNQ", "GQ", "Equatorial Guinea"],
        ["GRC", "GR", "Greece"],
        ["GRD", "GD", "Grenada"],
        ["GRL", "GL", "Greenland"],
        ["GTM", "GT", "Guatemala"],
        ["GUM", "GU", "Guam"],
        ["GUY", "GY", "Guyana"],
        ["HKG", "HK", "Hong Kong SAR, China"],
        ["HND", "HN", "Honduras"],
        ["HRV", "HR", "Croatia"],
        ["HTI", "HT", "Haiti"],
        ["HUN", "HU", "Hungary"],
        ["IDN", "ID", "Indonesia"],
        ["IMN", "IM", "Isle of Man"],
        ["IND", "IN", "India"],
        ["IRL", "IE", "Ireland"],
        ["IRN", "IR", "Iran, Islamic Rep."],
        ["IRQ", "IQ", "Iraq"],
        ["ISL", "IS", "Iceland"],
        ["ISR", "IL", "Israel"],
        ["ITA", "IT", "Italy"],
        ["JAM", "JM", "Jamaica"],
        ["JOR", "JO", "Jordan"],
        ["JPN", "JP", "Japan"],
        ["KAZ", "KZ", "Kazakhstan"],
        ["KEN", "KE", "Kenya"],
        ["KGZ", "KG", "Kyrgyz Republic"],
        ["KHM", "KH", "Cambodia"],
        ["KIR", "KI", "Kiribati"],
        ["KNA", "KN", "St. Kitts and Nevis"],
        ["KOR", "KR", "Korea, Rep."],
        ["KWT", "KW", "Kuwait"],
        ["LAO", "LA", "Lao PDR"],
        ["LBN", "LB", "Lebanon"],
        ["LBR", "LR", "Liberia"],
        ["LBY", "LY", "Libya"],
        ["LCA", "LC", "St. Lucia"],
        ["LIE", "LI", "Liechtenstein"],
        ["LKA", "LK", "Sri Lanka"],
        ["LSO", "LS", "Lesotho"],
        ["LTU", "LT", "Lithuania"],
        ["LUX", "LU", "Luxembourg"],
        ["LVA", "LV", "Latvia"],
        ["MAC", "MO", "Macao SAR, China"],
        ["MAF", "MF", "St. Martin (French part)"],
        ["MAR", "MA", "Morocco"],
        ["MCO", "MC", "Monaco"],
        ["MDA", "MD", "Moldova"],
        ["MDG", "MG", "Madagascar"],
        ["MDV", "MV", "Maldives"],
        ["MEX", "MX", "Mexico"],
        ["MHL", "MH", "Marshall Islands"],
        ["MKD", "MK", "Macedonia, FYR"],
        ["MLI", "ML", "Mali"],
        ["MLT", "MT", "Malta"],
        ["MMR", "MM", "Myanmar"],
        ["MNE", "ME", "Montenegro"],
        ["MNG", "MN", "Mongolia"],
        ["MNP", "MP", "Northern Mariana Islands"],
        ["MOZ", "MZ", "Mozambique"],
        ["MRT", "MR", "Mauritania"],
        ["MUS", "MU", "Mauritius"],
        ["MWI", "MW", "Malawi"],
        ["MYS", "MY", "Malaysia"],
        ["NAM", "NA", "Namibia"],
        ["NCL", "NC", "New Caledonia"],
        ["NER", "NE", "Niger"],
        ["NGA", "NG", "Nigeria"],
        ["NIC", "NI", "Nicaragua"],
        ["NLD", "NL", "Netherlands"],
        ["NOR", "NO", "Norway"],
        ["NPL", "NP", "Nepal"],
        ["NZL", "NZ", "New Zealand"],
        ["OMN", "OM", "Oman"],
        ["PAK", "PK", "Pakistan"],
        ["PAN", "PA", "Panama"],
        ["PER", "PE", "Peru"],
        ["PHL", "PH", "Philippines"],
        ["PLW", "PW", "Palau"],
        ["PNG", "PG", "Papua New Guinea"],
        ["POL", "PL", "Poland"],
        ["PRI", "PR", "Puerto Rico"],
        ["PRK", "KP", "Korea, Dem. Rep."],
        ["PRT", "PT", "Portugal"],
        ["PRY", "PY", "Paraguay"],
        ["PYF", "PF", "French Polynesia"],
        ["QAT", "QA", "Qatar"],
        ["ROU", "RO", "Romania"],
        ["RUS", "RU", "Russian Federation"],
        ["RWA", "RW", "Rwanda"],
        ["SAU", "SA", "Saudi Arabia"],
        ["SDN", "SD", "Sudan"],
        ["SEN", "SN", "Senegal"],
        ["SGP", "SG", "Singapore"],
        ["SLB", "SB", "Solomon Islands"],
        ["SLE", "SL", "Sierra Leone"],
        ["SLV", "SV", "El Salvador"],
        ["SMR", "SM", "San Marino"],
        ["SOM", "SO", "Somalia"],
        ["SRB", "RS", "Serbia"],
        ["STP", "ST", "Sao Tome and Principe"],
        ["SUR", "SR", "Suriname"],
        ["SVK", "SK", "Slovak Republic"],
        ["SVN", "SI", "Slovenia"],
        ["SWE", "SE", "Sweden"],
        ["SWZ", "SZ", "Swaziland"],
        ["SYC", "SC", "Seychelles"],
        ["SYR", "SY", "Syrian Arab Republic"],
        ["TCA", "TC", "Turks and Caicos Islands"],
        ["TCD", "TD", "Chad"],
        ["TGO", "TG", "Togo"],
        ["THA", "TH", "Thailand"],
        ["TJK", "TJ", "Tajikistan"],
        ["TKM", "TM", "Turkmenistan"],
        ["TLS", "TL", "Timor-Leste"],
        ["TON", "TO", "Tonga"],
        ["TTO", "TT", "Trinidad and Tobago"],
        ["TUN", "TN", "Tunisia"],
        ["TUR", "TR", "Turkey"],
        ["TUV", "TV", "Tuvalu"],
        ["TZA", "TZ", "Tanzania"],
        ["UGA", "UG", "Uganda"],
        ["UKR", "UA", "Ukraine"],
        ["URY", "UY", "Uruguay"],
        ["USA", "US", "United States"],
        ["UZB", "UZ", "Uzbekistan"],
        ["VCT", "VC", "St. Vincent and the Grenadines"],
        ["VEN", "VE", "Venezuela, RB"],
        ["VIR", "VI", "Virgin Islands (U.S.)"],
        ["VNM", "VN", "Vietnam"],
        ["VUT", "VU", "Vanuatu"],
        ["WSM", "WS", "Samoa"],
        ["YEM", "YE", "Yemen, Rep."],
        ["ZAF", "ZA", "South Africa"],
        ["COD", "CD", "Congo, Dem. Rep."],
        ["ZMB", "ZM", "Zambia"],
        ["ZWE", "ZW", "Zimbabwe"]
    ]

    @countryISO3to2 = countryList.reduce (previous, current) ->
        previous.set current[0], current[1]
        previous
    , new d3.map()
    @countryISO3toCountryName = countryList.reduce (previous, current) ->
        previous.set current[0], current[2]
        previous
    , new d3.map()
    @countryISO2to3 = countryList.reduce (previous, current) ->
        previous.set current[1], current[0]
        previous
    , new d3.map()
    @countryISO2toCountryName = countryList.reduce (previous, current) ->
        previous.set current[0], current[2]
        previous
    , new d3.map()
    null
