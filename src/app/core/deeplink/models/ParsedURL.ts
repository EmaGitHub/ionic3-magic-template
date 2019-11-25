
export class ParsedURL {
    public host: string;
    public hostname: string;
    public port: string;
    public pathname: string;
    public search: string;
    public hash: string;
    public searchObject: any;
    public protocol: string;

    constructor(
        parser: HTMLAnchorElement,
        searchObject: any
    ) {
        this.protocol = parser.protocol || '';
        this.host = parser.host || '';
        this.hostname = parser.hostname || '';
        this.port = parser.port || '';
        this.pathname = parser.pathname || '';
        this.search = parser.search || '';
        this.hash = parser.hash || '';
        this.searchObject = searchObject || {};
    }

}
