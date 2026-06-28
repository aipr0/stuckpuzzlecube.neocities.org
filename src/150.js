
var header_text = document.createElement("div");
header_text.className = "header_text";
header_text.textContent = "stuckpuzzlecube";
document.body.appendChild(header_text);

var console_wrapper = document.createElement("div");
console_wrapper.className = "console-wrapper";
document.body.appendChild(console_wrapper);

let allPosts = [];

async function loadPosts() {
	try {
		const response = await fetch('posts-manifest.json?v=${Date.now()}');
		const data = await response.json();
		allPosts = data.posts.sort((a, b) => b.date.localeCompare(a.date));
		console.log("Posts loaded:", allPosts.length);
	} catch (err) {
		con.logHTML("<div class='logprimary'>Could not load posts.</div>");
	}
}

// Call this when the page loads
window.addEventListener('load', () => {
  loadPosts();
});

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

	con.logHTML("<div class='logtertiary' onclick='con.history_log(\"Latest Blogpost\");latestBlogpost();'><a><b>Latest Blogpost</b>'I've got new complaint'</a></div>");
	con.logHTML("<div class='logtertiary' onclick='con.history_log(\"Blog List\");displayBlogList();'><a><b>Blog</b>List of all posts</a></div>");

	con.logHTML("<div class='logtertiary' onclick='con.history_log(\"Credit\");displayCredit()'><a><b>Credit</b>All credit due to Desu</a></div>");
	con.logHTML("<div class='logtertiary' onclick='con.history_log(\"About\");displayAbout()'><a><b>About</b>About me and/or this website.</a></div>");
	con.logHTML("<div class='logprimary' onclick='con.history_log(\"Contact\");displayLinks();'><a><b>Contact</b>Places you can find me or something.</a></div><br>");
}

function latestBlogpost() {
	if (allPosts.length === 0) {
	con.logHTML("<div class='logprimary'>No posts loaded yet.</div>");
    return;
	}

	const latest = allPosts[0];

	fetch(`posts/${latest.filename}?v=${Date.now()}`)
    .then(res => res.text())
    .then(text => {
      con.logHTML(`<div class='logblog'><strong>${latest.title}</strong><br><br>${text.replace(/\n/g, '<br>')}</div>`);
    })
    .catch(() => {
      con.logHTML("<div class='logprimary'>Failed to load post.</div>");
    });
}

function displayBlogList() {
	con.logHTML("<div class='logquaternary'>Blog Posts:</div>");

	allPosts.forEach((post, index) => {
    const html = `
      <div class='logtertiary' onclick='loadSpecificPost(${index})'>
        <a><b>${post.date}</b> ${post.title}</a>
      </div>
    `;
    con.logHTML(html);
  });
}

function loadSpecificPost(index) {
  const post = allPosts[index];
  if (!post) return;

  con.logHTML(`<div class='logquaternary'>Loading: ${post.title}</div>`);

  fetch(`posts/${post.filename}?v=${Date.now()}`)
    .then(res => res.text())
    .then(text => {
      con.logHTML(`<div class='logblog'><strong>${post.title}</strong><br><br>${text.replace(/\n/g, '<br>')}</div>`);
    })
    .catch(() => {
      con.logHTML("<div class='logprimary'>Failed to load post.</div>");
    });
}

function displayCredit() {
con.logHTML("<div class='logsecondary'>Desu is a very cool person. They built this site for themselves and they let me steal it for now.<br>All credit for all of this is due to them.<br>Thanks desu for helping me make stuff even if it's 99% stolen.<br>");

con.logHTML("<div class='logsecondary'><b>Desu's Discord</b><a>unusualdesu</a></div>");
con.logHTML("<div class='logsecondary'><a href='https://steamcommunity.com/id/IHateLua'><b>Desu's Steam</b>https://steamcommunity.com/id/IHateLua</a></div>");
con.logHTML("<div class='logquaternary'><a href='https://github.com/Zisomerism'><b>Desu's Github</b>https://github.com/Zisomerism</a></div>");
con.logHTML("<div class='logprimary'><a href='mailto:unusualdesu@protonmail.com'><b>Desu's email?</b>unusualdesu@protonmail.com</a></div><br>");
}

function displayAbout() {
	con.logHTML("<div class='logquaternary'>I'm Riddler, and I stole this website from my good friend desu. They were kind enough to help me steal it.</div>");
	con.logHTML("<div class='logtertiary'>I plan to blogpost here about nothing in particular.</div><br>");

	/*
	con.logHTML("<div class='logsecondary'>If you want to support me, you can do that below.</div>");
	con.logHTML("<div class='logsecondary'>For anything else check the contact section and don't be afraid to reach out!</div><br>");
	*/
	con.logHTML("<div class='logprimary'>I'd ask you to buy me some cigarettes, but they haven't made a site for that yet.</div><br>");

	con.logHTML("<div class='logsecondary'>This site was last updated on: WORKFLOW_DATE_PLACEHOLDER</div><br>");
}

function displayLinks() {
	con.logHTML("<div class='logsecondary'>If you're reading this, you probably already know where to find me.</div><br>");
	/*
	con.logHTML("<div class='logquaternary'>Other places you can find me:</div>");
	con.logHTML("<div class='logsecondary'><a href='https://steamcommunity.com/id/IHateLua'><b>My Steam</b>https://steamcommunity.com/id/IHateLua</a></div>");
	con.logHTML("<div class='logquaternary'><a href='https://github.com/Zisomerism'><b>My Github</b>https://github.com/Zisomerism</a></div>");
	con.logHTML("<div class='logprimary'><a href='mailto:unusualdesu@protonmail.com'><b>Email Me?</b>unusualdesu@protonmail.com</a></div><br>");
	*/
}

function handle_command(command){
	if(command.match(/^<3$/i)){
		con.logHTML("<div class='logprimary'>All our best men are jailed, silenced, or dead.</div>");
	}else if(command.match(/^(Help|Commands|Cmds)$/i)){
		displayCommands()
	}else if(command.match(/^(Blog|Journal|Posts)$/i)){
  		displayBlogList()
	}else if(command.match(/^(About|Info)$/i)){
		displayAbout()
	}else if(command.match(/^(Links|Contact|Socials|Email|Steam|Discord|Github|Stoat)$/i)){ 
		displayLinks()
	}else if(command.match(/^(Hi|Hello|Oi|Greetings|Hey|Heya|Hewwo)$/i)){
		con.logHTML("<div class='loghihello'>Operation Northwoods was a proposed false flag operation which originated within the Department of Defense of the US government in 1962. The proposals called for Central Intelligence Agency (CIA) operatives to both stage and commit acts of terrorism against US military and civilian targets, blame them on the Cuban government, and use them to justify a war against Cuba. The possibilities detailed in the document included the remote control of civilian aircraft which would be secretly repainted as US Air Force planes, a fabricated 'shoot down' of a US Air Force fighter aircraft off the coast of Cuba, the possible assassination of Cuban immigrants, sinking boats of Cuban refugees on the high seas, exploding a US ship, and orchestrating terrorism in US cities.</div>");
	}else if(command.match(/^Nut$/i)){
		con.logHTML("<div class='logprimary'>I don't get the joke.</div>");
	}else if(command.match(/^Desu$/i)){
		con.logHTML("<div class='logprimary'>Riddler</div>");
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
