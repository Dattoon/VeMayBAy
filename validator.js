//Validator


function Validator(options){
    var selectorRules = {};
    //ham validate
    function validate(inputElement,rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;

        //lay rule
        var rules = selectorRules[rule.selector];
        //lap qua tung rule va check
        for(var i = 0; i<rules.length;++i){
           errorMessage = rules[i](inputElement.value);
           if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
        }else{
            errorElement.innerText ='';
        }
        return !errorMessage;
    }
    var formElement = document.querySelector(options.form);
    if(formElement){

            //khi submit form
            formElement.onsubmit = function(e)  {
                e.preventDefault();

                var isFormValid = true;

                //lap qua moi rule va xu ly
                options.rules.forEach(function (rule) {
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement,rule);
                    if(!isValid){
                        isFormVlaid = false;
                    }
                });

                
                if(isFormValid){
                  if(typeof options.onSubmit === 'function'){
                    
                    var enableInputs = formElement.querySelectorAll('[name]');

                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                      
                        return   (values[input.name] = input.value) && values;
                     },{});
                    
                    options.onSubmit(formValues);
                  }else{
                    formElement.submit();
                  }
                }

            }

        options.rules.forEach(function (rule) {

            if(Array.isArray  (selectorRules[rule.selector] )){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector]  = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement){

                inputElement.onblur = function () {
                    validate(inputElement,rule);
                }
            }
            inputElement.oninput = function () {
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerText ='';
            }
        });
    }
 
}





// Rulea
Validator.isRequired = function(selector,message){
        return {
            selector: selector,
            test: function (value) {
                return value.trim() ? undefined :message||"Hãy nhập vào ô này";
                
            }
        }
}
Validator.isEmail = function(selector){
     return {
            selector: selector,
            test: function (value) {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(value) ? undefined :" Vui lòng nhập email";
            }
        }
}
Validator.minLength = function(selector,min){
    return {
           selector: selector,
           test: function (value) {
               return value.length >=min ? undefined :`Vui lòng nhập tối thiếu ${min} ký tự`;
           }
       }
}
Validator.isConfirmed = function (selector,getConfirmValue,message) {
    return{
        selector:selector,
        test: function (value) {
            return value ===getConfirmValue() ? undefined: message|| 'Giá trị nhập vào không chính xác';
        }
    }

}