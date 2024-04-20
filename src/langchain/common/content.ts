import { PathLike } from "fs";

export type Content = {
    /**
     * The text representation of the content.
     */
    text: string;
} | {
    /**
     * The file representation of the content.
     */
    file: PathLike;
} | {
    /**
     * The file representation of the content.
     */
    files: PathLike[];
} | {
    /**
     * The HTML representation of the content.
     */
    html: string;
    /**
     * The alternative text representation of the content.
     */
    text?: string;
}