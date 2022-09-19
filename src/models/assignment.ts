export interface Assignment{
    request: string;
    response: string;
    component: Components;
}

export enum Components {
    NO_COMPONENT,
    INPUT_FILLER_COMPONENT
}