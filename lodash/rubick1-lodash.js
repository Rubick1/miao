
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
    var compareArray = [].concat(...arrays)
    return array.reduce((result,item) => {
      if (compareArray.indexOf(item) == -1) {
        result.push(item)
      }
      return result
    },[])   
  },

  differenceBy: function(array,...args) {
    var iteratee
    if (typeof args[args.length - 1] == "string" || typeof args[args.length - 1] == "function") {
      iteratee = rubick1.iteratee(args.pop())
    } else{
      iteratee = rubick1.identity
    }
    var compareArray = [].concat(...args)
    compareArray = compareArray.map(item =>iteratee(item))
    var result = []
    array.forEach(function(item){
      if (!compareArray.includes(iteratee(item))) {
        result.push(item)
      }
    })
    return result
  },

  differenceWith: function(array,...args) {
    var comparator
    if (typeof args[args.length - 1] == "function") {
      comparator = args.pop()
    } else {
      return array
    }
    var compareArray = [].concat(...args)
    return array.filter(function(val){
      for (let i = 0;i < compareArray.length;i++) {
        if (comparator(val,compareArray[i])) {
          return false
        }
        if (i == compareArray.length - 1) {
          return true 
        } 
      }
    })
  },
  
  drop: (array,n = 1) => n >= array.length ? [] : array.slice(n),

  dropRight: (array,n = 1) => n >= array.length ? [] : array.slice(0,array.length - n),

  dropRightWhile: function(array,predicate=rubick1.identity) {
    predicate = rubick1.iteratee(predicate)
    for (var i = array.length - 1;i >= 0;i--) {
      if (!predicate(array[i])) {
        break
      }
    }
    return array.slice(0,i+1)
  },

  dropWhile: function(array,predicate=rubick1.identity) {
    predicate = rubick1.iteratee(predicate)
    for (var i = 0;i < array.length;i++) {
      if(!predicate(array[i])) {
        break
      }
    }
    return array.slice(i)
  },

  fill: function(array,value,start,end) {
    start = start || 0
    end = end || array.length
    for (let i = start;i < end;i++) {
      array[i] = value
    }
    return array
  },

  findIndex: function(array,predicate=rubick1.identity,fromIndex = 0) {
    predicate = rubick1.iteratee(predicate)
    for (let i = fromIndex;i < array.length;i++) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  },

  findLastIndex: function(array,predicate=rubick1.identity,fromIndex = array.length - 1) {
    predicate = rubick1.iteratee(predicate)
    for (let i = fromIndex;i >=0;i--) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
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
        array[i].forEach(value => result.push(value))
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
  //尝试优化
  intersection: function(...arrays) {
    var minArray = arrays.reduce(function(result,item){
      if (item.length < result.length) {
        result = item
      }
      return result
    })
    minArray = rubick1.uniq(minArray)
    return minArray.filter(function(item){
      for(let i = 0;i < arrays.length;i++) {
        if (!arrays[i].includes(item)) {
          return false
        }
      }
      return true
    },[])   
  },

  //...只能出现在最后面，明天重新写

  intersectionBy: function(...arrays) {
    var iteratee
    if (typeof arrays[arrays.length - 1] == "function" ||typeof arrays[arrays.length - 1] == "string") {
      iteratee = arrays.pop()
    } else{
      iteratee = rubick1.identity
    }
    iteratee = rubick1.iteratee(iteratee)
    var minArray = arrays.reduce(function(result,item){
      if (item.length < result.length) {
        result = item
      }
      return result
    })
    //三重循环用高阶写起来好绝望，还是用for吧
    arrays = arrays.map(function(array){
        return array.map(function(item){
        return iteratee(item)
      })
    })
    //测试看看
    return minArray.reduce(function(result,item) {
      for (let i = 0;i < arrays.length;i++) {
        if (!arrays[i].includes(iteratee(item))) {
          break
        }
        if (i == arrays.length - 1) {
          result.push(item)
        }
      }
      return result
    },[])   
  },
   
  
  intersectionWith: function(...arrays) {
    var comparator
    if (typeof arrays[arrays.length - 1] == "function") {
      comparator = arrays.pop()
    } 
    
    var minArray = arrays.reduce(function(result,item){
      if (item.length < result.length) {
        result = item
      }
      return result
    })

    return minArray.filter(function(item) {
      for (let i = 0;i < arrays.length;i++) {
        var array = arrays[i]
        for (let j = 0;j < array.length;j++) {
          if(comparator(array[j],item)) {
            break
          }
          if (j == array.length - 1) {
            return false
          }
        }
      }
      return true
    })
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
  //pull和pullAll的不同之处仅仅在于传进来的数据的形式，一个是数组展开，一个是在数组里
  pull: function(array,...vals) {
    // for (let i = 0;i < vals.length;i++) {
    //   while(true) {
    //     var valIndex = array.indexOf(vals[i])
    //     if (valIndex == -1) {
    //       break
    //     } else{
    //       array.splice(valIndex,1)
    //     }
    //   }
    // }
    // return array
    //上面是说人话版本，下面是升级版
    return array.filter(item =>!vals.some(val =>item == val))
  },

  //从数组里面删除部分元素
  pullAll: function(array,values) {
    // for (let i = 0;i < values.length;i++) {
    //   while(true) {
    //     var valIndex = array.indexOf(values[i])
    //     if (valIndex == -1) {
    //       break
    //     } else{
    //       array.splice(valIndex,1)
    //     }
    //   }
    // }
    // return array
    //上面是说人话版本，下面是升级版
    return array.filter(item =>!values.some(value =>item == value))
  },

  pullAllBy: function(array,values,iteratee = rubick1.identity) {
    iteratee = rubick1.iteratee(iteratee)
    return array.filter(item => !values.some(value => iteratee(value) == iteratee(item)))
  },

  pullAllWith: function(array,values,comparator) {
    return array.filter(item => !values.some(value => comparator(value,item)))
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
    return array[left] == value ? left : right
  },

  sortedIndexBy: function(array,value,iteratee = rubick1.identity) {
    iteratee = rubick1.iteratee(iteratee)
    var left = 0 
    var right = array.length - 1 
    var half = Math.floor((left + right) / 2)
    while (right - left > 1) {
      iteratee(array[half]) >= iteratee(value) ? right = half : left = half
      half = Math.floor((left + right) / 2)
    }
    return iteratee(array[left]) == iteratee(value) ? left : right
  },

  sortedIndexOf: function(array,value) {
    var left = 0 
    var right = array.length - 1 
    var half = Math.floor((left + right) / 2)
    while (right - left > 1) {
      array[half] >= value ? right = half : left = half
      half = Math.floor((left + right) / 2)
    }
    if (array[left] != value && array[right] != value) {
      return -1
    }
    return array[left] == value ? left : right
  },

  sortedLastIndex: function(array,value) {
    var left = 0
    var right = array.length - 1 
    var half = Math.floor((left + right) / 2)
    while(right - left > 1) {
      array[half] > value ? right = half : left = half
      half = Math.floor((left + right) / 2)
    } 
    console.log(right)
    console.log(left)
    return array[left] == value ? right : right + 1
  },

  sortedLastIndexBy: function(array,value,iteratee = rubick1.identity) {
    iteratee = rubick1.iteratee(iteratee)
    var left = 0 
    var right = array.length - 1 
    var half = Math.floor((left + right) / 2)
    while (right - left > 1) {
      iteratee(array[half]) > iteratee(value) ? right = half : left = half
      half = Math.floor((left + right) / 2)
    }
    return iteratee(array[left]) == iteratee(value) ? right : right + 1
  },

  sortedLastIndexOf: function(array,value) {
    var left = 0 
    var right = array.length - 1 
    var half = Math.floor((left + right) / 2)
    while (right - left > 1) {
      array[half] > value ? right = half : left = half
      half = Math.floor((left + right) / 2)
    }
    if (array[left] != value && array[right] != value) {
      return -1
    }
    return array[left] == value ? left : right
  },

  sortedUniq: function(array) {
    return array.filter((item,idx) => item != array[idx - 1])
  },

  sortedUniqBy: function(array,iteratee = rubick1.identity) {
    var iteratee = rubick1.iteratee(iteratee)
    return array.filter((item,idx) => iteratee(item) != iteratee(array[idx - 1]))
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

  takeRightWhile: function(array,predicate = rubick1.identity) {
    var predicate = rubick1.iteratee(predicate)
    for (let i = array.length - 1;i >= 0;i--) {
      if (!predicate(array[i])) {
        return array.slice(i+1)
      }
    }
  },

  takeWhile: function(array,predicate = rubick1.identity) {
    var predicate = rubick1.iteratee(predicate)
    for (let i = 0;i < array.length;i++) {
      if (!predicate(array[i])) {
        return array.slice(0,i)
      }
    }
  },
  
  union: function(...arrays) {
    // var result = []
    // for (let i = 0;i < arrays.length;i++) {
    //   var array = arrays[i]
    //   for (let j = 0;j < array.length;j++) {
    //     if(result.indexOf(array[j]) == -1) {
    //       result.push(array[j])
    //     }
    //   }
    // }
    // return result
    return rubick1.uniq([].concat(...arrays))
  },
 
  //还没写完，等uniqBy写完了直接调用就ok
  unionBy: function(...args) {
    var iteratee
    if (typeof args[args.length - 1] == "function" || typeof args[args.length - 1] == "string") {
      iteratee = args.pop()
    } else {
      iteratee = rubick1.identity
    } 
    return rubick1.uniqBy([].concat(...args),iteratee)
  },

  unionWith: function(...args) {
    var iteratee
    if (typeof args[args.length - 1] == "function" || typeof args[args.length - 1] == "string") {
      iteratee = args.pop()
    } else {
      iteratee = rubick1.identity
    } 
    return rubick1.uniqWith([].concat(...args),iteratee)
  },

  uniq: function(array) {
    // return array.reduce(function(result,item) {
    //   if (!result.includes(item)) {
    //     result.push(item)
    //   }
    //   return result
    // },[])
    return array.reduce((result,item) => {return result.includes(item) || result.push(item),result},[])
  },

  uniqBy: function(array,iteratee = rubick1.iteratee) {
    var iteratee = rubick1.iteratee(iteratee)
    // return array.reduce(function(result,item){
    //   if (!result.some(function(val) {
    //     return iteratee(val) == iteratee(item)
    //   })) {
    //     result.push(item)
    //   }
    //   return result
    // },[])
    return array.reduce((result,item) =>{return result.some(val =>iteratee(val) == iteratee(item)) || result.push(item),result},[])
  },

  uniqWith: function(array,comparator) {
    return array.reduce((result,item) =>{return result.some(val => comparator(val,item)) || result.push(item),result},[])
  },
  
  unzip: function(array) {
    // var length = array[0].length
    // var result = []  
    // for (let i = 0;i < length;i++) {
    //   var subArray = []
    //   for (let j = 0;j < array.length;j++) {
    //     subArray.push(array[j][i])
    //   }
    //   result.push(subArray)
    // }
    // return result
    return array.reduce((result,item,idx) => {
      return item.forEach((val,index) =>result[index] ? result[index][idx] = val : result[index] = [val]),result
    },[])
  },
  
  
  unzipWith: function(array,iteratee = rubick1.identity) {
    return rubick1.unzip(array).map(function(item){
      return item.reduce(iteratee)
    })
  },

  without: function(array,...values) {
    // var result = []
    // for (let i = 0;i < array.length;i++) {
    //   if (values.indexOf(array[i]) == -1) {
    //     result.push(array[i])
    //   }
    // }
    // return result
    return array.reduce((result,item) =>(values.includes(item) || result.push(item),result),[])

  },

  xor: function(...arrays) {
    return [].concat(...arrays).reduce(function(result,item,idx,array){
      return array.some((value,index) => {return value == item && idx != index}) || result.push(item),result},[])
  },

  xorBy: function(...args) {
    var iteratee
    if (typeof args[args.length - 1] == "function" || typeof args[args.length - 1] == "string") {
      iteratee = args.pop()
    } else {
      iteratee = rubick1.identity
    } 
    iteratee = rubick1.iteratee(iteratee)
    return [].concat(...args).reduce(function(result,item,idx,array){
      return array.some((value,index) => {return iteratee(value) == iteratee(item) && idx != index}) || result.push(item),result},[])
  },

  xorWith: function(...args) {
    var comparator = args.pop()
    return [].concat(...args).reduce(function(result,item,idx,array){
      return array.some((value,index) => {return comparator(value,item) && idx != index}) || result.push(item),result},[])
  },

  zip: function(...arrays) {
    // var length = arrays[0].length
    // var result = []
    // for (let i = 0;i < length;i++) {
    //   var subArray =[]
    //   for (let j = 0;j < arrays.length;j++) {
    //     subArray.push(arrays[j][i])
    //   }
    //   result.push(subArray)
    // }
    // return result
    return arrays[0].map((item,idx) => arrays.reduce((result,array) =>(result.push(array[idx]),result),[]))
  },

  zipObject: function(props,values) {
    return props.reduce(function(result,item,i){
      result[item] = values[i]
      return result
    },{})
  },

  zipObjectDeep: function(props,values) {
    var result = {}
    for(let i = 0;i < props.length;i++) {
      var list = props[i].split(".")
      var temp = result
      for(let j = 0;j <list.length;j++) {
        if(j == list.length - 1) {
          if(list[j].length == 1) {
            temp[list[j]] = values[i]
            
          } else{
            if(!temp[list[j][0]]) {
              temp[list[j][0]] = []           
            }
            temp[list[j][0]][list[j].slice(2,3)] = values[i]        
          }
          break
        }

        if(list[j].length == 1) {
          if(!temp[list[j]]) {
            temp[list[j]] = {}
          } 
          temp = temp[list[j]]                
        }else {
          if(!temp[list[j][0]]) {
            temp[list[j][0]] = []
          } 
          temp = temp[list[j][0]]
          if(!temp[list[j].slice(2,3)]) {
            temp[list[j].slice(2,3)] = {}
          } 
          temp = temp[list[j].slice(2,3)]   
        }


      }
    }
    return result
  },

  zipWith: function(...args) {
    var iteratee = args.pop()
    return args[0].map(function(_,idx){
      return iteratee(...args.reduce(function(result,item){
        result.push(item[idx])
        return result
      },[]))
    })
  },

  countBy: function(collection,iteratee = rubick1.identity) {
    var result = {}
    iteratee = rubick1.iteratee(iteratee)
    collection.forEach(function(item){
      var value = iteratee(item)
      if(value in result) {
        result[value]++
      } else {
        result[value] = 1
      }
    })
    return result
  },

  every: function(collection,iteratee = rubick1.identity) {
    iteratee = rubick1.iteratee(iteratee)
    collection = Object.entries(collection)
    for(let i = 0;i < collection.length;i++) {
      if(!iteratee(collection[i][1],collection[i][0])) {
        return false
      }
    }
    return true
  },

  map: function(collection,mapper = rubick1.identity) {
    mapper = rubick1.iteratee(mapper)
    var result = []
    collection = Object.entries(collection)
    for(let i = 0;i < collection.length;i++) {
      result.push(mapper(collection[i][1],collection[i][0]))
    }
    return result
  },

  filter: function(collection,test) {
    test = rubick1.iteratee(test)
    var result = []
    collection = Object.entries(collection)
    for(let i = 0;i < collection.length;i++) {
      if(test(collection[i][1])) {
        result.push(collection[i][1])
      }
    }
    return result
  },

  forEach: function(collection,action) {
    action = rubick1.iteratee(action)
    collection = Object.entries(collection)
    for(let i = 0; i < collection.length;i++) {
      action(collection[i][1],collection[i][0])
    }
  },
  
  slice: function(array,start,end) {
    start = start || 0
    end = end || array.length
    return array.reduce(function(result,item,i){
      if (i >= start && i < end) {
        result.push(item)
      }
      return result
    },[])
  },

  fill: function(array,value,start,end) {
    start = start || 0
    end = end || array.length
    return array.reduce(function(result,item,i){
      if (i >= start && i < end) {
        result.push(value)
      } else{
        result.push(item)
      }
      return result
    },[])
  },

  concat: function(array,...values) {
    return values.reduce(function(result,item){
      typeof item == "object" ? result.push(...item) : result.push(item)
      return result
    },array)
  },

  isEqual: function(value,other) {
    if (value === other) {
      return true
    }
    if (value != value && other != other) {
      return true
    }
    if (typeof value == "object" && typeof other == "object") {
      var valueKeys = Object.keys(value)
      var otherKeys = Object.keys(other)
      if (valueKeys.length != otherKeys.length) {
        return false
      }
      for (var prop in value) {
        if (rubick1.isEqual(value[prop],other[prop])) {
          continue
        } else {
          return false
        }
      }
      return true
    }
    return value === other
  },

  identity: value =>value
  ,

  iteratee: function(iter) {
    if (typeof iter == "function") {
      return iter
    }
    if (typeof iter == "string") {
      return rubick1.property(iter)
    }
    if (rubick1.isArray(iter)) {
      return rubick1.matchesProperty(...iter)
    }
    if (rubick1.isObject(iter)) {
      return rubick1.matches(iter)
    }
  },

  property: function(path) {
    if (typeof path == "string") {
      path = path.split(".")
    } 
    return function(obj) {
      path.forEach((item)=> obj = obj[item])
      return obj
    }
  },
  
  matches: function(source) {
    return function(obj) {
      for (var prop in source) {
        if (!rubick1.isEqual(source[prop],obj[prop])) {
          return false
        }
      }
      return true
    }
  },

  matchesProperty: function(path,srcValue) {
    return function(obj) {
      return rubick1.isEqual(rubick1.property(path)(obj),srcValue)
    }
  },
  //这个matchprperty暂时只能接收一组数据

  //等会再写几个判断是否是字符串\数组、对象的函数，iteratee就可以跑起来了
  isArray: value => value instanceof Array,

  isObject: value => value instanceof Object,

  add: (a,b) => a + b,
  


  















  









    



}
