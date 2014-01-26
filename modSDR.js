/*
var eventsScript = document.createElement('script');
eventsScript.src = "https://raw2.github.com/foo-/UTwente-Usability/master/events.js";
eventsScript.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(eventsScript);

var jq = document.createElement('script');
jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
jq.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(jq);
*/

function loadfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadfile("//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js", "js");
loadfile('https://raw2.github.com/foo-/UTwente-Usability/master/events.js', "js");
loadfile('//code.jquery.com/jquery-1.10.2.js', "js");
loadfile('//code.jquery.com/ui/1.10.4/jquery-ui.js', "js");
loadfile('//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css', "css");

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

function whenJQueryUIAvailable(callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
        if (jQuery.ui) {
            callback(window[name]);
        } else {
            window.setTimeout(arguments.callee, interval);
        }
    }, interval);
}

whenAvailable("jQuery", function(t){

// Hide Logbook
jQuery("div.ctl").eq(6).hide()
jQuery("div.ctl").eq(7).hide()

//Move saved frequencies if there is enough vertical space
if(window.screen.availWidth >= 1600)
{
  jQuery("form[name='freqform']").appendTo("#test");
  jQuery("form[name='freqform']").css({"left":"1050px","position":"absolute"});
  jQuery("form[name='freqform']").appendTo("#test");
  //jQuery("div.ctl").eq(2).appendTo("#test")
  //jQuery("div.ctl").eq(2).removeAttr("style")
  //jQuery("div.ctl").eq(2).css({"left":"1050px","position":"absolute"});
  jQuery("#wfcdiv0").css({"width":"1050px"});
}

// Move the user frequency control to the bottom
jQuery("form[name='form1']").insertAfter("#chatboxspan");
jQuery("p").hide();

// Add new irc chatbox & hide existing nonfunctional chatbox
whenJQueryUIAvailable( function(t){
console.log('jQuery.ui loaded? ' + jQuery.ui);
var ircPanel = jQuery('<div id="collapse"><h3>IRC Chat</h3><div><iframe id="chatframe" width="100%" height="250" src ="http://webchat.freenode.net/?channels=#INSMA" /></div></div>')
ircPanel.insertBefore("form[name='form1']");
jQuery("#collapse").accordion({
    collapsible: true,
    active: false
});
jQuery(".ui-accordion-content").css("padding","0px");
jQuery("#time").insertBefore("#collapse")
});

console.log('jQuery.ui loaded? ' + jQuery.ui);


//jQuery('<iframe id="chatframe" width="100%" height="250"/>').attr('src', 'http://webchat.freenode.net/?channels=#INSMA').insertBefore("form[name='form1']");
jQuery('#chatboxspan').hide();

//jQuery('<iframe id="chatframe" width="550" height="350" scrolling="no" />').attr('src', 'http://widget00.mibbit.com/?&server=irc.Mibbit.Net&channel=%23bung_test').appendTo('body');



jQuery(document).ready(function() {
  setcompactview(true);
  jQuery("#compactviewcheckbox").prop('checked', true);
});

whenAvailable("parseEvents", function(t){
  // Get ENIGMA calendar events
  var events = parseEvents();


  // Add UTC time above chatbox
  jQuery("<DIV id=time>TIME</div>").insertBefore("#collapse")
  //jQuery("#chatboxspan").prepend("<DIV id=time>TIME</div>");
  setInterval(function(){jQuery("#time").html(new Date().toUTCString() + " Next Event: " + getNextEvent(events))},1000);
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
	//if(args[0]){args[0] = 'TEST:' + args[0]};
 
	// Put some stuff in here to update our new chatbox

	// Return the args that we may have messed with
	return args;
 
});