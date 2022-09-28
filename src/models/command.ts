// recognition specific
export const ASSISTANT_NAME = 'nami';
export const ASSISTANT_WAKEUP_COMMAND = `Hallo ${ASSISTANT_NAME}`;

// commands
export const COMMAND_HOW_ARE_YOU = `${ASSISTANT_WAKEUP_COMMAND} wie geht es dir`;
export const COMMAND_RESET = `reset`;
export const COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION = `${ASSISTANT_WAKEUP_COMMAND} wie ist das aktuelle Wetter`;
export const COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION = `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter heute`;
export const COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION = `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter in den nächsten drei tagen`;
export const COMMAND_CURRENT_WEATHER_BY_CITY = `${ASSISTANT_WAKEUP_COMMAND} wie ist das aktuelle Wetter in *`;
export const COMMAND_TODAY_WEATHER_BY_CITY = `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter heute in *`;

export interface Command {
    command: string;
    example: string;
    commandType: CommandType
}

export enum CommandType {
    INTRODUCTION,
    UTILITY,
    WEATHER
}

