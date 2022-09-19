import {Assignment} from "../models/assignment";

// communication specific
export const EXTENSION_ID = chrome.i18n.getMessage("@@extension_id");
export const CONTENT_SCRIPT_ID = `${EXTENSION_ID}/contentScript`;
export const BACKGROUND_ID = `${EXTENSION_ID}/backgroundScript`;
export function getExtensionUrl() {
    return "chrome-extension://" + EXTENSION_ID + "/";
}

// recognition specific
export const ASSISTANT_NAME = 'Chrome';
export const ASSISTANT_WAKEUP_COMMAND = `Hallo ${ASSISTANT_NAME}`;
export const ASSIGNMENTS: Assignment[] = [{
    request: 'wie geht es dir',
    response: 'Danke für die Nachfrage. Mir geht es gut.'
}];

