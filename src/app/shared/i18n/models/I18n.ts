import { Language } from './Language';

export class I18n {
    public lastModified?: string | null;
    public baseUrl: string;
    public langs: Language[];

    constructor(
        i18n: Partial<I18n>
    ) {
        this.baseUrl = i18n.baseUrl as string;
        this.langs = (i18n.langs as Language[]).map((l: Language) => {
            let lang = new Language(l);
            lang.url = this._prepareUrl(lang.url);
            return lang;
        });
        this.lastModified = i18n.lastModified || null;
    }

    /**
     * Get the language configuration if available, null otherwise
     * @param  {string} lang Requested language
     * @returns {Language|undefined}
     */
    public getConfig(langCode: string): Language|undefined {
        return this.langs.find((l: Language) => { return l.code === langCode });
    }

    /**
     * Get the default language in langs property
     * @returns string
     */
    public getDefault(): Language {
        const def = this.langs.find((l: Language) => { return l.isDefault; });
        return def || this.langs[0];
    }

    /**
     * Add baseUrl as prefix if the lang url is relative
     * @param {string} url Relative lang url
     */
    private _prepareUrl(url: string): string {
        if (url.trim().indexOf('http') !== 0) {
            url = (this.baseUrl + url).trim();
        }
        return url;
    }
}
