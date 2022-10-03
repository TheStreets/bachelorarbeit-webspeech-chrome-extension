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
export const COMMAND_OPEN_YOUTUBE_PAGE = `${ASSISTANT_WAKEUP_COMMAND} öffne youtube`;
export const COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX = `${ASSISTANT_WAKEUP_COMMAND} öffne video nummer *`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1 = `${ASSISTANT_WAKEUP_COMMAND} video stoppen`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2 = `${ASSISTANT_WAKEUP_COMMAND} video pausieren`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3 = `${ASSISTANT_WAKEUP_COMMAND} video starten`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4 = `${ASSISTANT_WAKEUP_COMMAND} video wiedergeben`;
export const COMMAND_START_NEXT_YOUTUBE_VIDEO = `${ASSISTANT_WAKEUP_COMMAND} nächstes Video (starten)`;
export const COMMAND_MUTE_YOUTUBE_VIDEO_1 = `${ASSISTANT_WAKEUP_COMMAND} video stumm schalten`;
export const COMMAND_MUTE_YOUTUBE_VIDEO_2 = `${ASSISTANT_WAKEUP_COMMAND} video stumm stellen`;
export const COMMAND_UNMUTE_YOUTUBE_VIDEO = `${ASSISTANT_WAKEUP_COMMAND} video laut stellen`;
export const COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_1 = `${ASSISTANT_WAKEUP_COMMAND} lautstärke auf * (stellen)`;
export const COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_2 = `${ASSISTANT_WAKEUP_COMMAND} stelle lautstärke auf *`;
export const COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_1 = `${ASSISTANT_WAKEUP_COMMAND} aktiviere Kinomodus`;
export const COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_2 = `${ASSISTANT_WAKEUP_COMMAND} Kinomodus starten`;
export const COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1 = `${ASSISTANT_WAKEUP_COMMAND} deaktiviere Kinomodus`;
export const COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2 = `${ASSISTANT_WAKEUP_COMMAND} Kinomodus beenden`;

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

