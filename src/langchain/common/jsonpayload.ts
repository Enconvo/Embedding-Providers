export default interface JsonPayload {
    content?: string | any;
    text?: string;
    type?: 'text' | 'messages';
    context?: string;
    reset?: boolean;
    options?: any;
    list?: any[];
    env?: Record<string, any>;
}
