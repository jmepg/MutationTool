const BACKGROUND_OUTSTATE_EXPRESSION = 'super.onSaveInstanceState(outState);';
const BACKGROUND_OUTSTATE_MUTANT = '\n outState.clear();';
const BACKGROUND_WIDGET_MUTANT = '.setSaveEnable(false); \n'
const BACKGROUND_ONPAUSE = 'void onPause()';
const BACKGROUND_SUPER_ONPAUSE = 'super.onPause();';
const BACKGROUND_INTENT_CREATOR = 'android.content.Intent intentMutant = new android.content.Intent(this,';
const BACKGROUND_START_ACTIVITY = 'startActivity(intentMutant);';
const BACKGROUND_ONPAUSE_OVERRIDE = '@Override \n protected void onPause() { \n super.onPause(); \n ';

const BACKGROUND_EDITTEXT_REGEX = /(EditText)?\s*([A-Za-z\d]+)\s*=\s*\(EditText\)findViewById\(([A-Za-z\d.]+)\);/;
const BACKGROUND_SPINNER_REGEX = /(Spinner)?\s*([A-Za-z\d]+)\s*=\s*\(Spinner\)findViewById\(([A-Za-z\d.]+)\);/;
const BACKGROUND_ACTIVITY_CHECK_REGEX = /(public class)\s([A-Za-z\d])+\s(extends)\s[A-Za-z]*(Activity)/;
const END_OF_FILE_REGEX = /\}(\s)*$/;


module.exports.BACKGROUND_OUTSTATE_EXPRESSION = BACKGROUND_OUTSTATE_EXPRESSION;
module.exports.BACKGROUND_OUTSTATE_MUTANT = BACKGROUND_OUTSTATE_MUTANT;
module.exports.BACKGROUND_WIDGET_MUTANT = BACKGROUND_WIDGET_MUTANT;
module.exports.BACKGROUND_ONPAUSE = BACKGROUND_ONPAUSE;
module.exports.BACKGROUND_SUPER_ONPAUSE = BACKGROUND_SUPER_ONPAUSE;
module.exports.BACKGROUND_INTENT_CREATOR = BACKGROUND_INTENT_CREATOR;
module.exports.BACKGROUND_START_ACTIVITY = BACKGROUND_START_ACTIVITY;
module.exports.BACKGROUND_ONPAUSE_OVERRIDE = BACKGROUND_ONPAUSE_OVERRIDE;

module.exports.BACKGROUND_EDITTEXT_REGEX = BACKGROUND_EDITTEXT_REGEX;
module.exports.BACKGROUND_SPINNER_REGEX = BACKGROUND_SPINNER_REGEX;
module.exports.BACKGROUND_ACTIVITY_CHECK_REGEX = BACKGROUND_ACTIVITY_CHECK_REGEX;
module.exports.END_OF_FILE_REGEX = END_OF_FILE_REGEX;