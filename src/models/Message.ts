export enum MessageType {
    SETUP_COMMUNICATION,
    COMMUNICATION_ESTABLISHED,
    COMMAND_INPUT_FILLER,
    COMMAND_NO_COMPONENT,
    COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP,
    COMMAND_CALL
}

export interface Message {
    message?: any,
    type: MessageType
}