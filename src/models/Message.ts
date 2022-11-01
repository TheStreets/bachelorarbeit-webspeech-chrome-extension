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
    COMMAND_GO_BACK,
    COMMAND_GO_FORWARD,
    COMMAND_DUPLICATE_PAGE,
    COMMAND_MOVE_TAB_TO_FIRST_POSITION,
    COMMAND_MOVE_TAB_TO_LAST_POSITION,
    COMMAND_MOVE_TAB_TO_LEFT_POSITION,
    COMMAND_MOVE_TAB_TO_RIGHT_POSITION,
    COMMAND_MOVE_TAB_TO_NEW_WINDOW,
    COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW,
    COMMAND_OPEN_TAB,
    COMMAND_CLOSE_TAB,
    COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW,
    COMMAND_CLOSE_ALL_WINDOWS,
    COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB,
    COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB,
    COMMAND_SEARCH,
    COMMAND_RELOAD_WEBSITE,
    COMMAND_DELETE_LAST_NOTE,
    COMMAND_DELETE_ALL_NOTES,
    COMMAND_CALL,
COMMAND_READ_LAST_THREE_NOTES,
}

export interface Message {
    message?: any,
    type: MessageType
}