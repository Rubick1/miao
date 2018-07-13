
var rubick1 = {
  chunk: function(array, size) {
    var length = array.length
    var i = 0
    var result = []
    var j = 0
    while(i < length - size) {
      var subArray = []
      while(j < size) {
        subArray.push(array[i + j])
        j++
      }
      result.push(subArray)
      i += size
      j = 0
    }
    var subArray = []
    for (;i < length;i++) {
      subArray.push(array[i])
    }
    result.push(subArray)
    return result
  },

  compact: function(array) {
    var result = []
    var length = array.length
    for (let i = 0;i < length;i++) {
      if (array[i] === 0 || array[i] === false || array[i] === null || array[i] === "" ||array[i] === undefined || array[i] != array[i]) {
        continue
      } else{
        result.push(array[i])
      }
    }
    return result
  },

  difference: function(array,...arrays) {
    var length = array.length
    var arraysLength = arrays.length
    var result = []
    var compareArray = arrays[0]
    if (arrays.length > 1) {
      for (let i = 1;i < arraysLength;i++) {
        compareArray = compareArray.concat(arrays[i])
      }
    }
    var compareArrayLength = compareArray.length
    for (let i = 0;i < length;i++) {
      var value = array[i]
      for (let j = 0;j < compareArrayLength;j++) {
        if (SameValueZero(value,compareArray[j])) {
          break
        }
        if ( j = compareArrayLength - 1) {
          result.push(value)
        }
      }
    }
    return result
  },


    



}
