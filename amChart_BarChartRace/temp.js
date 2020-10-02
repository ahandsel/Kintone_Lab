const records = [{
    "Number_0": {
      "type": "NUMBER",
      "value": "53910000"
    },
    "Number": {
      "type": "NUMBER",
      "value": "2014"
    },
    "Record_number": {
      "type": "RECORD_NUMBER",
      "value": "180"
    }
    "Drop_down": {
      "type": "DROP_DOWN",
      "value": "ZTE"
    }
  },
  {
    "Number_0": {
      "type": "NUMBER",
      "value": "0"
    },
    "Number": {
      "type": "NUMBER",
      "value": "2005"
    },
    "Record_number": {
      "type": "RECORD_NUMBER",
      "value": "2"
    }
    "Drop_down": {
      "type": "DROP_DOWN",
      "value": "BlackBerry"
    }
  },
  {
    "Number_0": {
      "type": "NUMBER",
      "value": "0"
    },
    "Number": {
      "type": "NUMBER",
      "value": "2005"
    },
    "Record_number": {
      "type": "RECORD_NUMBER",
      "value": "1"
    }
    "Drop_down": {
      "type": "DROP_DOWN",
      "value": "Apple"
    }
  }
];
// Accepts the array and key
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it
    // Else, create an array & push the object
    if (!result[currentValue[key]]) {
      result[currentValue[key]] = [];
    }
    result[currentValue[key]].push(currentValue);

    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

// Group by color as key to the person array
const dataGroupedByYear = groupBy(records, 'Number');
console.log(dataGroupedByYear);