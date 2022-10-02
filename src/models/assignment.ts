export interface Assignment{
    request: string;
    response: string;
    component: Component;
}

export enum Component {
    INIT,
    NO_COMPONENT,
    INPUT_FILLER_COMPONENT,
    YOUTUBE_VIDEO_SELECTION_ON_DESKTOP
}