var jq = document.createElement('script');
jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

function whenAvailable(name, callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
        if (window[name]) {
            callback(window[name]);
        } else {
            window.setTimeout(arguments.callee, interval);
        }
    }, interval);
}

whenAvailable("jQuery", function(t){

// Hide Logbook
jQuery("div.ctl").eq(7).hide()
jQuery("div.ctl").eq(8).hide()

//Move saved frequencies
jQuery("div.ctl").eq(2).appendTo("#test")
jQuery("div.ctl").eq(2).removeAttr("style")
jQuery("div.ctl").eq(2).css({"right":"150px","position":"absolute"});
jQuery("form[name='form1']").insertAfter("#chatboxspan");
jQuery("p").hide();

jQuery(document).ready(function() {
  setcompactview(true);
  jQuery("#compactviewcheckbox").prop('checked', true);
});

});

// Hijack chatbox

function hijack(method, cb){
 
	// A function needs to be passed or there will be hell to pay
	if(Object.prototype.toString.call(cb) !== "[object Function]"){
		throw new Error('An anonymous function must be passed as the second parameter!');
	}
 
	return function(){
 
		// Turn arguments into a true array
		var args = Array.prototype.slice.call(arguments);
 
		// Call the copied method and pass it some 'tampered' arguments from our callback
		return method.apply(this, cb.call(this, args) || args);
 
	};
 
}

chatnewline  = hijack(chatnewline , function(user_args){
 
	// Now store the arguments passed in by the user
	var args = user_args;
 
	// Mess with the arguments passed in
	if(args[0]){args[0] = 'TEST:' + args[0]};
 
	// Put some stuff in here to update our new chatbox

	// Return the args that we may have messed with
	return args;
 
});


