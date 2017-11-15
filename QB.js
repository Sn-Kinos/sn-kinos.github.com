function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}

Jdex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))

function kinput(value) {
	document.getElementById('kodex_'+value).innerHTML = eval('dex.'+value);
}
function check(argument) {

	if (window.event.keyCode == 13) {

		search(kodex_srch.value);

	}
	showExmpl(kodex_srch.value);

}
function search(srch) {

	if (eval("Jdex['" + srch + "']") != undefined) {

		rarity={
			'N':'1',
			'N+':'2',
			'R':'3',
			'R+':'4',
			'SR':'5',
			'SR+':'6',
			'SSR':'7',
			'QR':'8'
		}
		role={
			'공격':'atk',
			'방어':'hp',
			'회복':'spr'
		}
		dex = eval("Jdex['" + srch + "']");
		kinput('rarity');
		kinput('name');
		kinput('cost');
		document.getElementById('td_rarity').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById('td_name').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById('td_role').setAttribute('style', 'background: '+dex.roleColor+';');
		kinput('skill');
		kinput('role');
		kinput('skilltype');
		kinput('faction');
		kinput('illustrator');
		document.getElementById('kodex_img_0').setAttribute('src', encodeURI('/Kodex/'+role[dex.role]+'/'+dex.skill.substr(0, 2)+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'an.jpg'));
		document.getElementById('kodex_img_1').setAttribute('src', encodeURI('/Kodex/'+role[dex.role]+'/'+dex.skill.substr(0, 2)+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'bn.jpg'));
		document.getElementById('kodex_img_2').setAttribute('src', encodeURI('/Kodex/'+role[dex.role]+'/'+dex.skill.substr(0, 2)+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'cn.jpg'));
		kinput('hp0');
		kinput('atk0');
		kinput('spr0');
		for (var i = 0; i < 6; i++) {
			document.getElementById('kodex_HP_'+i).innerHTML = dex.HP[i];
			document.getElementById('kodex_ATK_'+i).innerHTML = dex.ATK[i];
			document.getElementById('kodex_SPR_'+i).innerHTML = dex.SPR[i];
		}

	}
	kodex_srch.value = '';
	document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')


}

ex_list = []
function exmpl(argument) {

	ex_list = []
	key_list = Object.keys(Jdex)
	var j = 0
	for (var i = 0; i < key_list.length && j < 10; i++) {
		
		dex = eval("Jdex['" + key_list[i] + "']");
		if(dex.name.indexOf(kodex_srch.value) != -1){

			ex_list[j] = dex.name;
			j+=1;

		}

	}

}

function showExmpl(argument) {

	exmpl();
	inp = document.getElementById('kodex_srch')
	ul = document.getElementById('kodex_exmpl')
	ul.setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: block;')
	ul.innerHTML = ''
	for (var i = 0; i < 10; i++) {
		if (ex_list[i] != undefined) {
			ul.innerHTML = ul.innerHTML + "<li onclick='search(ex_list["+i+"])'>"+ex_list[i]+"</li>"
		}

	}
	if (ul.innerHTML == '') {
		ul.setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')
	}

}