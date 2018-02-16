
export class LangConfig {
    public code: string;
    public label: string;
    public url: string;
    public isDefault: boolean;
    public lastModified: string | null;

    constructor(
        lang: LangConfig
    ) {
        this.code = lang.code;
        this.label = lang.label;
        this.url = lang.url;
        this.isDefault = lang.isDefault;
        this.lastModified = lang.lastModified || null;
    }
}

export class Translator {
    public lastModified: string | null;
    public baseUrl: string;
    public langs: LangConfig[];

    constructor(
        translator: Translator
    ) {
        this.baseUrl = translator.baseUrl;
        this.langs = translator.langs.map((l: LangConfig) => {
            let lang = new LangConfig(l);
            lang.url = this.prepareUrl(lang.url);
            return lang;
        });
        this.lastModified = translator.lastModified || null;
    }


    /**
     * Get the language configuration if available, null otherwise
     * @param  {string} lang Requested language
     * @returns {LangConfig|undefined}
     */
    getConfig(langCode: string): LangConfig|undefined {
        return this.langs.find((l: LangConfig) => { return l.code === langCode });
    }


    /**
     * Get the default language in langs property
     * @returns string
     */
    getDefault(): LangConfig {
        const def = this.langs.find((l: LangConfig) => { return l.isDefault; });
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
