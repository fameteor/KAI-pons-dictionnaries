# KAI-PONS-translator
KAIos application to get translations using the PONS dictionnary.

This application uses the PONS dictionnary API (https://en.pons.com/p/online-dictionary/developers/api). You need first to create a free account and get a credential from PONS and create a `credential.js` file in the `application` directory containing the line : `const authenticationKey = "my_PONS_account_credential"`.

# Use
1) Choose the language to translate from/to using the up/down keys. Then enter the word to search for and press "chercher" to get the translation.  

![input screen](screen_copies/input_screen.png)  

2) Wait for the translations.  

![searching screen](screen_copies/searching_screen.png)  

3) The translations are displayed, you can scroll using the up/down keys. Press "saisir" to look for a new word.  

![translation screen](screen_copies/translation_screen.png)  

# Credits

This application uses :
- the PONS dictionnary API (https://en.pons.com/p/online-dictionary/developers/api)
- Fontawesome 5 icons (https://fontawesome.com/v5/search)
- Free country flags in SVG (https://flagicons.lipis.dev/)

# Bugs
- Quand on fait Backspace sur le champ de saisie d'un mot sélectionné, on ne l'efface pas ! Et pas possible de quitter l'appli sauf en tapant autre chose avant de faire plusieurs fois backspace.


# KaiOs Framework
## `KaiOsApp` object
Contained in `/kaiOsFramework/KaiOsApp.js` file). It contains all what is necessary to run a KaiOs app as a state machine.

## `KaiOsChoiceList` object
contained in `/kaiOsFramework/KaiOsChoiceList.js` file). This object is used to build KaiOs choice list to choose an item using the up or bottom arrow key.
