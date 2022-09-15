export enum MessageType {
    'START_RECOGNITION',
    'BEFORE_RECOGNITION_STARTED',
    'RECOGNITION_STARTED',
    'AFTER_RECOGNITION_STARTED',
}

export interface Message {
    message?: any,
    type: MessageType
}