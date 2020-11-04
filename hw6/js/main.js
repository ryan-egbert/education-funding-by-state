let data = [];
let matrix_data = [];
let map = new Map();

map.set('ALABAMA', 'Alabama');
map.set('ALASKA', 'Alaska');
map.set('ARIZONA', 'Arizona');
map.set('ARKANSAS', 'Arkansas');
map.set('CALIFORNIA', 'California');
map.set('COLORADO', 'Colorado');
map.set('CONNECTICUT', 'Connecticut');
map.set('DELAWARE', 'Delaware');
map.set('DISTRICT_OF_COLUMBIA', 'Washingtonn DC');
map.set('FLORIDA', 'Florida');
map.set('GEORGIA', 'Georgia');
map.set('HAWAII', 'Hawaii');
map.set('IDAHO', 'Idaho');
map.set('ILLINOIS', 'Illinois');
map.set('INDIANA', 'Indiana');
map.set('IOWA', 'Iowa');
map.set('KANSAS', 'Kansas');
map.set('KENTUCKY', 'Kentucky');
map.set('LOUISIANA', 'Louisiana');
map.set('MAINE', 'Maine');
map.set('MARYLAND', 'Maryland');
map.set('MASSACHUSETTS', 'Massachusettes');
map.set('MICHIGAN', 'Michigan');
map.set('MINNESOTA', 'Minnesota');
map.set('MISSISSIPPI', 'Mississippi');
map.set('MISSOURI',  'Missouri');
map.set('MONTANA', 'Montana');
map.set('NEBRASKA', 'Nebraska');
map.set('NEVADA', 'Nevada');
map.set('NEW_HAMPSHIRE', 'New Hampshire');
map.set('NEW_JERSEY', 'New Jersey');
map.set('NEW_MEXICO', 'New Mexico');
map.set('NEW_YORK', 'New York');
map.set('NORTH_CAROLINA', 'North Carolina');
map.set('NORTH_DAKOTA', 'North Dakota');
map.set('OHIO', 'Ohio');
map.set('OKLAHOMA', 'Oklahoma');
map.set('OREGON', 'Oregon');
map.set('PENNSYLVANIA', 'Pennsylvania');
map.set('RHODE_ISLAND', 'Rhode Island');
map.set('SOUTH_CAROLINA', 'South Carolina');
map.set('SOUTH_DAKOTA', 'South Dakota');
map.set('TENNESSEE', 'Tennesse');
map.set('TEXAS', 'Texas');
map.set('UTAH', 'Utah');
map.set('VERMONT', 'Vermont');
map.set('VIRGINIA', 'Virginia');
map.set('WASHINGTON', 'Washington');
map.set('WEST_VIRGINIA', 'West Virginia');
map.set('WISCONSIN', 'Wisconsin');
map.set('WYOMING', 'Wyoming');

function init() {
    d3.csv("data/state_position.csv", d => {
        matrix_data.push({'Abbreviation':d.Abbreviation,'State':d.State, 'Region':d.Region, 'Row':+d.Row, 'Column':+d.Column});
    });

    d3.csv("data/states_all.csv", d => {
      data.push({'primary_key':d.PRIMARY_KEY, 'state':d.STATE, 'state_lc':map.get(d.STATE), 'year':d.YEAR, 'enroll':d.ENROLL, 'total_rev':+d.TOTAL_REVENUE, 'fed_rev':+d.FEDERAL_REVENUE, 'state_rev':+d.STATE_REVENUE, 'local_rev':+d.LOCAL_REVENUE, 'total_expend':+d.TOTAL_EXPENDITURE, 'instrunction_expend':+d.INSTRUCTION_EXPENDITURE, 'support_expend':+d.SUPPORT_SERVICES_EXPENDITURE, 'other_expend':+d.OTHER_EXPENDITURE, 'capital_expend':+d.CAPITAL_OUTLAY_EXPENDITURE});
    }).then(() => {
    matrix(matrix_data, data, "1993");
  // console.log(data);
  // console.log(matrix_data);
  let stacked = [];
  data.forEach(d => {
    if (d.year == "1993") {
      stacked.push(d);
    } 
  })
  // console.log(stacked);
  expendBarGraph(data, "1993");
  revenueBarGraph(data, "1993");
  createTimeline(data);
  createOverUnder(data, "1993");
  createTooltip();
  });
}

init();