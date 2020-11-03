
//时间过滤
export const formatDate = (value, type) => {
  if(value==null){ return ''; }
  let dates = new Date(value);
  dates.setHours(dates.getHours()+8);
  let year = dates.getFullYear();
  let month = (dates.getMonth()+1);
  if(month<10) month = '0' + month;
  let day = dates.getDate();
  if(day<10) day = '0' + day;
  let hours = dates.getHours();
  if(hours<10) hours = '0' + hours;
  let minutes = dates.getMinutes();
  if(minutes<10) minutes = '0' + minutes;
  let seconds = dates.getSeconds();
  if(seconds<10) seconds = '0' + seconds;
  if(type==='datetime') {
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  }else{
    return year+'-'+month+'-'+day;
  }
}

