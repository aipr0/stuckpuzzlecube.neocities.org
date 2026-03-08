
var header_text = document.createElement("div");
header_text.className = "header_text";
header_text.textContent = "desu";
document.body.appendChild(header_text);

var con = new SimpleConsole({
	handleCommand: handle_command,
	placeholder: "Enter a command.",
	autofocus: true,
	storageID: "console"
});
document.body.appendChild(con.element);

con.logHTML("<div class='logquaternary' onclick='con.history_log(\"Help\");displayCommands();'><a>Type 'Help' or click here to begin.</a></div>");

function displayCommands(){
	con.logHTML("<div class='logquaternary'>Here's a list of the commands.</div>");
	con.logHTML("<div class='logprimary' onclick='con.history_log(\"Contact\");displayLinks(\"top\");'><a><b>Contact</b>Places you can find me or something.</a></div>");
	con.logHTML("<div class='logtertiary' onclick='con.history_log(\"About\");displayAbout()'><a><b>About</b>The about section for this website.</a></div>");
}

function displayAbout() {
	con.logHTML("<div class='logprimary'>I don't really know what this site is for, I'll put links and stuff here I guess.</div>");
	con.logHTML("<div class='logsecondary'>This site was last updated on March 8th, 2026.</div>");
	con.logHTML("<div class='logquaternary'>Btw the text entry is just an emulated javascript console.</div>");
}

function displayLinks() {
	con.logHTML("<div class='logsecondary'>Discord: unusualdesu</div><br>");
	con.logHTML("<div class='logquaternary'>Click these buttons to go to the place it says or whatever:</div>");
	con.logHTML("<div class='logsecondary'><a href='https://steamcommunity.com/id/IHateLua'><b>My Steam</b>https://steamcommunity.com/id/IHateLua</a></div>");
	con.logHTML("<div class='logquaternary'><a href='https://github.com/Zisomerism'><b>My Github</b>https://github.com/Zisomerism</a></div>");
	con.logHTML("<div class='logprimary'><a href='mailto:unusualdesu@protonmail.com'><b>Email Me</b>unusualdesu@protonmail.com</a></div>");
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
	}else if(command.match(/^(Hi|Hello|Oi|Greetings|Hey|Heya)$/i)){
		con.logHTML("<div class='logprimary'>Hi, I hope you're doing well :)</div>");
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
