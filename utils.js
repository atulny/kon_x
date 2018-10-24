 
 var moment = require('moment-timezone');
 
function date_from_time(time){
    var date = moment( "1970/1/1 "+  time)
    return date.toDate()

}
function get_json(obj){
    if (typeof(obj)=="string"){
      if (obj[0]=='{' || obj[0]=='[' ){
        try{
          obj=JSON.parse(obj)
        } catch(e){
          //pass
        }
      }
    }
    if (obj && typeof(obj)=="object" && !(obj instanceof Date)){
          for (let k in obj){
            obj[k]=get_json(obj[k])
          }
    }
    return obj


}
function wrap_request(data){
  if (data.body){
    data=data.body
  }
     data=get_json(data)
    console.log(data)
    return {
         data:data
    }

}
function wrap_response(data){
  if (data && data.then){
    return data.then(
         function(result){
            return {
                result:result
            }
         },
         function(err){
            return {
                error:err
            }
         }
      )
  }
  if (data instanceof(Error)){
    return Promise.reject({
        error:data.toString()
    })  
  }
  return Promise.resolve({
        result:data
    })
        
  }

function date_for_timezone(dt,timezone ){
  var m=  moment(dt)
  if (timezone){
    m=m.tz(timezone)
  }
    return m.toDate()
 
}
function tunc_date(date){
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
}

function isin_time(targetdatetime, time1,time2){
      if (targetdatetime.getHours() > time1.getHours() ||
            (targetdatetime.getHours() == time1.getHours() && targetdatetime.getMinutes() >= time1.getMinutes())){
            if (targetdatetime.getHours() < time2.getHours() ||
              (targetdatetime.getHours()==time2.getHours() && targetdatetime.getMinutes() <= time2.getMinutes())){

              return true

            }
        }


}
exports.trunc_date=tunc_date  
exports.isin_time=isin_time
exports.date_for_timezone=date_for_timezone  
//exports.date_as_obj=date_as_obj
exports.date_from_time=date_from_time
exports.get_json=get_json
exports.wrap_request=wrap_request
exports.wrap_response=wrap_response
