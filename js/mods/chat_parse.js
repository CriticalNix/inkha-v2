var chat_on = 1;
var alernate = 1;

//document.body.background = "http://i.imgur.com/mSBHmBL.jpg";

function gets_date() {
    var now = new Date();
    var strDateTime = [
        [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":")
    ].join(" ");

    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    return strDateTime;
}

function clicked_action_bet(e) {  //overwrites a function from just-dice
	//$("#pct_balance").focus(); changes focus when bot is betting
	if (get_waiting()) {
		msg("Please wait for previous bet to finish.");
		return
	}
	send_bet(e)
}

function linkify_uid(e) {
	var t = e.match(/^[(]([0-9]+)[)] &lt;(@?)(.*)&gt;$/);
	if (!t) {
		return e;
	} else {
		var n = t[1],
		r = t[2],
		i = t[3];
		return '<span onclick="u(' + n + ');">(' + n + ')</span> <span onclick="n(' + "'" + i + "'" + ');">&lt;' + r + i + "&gt;</span>"
	}
}

function doog_regex(t) {
//console.log(t);
t=quote_html(t);
t=emoticons(t);

t=t.replace(/([^0-9a-z#])((?:betid|roll):? |#)([1-9][0-9]{4,9})\b/ig,'$1<a target="_blank" href="/roll/$3">$2$3</a>');
t=t.replace(/(https:\/\/just-dice[.]com\/roll\/)([1-9][0-9]{0,9})/ig,' <a target="_blank" href="/roll/$2">$2</a> ');
t=t.replace(/(bitcoin-talk|bticointakl)/ig,"$1 (a phishing site, do not visit)");
t=t.replace(/lnputs[.]io/ig,"Lnputs.io (a phishing site, do not visit)");
t=t.replace(/dicen[o0]w/ig,"dice-now");
t=t.replace(/letsdice/ig,"lets-dice");
t=t.replace(/grindabit/ig,"spamalot [lol jk]");
t=t.replace(/bitdice[.]de/ig,"[yet more spam]");
t=t.replace(/(http:\/\/just-dice[.]blogspot[.](?:ca|com)\/[0-9]+\/[0-9]+\/([a-z0-9-]+)(?:_[0-9]+)?[.]html)/ig,'[<a target="_blank" href="$1">$2</a>]');
t=t.replace(/([?]|&amp;)(r|ref[a-z]*)=\s*(?:.+?\b)/ig,"$1$2= [spam link] ");
t=t.replace(/(\/ref\/[0-9a-z\/]*)/ig," [spam link]");
t=t.replace(/(speedy[.]sh|bit[.]ly|gg[.]gg|goo[.]gl|is[.]gd|tinyurl[.]com|ge[.]tt)\/[a-z0-9]{4,}/ig,"[suspicious link]");
t=t.replace(/\bbitwars\b/ig,"[spam link]");
t=t.replace(/\bmegaapp\b/ig,"[suspicious link]");
t=t.replace(/\b(javascript:)/i,"[potential scam warning] $1");
t=t.replace(/([a-z0-9.-_]*buybtc[a-z0-9.-_]*@gmail[.])com/ig,"I am a scammer and will steal your coins!  $1cum to meet your sticky end!");
t=t.replace(/([a-z0-9.-_]*buybtc[a-z0-9.-_]*@gmail[.])com/ig,"");
t=t.replace(/([^a-z])[ᴦrг]⁠*[aäΑА]⁠*[pр]⁠*[eеΕ]/ig,"$1tickle");
t=t.replace(/([^a-z])[ᴦrг]⁠*[aäΑА]⁠*[pр]⁠*i⁠*([^d])/ig,"$1tickli$2");
t=t.replace(/([^a-z])[ᴦrг]⁠*[aäΑА]⁠*[eеΕ]⁠*[pр]/ig,"$1tickel");
t=t.replace(/([^a-z])[ᴦrг]⁠*[aäΑА]⁠*[eеΕ]⁠*[pр]⁠*i/ig,"$1tickeli");
t=t.replace(/((?:(?:[nñṉɴⓝΝ]|[1iḭіlɪ!|\\/]⁠*[1iḭіlɪ!|\\/]⁠*[1iḭіlɪ!|\\/])(?:[⁠ ]*))+)((?:[1iḭіlɪ!|ⓘ][⁠ ]*)+)([gḡǥɢⓖ9][⁠ ]*)((?:[gḡǥɢⓖ9][⁠ ]*)+)((?:(?:[3eḛееΕᴇuⓔaäḁа@iḭі][⁠ ]*)+)(?:[ᴦrṙягʀⓡ][⁠ ]*)+|(?:[a@äḁаᴀ4ⓐ][⁠ ]*)+)/ig,"$3$2$1$4$5");
t=t.replace(/(&lt;.*&gt;.*?)\b(butthurt)\b/i,'$1<a target="_blank" href="https://just-dice.com/form.jpg">$2</a>');
t=t.replace(/(blockchain[.]info\/)(?:[a-w]{2}|zh-cn)\//g,"$1");
t=t.replace(/([^a-zA-Z0-9=?/])(?:(?:tx(?:id)?)?:)?(?:(?:https?:\/\/)?khashier[.]com\/tx(?:-index)?\/)?([0-9a-f]{8})([0-9a-f]{56})\b/g,'$1[<a target="_blank" href="http://khashier.com/tx/$2$3">$2</a>]');
t=t.replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?blockchain[.]info\/address\/)?(1[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://blockchain.info/address/$2$3">$2</a>]');
t=t.replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?dogechain[.]info\/address\/)?(D[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://dogechain.info/address/$2$3">$2</a>]');
t=t.replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?block-explorer[.]com\/address\/)?(L[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://block-explorer.com/address/$2$3">$2</a>]');
t=t.replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?khashier[.]com\/address\/)?(x[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://khashier.com/address/$2$3">$2</a>]');
t=t.replace(/\b(?:(?:https?:\/\/)?(?:www[.])?polo(?:niex(?:[.]com)?(?:\/exchange\/btc_clam)?)?)\b/ig,'[<a target="_blank" href="https://poloniex.com/exchange/btc_clam">poloniex</a>]');
t=t.replace(/\bhttps:\/\/ip[.]bitcointalk[.]org\/[?]u=http%3A%2F%2F(i[.]imgur[.]com)%2F([^&]*)&amp;t=[a-z0-9=&_;]*\b/ig,"https://$1/$2");
t=t.replace(/\b(https?:\/\/(?:i|www)[.]imgur[.]com\/[0-9a-z]{5,7}[.](?:jpe?g|png|gif)(?:[?][0-9]+)?)\b/ig,'[<a target="_blank" href="$1">img</a>]');
t=t.replace(/\b(https?:\/\/imgur[.]com\/(?:a|gallery)\/[0-9a-z]{5,7}\/?(?:#\d+)?)(?:\b|$)/ig,'[<a target="_blank" href="$1">imgs</a>]');
t=t.replace(/\b(https?:\/\/(?:(?:www[.])?youtube[.]com\/watch[?]v=|youtu[.]be\/)[0-9a-z_-]{11}[?]?(?:(?:&amp;)?(?:wide|(?:feature|list)=[a-z.0-9]*|t=[0-9msh]+))*)\b/ig,'[<a target="_blank" href="$1">video</a>]');
t=t.replace(/(&lt;.*&gt;.*?)\b(way she goes)\b/i,'$1<a target="_blank" href="https://youtu.be/gtM9xD-Ky7E">$2</a>');
t=t.replace(/\b(https?:\/\/(?:(?:www|r2)[.])?reddit[.]com\/r\/([a-z0-9]+)\/comments\/[a-z0-9]+\/([a-z0-9_]+)(?:\/[0-9a-z]+)?\/?)(\b| |$)/ig,'[<a target="_blank" href="$1">reddit:$2 $3</a>]$4');
t=t.replace(/\b(https:\/\/bitcointalk[.]org\/(?:index[.]php)?[?]topic=[0-9]+(?:[.](?:new#new|(?:msg)?[0-9]+))?(?:;(?:all|topicseen))?(?:#new|#msg[0-9]+)?)\b/ig,'[<a target="_blank" href="$1">thread</a>]');

		var i = t.match(/^[[] (.*?) → (.*?) ](.*)$/);
		
		if (i) {
			//console.log('Matched i');
		
			i[2] == "@mods" ? (n = "chatmod", t = linkify_uid(i[1]) + i[3]) : (n = "chatpm", t = linkify_uid(i[1]) + " → " + linkify_uid(i[2]) + i[3]);
		
		}
		var s = t.match(/^[(]([0-9]+)[)] &lt;(@?)(.*?)&gt; (.*)$/);
		//var s = t.match(/^[(]([0-9]+)[)](@?) (.*) (.*)$/);
		
		if (s) {
			//console.log('Matched s');
			var o = s[1],
			u = s[2],
			a = s[3],
			f = s[4];
			t = '<span onclick="u(' + o + ');">(' + o + ')</span> <span onclick="n(' + "'" + a + "'" + ');">&lt;' + u + a + "&gt;</span> " + f,
			o == 2 && (n = "chatprincess")
		}

    return t;
}


function emoticons(text) { //emotes are checked and passed into a string before being sent back to chat
    var url = "https://googledrive.com/host/0BywRa_utENFgV0ZBNmdVRTJ0a0k/";

    var searchFor = /:D|:-D|Kappa|:\)|:-\)|;\)|';-\)|:\(|:-\(|:o|:\?|8-\)|:x|:P/gi;

    var b = text.match(/^[x][a-km-zA-HJ-NP-Z0-9]{26,33}$/);
    if(b){
       return(text);
    } else {
    
    // A map mapping each smiley to its image
    var map = {
        ":D": '/4.gif', // Capped version of the next
        ":d": '/4.gif', // Lower case version of the previous
        ":-D": '/4.gif', // Capped version of the next
        ":-d": '/4.gif', // Lower case version of the previous
        ":)": '/1.gif',
        ":-)": '/1.gif',
        ";)": '/3.gif',
        "';-)": '/3.gif',
        "Kappa": '/kappa.png',

        ":(": '/2.gif',
        ":-(": '/2.gif',
        ":O": '/13.gif', // Capped version of the next
        ":o": '/13.gif', // Lower case version of the previous
        ":?": '/7.gif',
        "8-)": '/16.gif',

        ":X": '/14.gif', // Capped version of the next
        ":x": '/14.gif', // Lower case version of the previous
        ":P": '/10.gif', // Capped version of the next
        ":p": '/10.gif' // Lower case version of the previous
    };

    text = text.replace(searchFor, function(match) {
        var rep;

        rep = map[match];

        return rep ? '<img src="' + url + rep + '" class="emoticons" />' : match;
    });

    var name_usr = $('#nick').text(); // finds username for highlighting 


    text = text.replace(name_usr, "<font color='blue'><b>$&</b></font>").replace(/^\((.*?)\) &lt;@(.*?)&gt;/g, "\($1\) &lt;@<font color='orange'>$2</font>&gt;").replace(/^\((88818|88889|13)\) &lt;(.*?)&gt;/g, "\($1\) &lt;<font color='purple'>$2</font>&gt;");


    return (text);
    }
}

socket.on("chat", function (t) { //reads chat lines using socket then uses simple jquery to replace the line with one containing emotes.

	var parent = $('.chatlog').parents('.chatscroll');
	var $parentfound = parent.find('.chatline:last');

	if (t.match(/\((.*?)\) <(.*?)> (.*)/)) {

		var master = $('#uid').text();
		var name_usr = $('#nick').text();
		var reg_usr = /\<([^)]+)\>/;
		var reg_userid = /\(([^)]+)\)/;
		var id_usr = reg_usr.exec(t)[1];
		var userid = reg_userid.exec(t)[1];
		var cleanMsg = t.split("> ")[1];

		if (chat_on == 1) {
			chat_line = doog_regex(t);
			//console.log(chat_line);
			$parentfound.html(gets_date() + ' ' + chat_line);
		}

		if (userid == master && id_usr == name_usr) {
			if (cleanMsg == "!emote") {
				chat_on = !chat_on;
			}

		}
	}

});