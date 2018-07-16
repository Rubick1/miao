
var rubick1 = {
  chunk: function(array, size = 1) {
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
      if (compareArray.indexOf(value) == -1) {
        result.push(value)
      }
    }
    return result
  },

  drop: function(array,n = 1) {
    var length = array.length
    var result = []
    if (n >= length) {
      return result
    }
    for (let i = n;i < length;i++) {
      result.push(array[i])
    }
    return result
  },

  dropRight: function(array,n = 1) {
    var length = array.length
    var result = []
    if (n >= length) {
      return result
    }
    for (let i = 0 ;i < length - n;i++) {
      result.push(array[i])
    }
    return result
  },

  fill: function(array,value,start,end) {
    start = start || 0
    end = end || array.length
    for (let i = start;i < end;i++) {
      array[i] = value
    }
    return array
  },

  head: function(array) {
    if (array.length == 0) {
      return undefined
    }
    return array[0]
  },

  //flatten的理解有误，实际上每次是把数组展开一个层级,返回的是新的数组
  flatten: function(array) {
    var result = []
    for (let i = 0;i < array.length;i++) {
      if (typeof array[i] == "object") {
        array[i].forEach(value => {result.push(value)})
      } else {
        result.push(array[i])
      }
    }
    return result
  },
  
  flattenDeep: function(array) {
    for (let i = 0;i < array.length;i++) {
      if (typeof array[i] == "object") { 
        return rubick1.flattenDeep(rubick1.flatten(array))      
      } 
    }
    return array
  },

  flattenDepth: function(array,depth = 1) {
    var result = array
    while (depth > 0) {
      result = rubick1.flatten(result)
      depth--
    }
    return result
  },
  
  fromPairs: function(array) {
    var map = {}
    for (let i = 0;i < array.length;i++) {
      map[array[i][0]] = array[i][1]
    }
    return map
  },
  
  indexOf: function(array,value,fromIndex = 0) {
    if (fromIndex >= 0) {
      for (let i = fromIndex;i < array.length;i++) {
        if (array[i] == value) {
          return i
        }
      }
    }else {
      for (let i = fromIndex + array.length; i < array.length;i++) {
        if (array[i] == value) {
          return i
        }
      }
    }
    return -1
  },

  initial: function(array) {
    return array.slice(0,array.length - 1)
  },

  intersection: function(...arrays) {
    var minLength = Infinity
    var minArrayIndex = 0
    var result = []
    for (let i = 0;i < arrays.length;i++) {
      if (arrays[i].length <= minLength) {
        minArrayIndex = i
        minLength = arrays[i].length
      }
    }

    var minArray = arrays[minArrayIndex]
    var map = {}
    var uniqueArray = []
    for (let i = 0;i < minLength;i++) {
      if (minArray[i] in map) {
        continue
      } else {
        map[minArray[i]] = 1
        uniqueArray.push(minArray[i])
      }
    }
    //需要清除minArray里面的重复项
    for (let i = 0;i < uniqueArray.length;i++) {
      var value = uniqueArray[i]
      for (let j = 0;j < arrays.length;j++) {
        if (arrays[j].indexOf(value) == -1) {
          break
        }
        if (j == arrays.length - 1) {
          result.push(value)
        }
      }
    }

    return result
  },

  join: function(array,separator = ",") {
    var result = ""
    if (array.length == 0) {
      return result
    }
    if (array.length == 1) {
      result += array[0]
      return result
    }
    result += array[0]
    for (let i = 1;i < array.length;i++) {
      result += separator 
      result += array[i]
    } 
    return result
  },

  last: function(array) {
    if (array.length == 0) {
      return array
    }
    return array[array.length - 1]
  },

  lastIndexOf: function(array,value,fromIndex) {
    fromIndex = fromIndex || array.length - 1
    for (let i = fromIndex;i >= 0;i--) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },

  nth: function(array,n = 0) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[array.length + n]
    }
  },
  
  pull: function(array,...vals) {
    for (let i = 0;i < vals.length;i++) {
      while(true) {
        var valIndex = array.indexOf(vals[i])
        if (valIndex == -1) {
          break
        } else{
          array.splice(valIndex,1)
        }
      }
    }
    return array
  },

  pullAll: function(array,values) {
    for (let i = 0;i < values.length;i++) {
      while(true) {
        var valIndex = array.indexOf(values[i])
        if (valIndex == -1) {
          break
        } else{
          array.splice(valIndex,1)
        }
      }
    }
    return array
  },

  reverse: function(array) {
    var length = array.length
    var halfLength = Math.floor(array.length / 2)
    for (let i = 0;i < halfLength;i++) {
      var temp = array[i]
      array[i] = array[length - 1 - i]
      array[length - 1 - i] = temp
    }
    return array
  },
  
  sortedIndex: function(array,value) {
    var left = 0
    var right = array.length - 1 
    var half = Math.floor((left + right) / 2)
    while(right - left > 1) {
      array[half] >= value ? right = half : left = half
      half = Math.floor((left + right) / 2)
    } 
    return array[right] >= value ? right : right + 1
  },

  sortedUniq: function(array) {
    var result = []
    var number = Infinity
    for (let i = 0;i < array.length;i++) {
      if (array[i] != number) {
        result.push(array[i])
        number = array[i]
      }
    }
    return result
  },

  tail: function(array) {
    if (array.length <= 1) {
      return []
    }
    return array.slice(1)
  },

  take: function(array,n = 1) {
    n = Math.min(array.length,n)
    return array.slice(0,n)
  },

  takeRight: function(array,n = 1) {
    n = Math.max(0,array.length - n) 
    return array.slice(n)
  },
  
  union: function(...arrays) {
    var result = []
    for (let i = 0;i < arrays.length;i++) {
      var array = arrays[i]
      for (let j = 0;j < array.length;j++) {
        if(result.indexOf(array[j]) == -1) {
          result.push(array[j])
        }
      }
    }
    return result
  },

  uniq: function(array) {
    var result = []
    for (let i = 0;i < array.length;i++) {
      if (result.indexOf(array[i]) == -1) {
        result.push(array[i])
      }
    }
    return result
  },
  
  unzip: function(array) {
    var length = array[0].length
    var result = []  
    for (let i = 0;i < length;i++) {
      var subArray = []
      for (let j = 0;j < array.length;j++) {
        subArray.push(array[j][i])
      }
      result.push(subArray)
    }
    return result
  },
  
  without: function(array,...values) {
    var result = []
    for (let i = 0;i < array.length;i++) {
      if (values.indexOf(array[i]) == -1) {
        result.push(array[i])
      }
    }
    return result
  },

  zip: function(...arrays) {
    var length = arrays[0].length
    var result = []
    for (let i = 0;i < length;i++) {
      var subArray =[]
      for (let j = 0;j < arrays.length;j++) {
        subArray.push(arrays[j][i])
      }
      result.push(subArray)
    }
    return result
  },













  









    



}
