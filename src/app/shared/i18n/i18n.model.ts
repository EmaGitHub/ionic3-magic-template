
export class Language {
    public code: string;
    public label: string;
    public url: string;
    public isDefault: boolean;
    public lastModified: string | null;
    public translations: object | null;

    constructor(
        language: Language
    ) {
        this.code = language.code;
        this.label = language.label;
        this.url = language.url;
        this.isDefault = language.isDefault;
        this.lastModified = language.lastModified || null;
        this.translations = language.translations || null;
    }
}

export class I18n {
    public lastModified: string | null;
    public baseUrl: string;
    public langs: Language[];

    constructor(
        i18n: I18n
    ) {
        this.baseUrl = i18n.baseUrl;
        this.langs = i18n.langs.map((l: Language) => {
            let lang = new Language(l);
            lang.url = this.prepareUrl(lang.url);
            return lang;
        });
        this.lastModified = i18n.lastModified || null;
    }


    /**
     * Get the language configuration if available, null otherwise
     * @param  {string} lang Requested language
     * @returns {Language|undefined}
     */
    getConfig(langCode: string): Language|undefined {
        return this.langs.find((l: Language) => { return l.code === langCode });
    }


    /**
     * Get the default language in langs property
     * @returns string
     */
    getDefault(): Language {
        const def = this.langs.find((l: Language) => { return l.isDefault; });
        return def || this.langs[0];
    }


    /**
     * Add baseUrl as prefix if the lang url is relative
     * @param {string} url Relative lang url
     */
    private prepareUrl(url: string): string {
        if (url.trim().indexOf('http') !== 0) {
            url = (this.baseUrl + url).trim();
        }
        return url;
    }
}
