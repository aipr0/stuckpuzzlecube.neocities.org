
var header_text = document.createElement("div");
header_text.className = "header_text";
header_text.textContent = "desu";
document.body.appendChild(header_text);

var console_wrapper = document.createElement("div");
console_wrapper.className = "console-wrapper";
document.body.appendChild(console_wrapper);

var con = new SimpleConsole({
	handleCommand: handle_command,
	placeholder: "Enter a command.",
	autofocus: true,
	storageID: "console"
});
console_wrapper.appendChild(con.element);

con.logHTML("<div class='logquaternary' onclick='con.history_log(\"Help\");displayCommands();'><a>Type 'Help' or click here to begin.</a></div>");

function displayCommands(){
	con.logHTML("<div class='logquaternary'>Here's a list of the commands.</div>");
	con.logHTML("<div class='logtertiary' onclick='con.history_log(\"About\");displayAbout()'><a><b>About</b>About me and/or this website.</a></div>");
	con.logHTML("<div class='logprimary' onclick='con.history_log(\"Contact\");displayLinks();'><a><b>Contact</b>Places you can find me or something.</a></div><br>");
}

const date = new Date(document.lastModified);
let date_str = date.toDateString();
let time_str = date.toTimeString()
function displayAbout() {
	con.logHTML("<div class='logquaternary'>I'm desu! I'm a hobbyist programmer and game developer of over 14 years!</div>");
	con.logHTML("<div class='logtertiary'>I am genuinely passionate about making things people enjoy and helping others do the same.</div><br>");

	con.logHTML("<div class='logsecondary'>If you want to support me, you can do that below.</div>");
	con.logHTML("<div class='logsecondary'>For anything else check the contact section and don't be afraid to reach out!</div><br>");
	con.logHTML("<div class='logprimary'><a href='https://buymeacoffee.com/unusualdesu'><b>Buy me a coffee</b>https://buymeacoffee.com/unusualdesu</a></div><br>");


	con.logHTML("<div class='logsecondary'>This site was last updated on: " + date_str + " at " + time_str + "</div><br>");
}

function displayLinks() {
	con.logHTML("<div class='logsecondary'>If you want to commission me or ask questions, add me on discord: <b>unusualdesu</b></div><br>");
	con.logHTML("<div class='logquaternary'>Other places you can find me:</div>");
	con.logHTML("<div class='logsecondary'><a href='https://steamcommunity.com/id/IHateLua'><b>My Steam</b>https://steamcommunity.com/id/IHateLua</a></div>");
	con.logHTML("<div class='logquaternary'><a href='https://github.com/Zisomerism'><b>My Github</b>https://github.com/Zisomerism</a></div>");
	con.logHTML("<div class='logprimary'><a href='mailto:unusualdesu@protonmail.com'><b>Email Me?</b>unusualdesu@protonmail.com</a></div><br>");
}

function handle_command(command){
	if(command.match(/^<3$/i)){
		con.logHTML("<div class='logprimary'>❤</div>");
	}else if(command.match(/^(Help|Commands|Cmds)$/i)){
		displayCommands()
	}else if(command.match(/^(About|Info)$/i)){
		displayAbout()
	}else if(command.match(/^(Links|Contact|Socials|Email|Steam|Discord|Github|Stoat)$/i)){ 
		displayLinks()
	}else if(command.match(/^(Hi|Hello|Oi|Greetings|Hey|Heya|Hewwo)$/i)){
		con.logHTML("<div class='logprimary'>Hi, I hope you're doing well :)</div>");
	}else if(command.match(/^Nut$/i)){
		con.logHTML("<div class='logprimary'>Nut</div>");
	}else if(command.match(/^Desu$/i)){
		con.logHTML("<div class='logprimary'>Desu</div>");
	}else if(command.match(/^(:3|x3)$/i)){
		con.logHTML("<div class='logprimary'>:3</div>");
	}else if(command.match(/^Glomp$/i)){
		con.logHTML("<div class='logprimary'>*Glomps u*</div>");
	}else if(command.match(/^xD$/i)){
		con.logHTML("<div class='logprimary'>x3</div>");
	}else if(command.match(/^uwu$/i)){
		con.logHTML("<div class='logprimary'>owo</div>");
	}else if(command.match(/^owo$/i)){
		con.logHTML("<div class='logprimary'>uwu</div>");
	}else{
		var err;
		try{
			var result = eval(command);
		}catch(error){
			err = error;
		}
		if(err){
			con.logHTML("<div class='logprimary'>"+command+" is not a valid command.</div>")
		}else{
			con.logHTML("<div class='logprimary'>"+result+"</div>").classList.add("result");
		}
	}
};
