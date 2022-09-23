export interface Assignment{
    request: string;
    response: string;
    component: Component;
}

export enum Component {
    NO_COMPONENT,
    INPUT_FILLER_COMPONENT
}