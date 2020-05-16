Promise.resolve = function(value) {
  return new Promise(function(resolve,reject){
    resolve(value)
  })
}  

Promise.reject = function(reason) {
  return new Promise(function(resolve,reject){
    reject(reason)
  })
} 

//写promise的时候不要总想着用返回，要多用resolve和reject

Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
    var result = []
    var count = 0
    for(let i = 0;i < promises.length;i++) {
      promises[i].then(function(value){
        result[i] = value
        count++
        if(count == promises.length){
          resolve(result)
        }
      },reject)
    }
  })

} 

Promise.race = function(promises){
  return new Promise((resolve,reject) => {
    promises.forEach(promise => promise.then(resolve,reject))
  })
}

