export enum MessageType {
    SETUP_COMMUNICATION,
    COMMUNICATION_ESTABLISHED,
    COMMAND_INPUT_FILLER,
    COMMAND_NO_COMPONENT,
    COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP,
    COMMAND_PAUSE_OR_PLAY_YOUTUBE_VIDEO,
    COMMAND_START_NEXT_YOUTUBE_VIDEO,
    COMMAND_MUTE_YOUTUBE_VIDEO,
    COMMAND_UNMUTE_YOUTUBE_VIDEO,
    COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO,
    COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE,
    COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN,
    COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN,
    COMMAND_ACTIVATE_YOUTUBE_SEARCH,
    COMMAND_OPEN_GOOGLE,
    COMMAND_SEARCH_ON_GOOGLE,
    COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH,
    COMMAND_OPEN_GOOGLE_IMAGE_RESULT,
    COMMAND_OPEN_GOOGLE_VIDEOS_RESULT,
    COMMAND_OPEN_GOOGLE_SHOPPING_RESULT,
    COMMAND_OPEN_GOOGLE_NEWS_RESULT,
    COMMAND_OPEN_GOOGLE_ALL_RESULT,
    COMMAND_OPEN_GOOGLE_MAPS_RESULT,
    COMMAND_OPEN_GOOGLE_BOOK_RESULT,
    COMMAND_OPEN_GOOGLE_FINANCE_RESULT,
    COMMAND_OPEN_GOOGLE_FLY_RESULT,
    COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE,
    COMMAND_CALL,
}

export interface Message {
    message?: any,
    type: MessageType
}