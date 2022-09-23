export enum MessageType {
    START_RECOGNITION,
    RECOGNITION_STARTED,
    SETUP_COMMUNICATION,
    COMMUNICATION_ESTABLISHED,
    COMMAND_INPUT_FILLER,
    COMMAND_NO_COMPONENT,
    COMMAND_CALL
}

export interface Message {
    message?: any,
    type: MessageType
}