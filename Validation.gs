var Validation = {};
  
Validation.run = function(){
    
  var alphanumeric = function(column, data){
    return true; 
  }
    
  var integer = function(column, data){
    var check = parseInt(data) == data*1;
    if(check){
      return true;
    }
    return column +' must be an integer.';
  }
  
  var required = function(column, data){
    if(data){
      return true;
    }
    return column +' can not be empty.';
  }
  
  var min = function(column, data, minimum){
    data = parseInt( data );
    if(data > minimum){
      return true;
    }
    return column +' minimum is '+minimum+'.';
  }
  
  var max = function(column, data, maximum){
    data = parseInt( data );
    if(data < maximum){
      return true;
    }
    return column +' maximum is '+maximum+'.';
  }
  
  var min_length = function(column, data, minimun){
    data =  data+'';
    if(data.length > minimun){
      return true;
    }
    return column +' minimum length is '+minimun+'.';
  }
  
  var max_length = function(column, data, maximum){
    data =  data + '';
    if(data.length < maximum){
      return true;
    }
    return column +' maximum length is '+maximum+'.';
  }
    
  Validation.valid = true;
  Validation.message = [];
        
  var columns = Config.typeData(App.config.sheetName);
  var fields = App.config.columns; 
  var param = App.config.request.parameter;
  for(var i=0; i < fields.length ; i++){
    if(columns[fields[i]]){
      var rules = columns[fields[i]].split('|');
      for(var j=0; j<rules.length; j++){
        var matches = rules[j].replace(/\]/,'').split('[');
          //matches[0] = alphanumeric;
          /*var func = matches[0]+"('"+fields[i]+"','"+param[fields[i]]+"'"+(matches[1]?",'"+matches[1]+"'" :"")+")";
          var test = eval(func);
          Logger.log(test);
          if(test !==true){
            Validation.valid = false;
            Validation.message.push(test);
            }
          //Response.message.push(eval(func));
          //Response.log();
          */
          
        if(matches[0]=='alphanumeric'){
          var test = alphanumeric(fields[i], param[fields[i]]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test);
          }
        }else if(matches[0]=='integer'){
          var test = integer(fields[i], param[fields[i]]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test)
          }
        }else if(matches[0]=='required'){
          var test = required(fields[i], param[fields[i]]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test);
          }
        }else if(matches[0]=='min'){
          var test = min(fields[i], param[fields[i]],matches[1]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test)
          }
        }else if(matches[0]=='max'){
          var test = max(fields[i], param[fields[i]],matches[1]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test);
          }
        }else if(matches[0]=='max_length'){
          var test = max_length(fields[i], param[fields[i]],matches[1]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test);
          }
        }else if(matches[0]=='min_length'){
          var test = min_length(fields[i], param[fields[i]],matches[1]);
          if(test !== true){
            Validation.valid = false;
            Validation.message.push(test);
          }
        }
      }
    } 
  } 
  Response.message = Validation.message;
  return Validation.valid;
}

function foo(x) {return x+5};
function testValidation(){
  
  var a = 'foo(5)';
  Response.message.push(eval(a))
  
  Response.log();
}
  