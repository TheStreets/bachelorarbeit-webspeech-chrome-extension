// communication specific
export const EXTENSION_ID = chrome.i18n.getMessage("@@extension_id");
export const CONTENT_SCRIPT_ID = `${EXTENSION_ID}/contentScript`;
export const BACKGROUND_ID = `${EXTENSION_ID}/backgroundScript`;

// recognition specific
export const ASSISTANT_NAME = 'Chrome';
export const ASSISTANT_WAKEUP_COMMAND = `Hallo ${ASSISTANT_NAME}`;

export function getExtensionUrl() {
    return "chrome-extension://" + EXTENSION_ID + "/";
}

export const COMMANDS = [
    {
        command: `${ASSISTANT_WAKEUP_COMMAND} wie geht es dir`,
        callback: (command, resetTranscript) => {
            console.log(command);
            chrome.tts.speak('Danke für die Nachfrage. Mir geht es gut.');
            resetTranscript();
        }
    }
]