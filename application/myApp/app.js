// Variables initialisation ----------------------
let scrolledLength = 0;

// Dictionnaries option list creation ----------------
const dictionnariesList = [
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> slovène <span class="fi fi-si"></span>',
		value:"frsl",
		choiceList_type:"NONE", // MENU, NONE or BOOLEAN
		// choiceList_icon:"fas fa-people-arrows",
		// choiceList_infos:"essai infos",
		// choiceList_value:true, // read only property : if choiceList_type === "BOOLEAN", this is the value of checkbox : true if checked, otherwise false
		// choiceList_itemNumbered:"DOWN"  // UP or DOWN
		// choiceList_itemNumber : read only property
		//
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> allemand <span class="fi fi-de"></span>',
		value:"defr",
		choiceList_type:"NONE"
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> anglais <span class="fi fi-gb"></span>',
		value:"enfr",
		choiceList_type:"NONE"
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> italien <span class="fi fi-it"></span>',
		value:"frit",
		choiceList_type:"NONE"
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> espagnol <span class="fi fi-es"></span>',
		value:"esfr",
		choiceList_type:"NONE"
	}
];

let dictionnariesListOptions = {
	"selectedItemIdPrefix" : 		"dictionnariesListOptions",
	"targetDomSelector" : 			"#dictionnariesList"
}

const dictionnaries = new KAI.choiceList(dictionnariesList,dictionnariesListOptions);

// -----------------------------------------------
// Global functions
// -----------------------------------------------

// -----------------------------------------------
// States INIT
// -----------------------------------------------
KAI.addState("init", {
  softKeys : {fr : ['tt select.','chercher','']},
  display : {
    'div#input' : true,
    'div#translations': false
  },
  afterStateChange : function() {
    dictionnaries.generateHtml();
    // After 200 ms we select the searchWord input field
    setTimeout(() => {
      document.getElementById("searchWord").select();
    }, 200);
  },
	events : {
		'keyup.ArrowUp': function(event) {
      dictionnaries.previous();
		},
		'keyup.ArrowDown': function(event) {
      dictionnaries.next();
		},
		'keyup.SoftLeft': function(event) {
      document.getElementById("searchWord").select();
		},
		'keyup.Enter': function(event) {
      event.preventDefault();
      const searchWord = document.getElementById("searchWord").value.trim();
      console.log("search word : \"" + searchWord + "\" in \"" + dictionnaries.currentItem().value + "\" dictionnary");
      if (searchWord) {
        // We clear the translations screen and display the spinner
    		$('#translations').html("");
        KAI.spinner.on("recherche en cours...");
        // We look in the relevant language PONS dictionnary
        pons_getTranslations(searchWord, dictionnaries.currentItem().value)
          .then(function (ponsResponse) {
            // We stop the spinner
            KAI.spinner.off();
            // We format the response and display it
            $('#translations').html(pons_formatResponse(ponsResponse));
            // We change state to display the translations
          	KAI.newState('translations');
            // ?????????????????????????????????????????????????????????????????????
          	// This is important to be able to exit using backspace key, but why ???
          	document.getElementById("translations").focus();
            // ?????????????????????????????????????????????????????????????????????
          })
          .catch(function (err) {
            // We stop the spinner and display the error
            KAI.spinner.off();
            KAI.toastr.warning(err.statusText);
  					console.log(err.statusText);
          });
      }
			else KAI.toastr.warning("Saisir un mot avant de chercher");
		}
	}
});

// -----------------------------------------------
// States TRANSLATIONS
// -----------------------------------------------
KAI.addState("translations", {
  softKeys : {fr : ['saisir','','']},
  display : {
    'div#input' : false,
    'div#translations': true
  },
  afterStateChange : function() {
    // And reset the scroll
		scrolledLength = 0;
		// We apply the scroll
		document.getElementById("translations").scrollTo({
			top:0,
			behavior: 'auto'
		});
  },
	events : {
		'keyup.ArrowUp': function(event) {
      if (scrolledLength != 0) {
        scrolledLength -=120;
        if (scrolledLength < 0 )scrolledLength = 0;
        document.getElementById("translations").scrollTo({
  		    top:scrolledLength,
  		    behavior: 'auto'
  	    });
      }
		},
		'keyup.ArrowDown': function(event) {
      const height = document.getElementById("translations").scrollHeight;
      if (scrolledLength < height - 245) {
        scrolledLength +=120;
        document.getElementById("translations").scrollTo({
  		    top: scrolledLength,
  		    behavior: 'auto'
  	    });
      }
		},
		'keyup.SoftLeft': function(event) {
      KAI.newState('init');
		}
	}
});

// -----------------------------------------------
// APP config and start
// -----------------------------------------------
window.onload = function() {
	KAI.init({
	  options: {
			appTitle: 						"Dictionnaire PONS",
			appVersion: 					"V1.0.0",
			lang: 								'fr',
			loadConfigFromSD: 		false
		},
		defaultConfig: {					// No function, must be JSON.stringable
	  },
		coldStart: function() {
			// Here config is loaded by default
			KAI.newState('init');
			console.log("coldStart done");
	  },
	  warmStart: function() {
			// Here config is loaded
			console.log("warmStart done")
	  }
	});

	console.log("app.js launched");
};
console.log("app.js loaded");
