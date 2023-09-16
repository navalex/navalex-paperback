(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":47}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);
__exportStar(require("./SearchFilter"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchFilter":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlameScans = exports.ScanMangaVFInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const parser_1 = require("./parser");
const SOURCE_DOMAIN = "https://scanmanga-vf.ws";
exports.ScanMangaVFInfo = {
    version: "1.0.0",
    name: "ScanManga-VF",
    description: "Extension that pulls manga from ScanManga-VF.ws website.",
    author: "Navalex",
    authorWebsite: "http://github.com/navalex",
    icon: "navalex.png",
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: SOURCE_DOMAIN,
    sourceTags: [
        {
            text: "French",
            type: paperback_extensions_common_1.TagType.GREY,
        },
        {
            text: "Cloudflare",
            type: paperback_extensions_common_1.TagType.RED,
        },
    ],
};
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44";
class FlameScans extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.baseUrl = SOURCE_DOMAIN;
        this.requestManager = createRequestManager({
            requestsPerSecond: 3,
            requestTimeout: 8000,
            interceptor: {
                interceptRequest: async (request) => {
                    request.headers = {
                        ...(request.headers ?? {}),
                        ...{
                            "user-agent": userAgent,
                            referer: `${this.baseUrl}/`,
                        },
                    };
                    return request;
                },
                interceptResponse: async (response) => {
                    return response;
                },
            },
        });
        this.RETRY = 5;
        this.parser = new parser_1.Parser();
    }
    getMangaShareUrl(mangaId) {
        return `${this.baseUrl}/manga/${mangaId}`;
    }
    async getMangaDetails(mangaId) {
        const request = createRequestObject({
            url: `${this.baseUrl}/manga/${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseMangaDetails($, mangaId);
    }
    async getChapters(mangaId) {
        const request = createRequestObject({
            url: `${this.baseUrl}/manga/${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapters($, mangaId, this);
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = createRequestObject({
            url: `${chapterId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapterDetails($, mangaId, chapterId);
    }
    async getSearchResults(query, metadata) {
        let page = metadata?.page ?? 1;
        if (page == -1)
            return createPagedResults({ results: [], metadata: { page: -1 } });
        const search = query.title?.replace(/ /g, "+").replace(/[’'´]/g, "%27") ?? "";
        const param = `filterList?page=${page}&tag=&alpha=${search}&sortBy=name&asc=true`;
        const request = createRequestObject({
            url: `${this.baseUrl}`,
            method: "GET",
            param,
        });
        const data = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(data.status);
        const $ = this.cheerio.load(data.data);
        const manga = this.parser.parseSearchResults($);
        page++;
        if (manga.length < 10)
            page = -1;
        return createPagedResults({
            results: manga,
            metadata: { page: page },
        });
    }
    async getHomePageSections(sectionCallback) {
        const request = createRequestObject({
            url: `${this.baseUrl}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        this.parser.parseHomeSections($, sectionCallback);
    }
    getCloudflareBypassRequest() {
        return createRequestObject({
            url: this.baseUrl,
            method: "GET",
            headers: {
                "user-agent": userAgent,
                referer: `${this.baseUrl}/`,
            },
        });
    }
    CloudFlareError(status) {
        if (status == 503) {
            throw new Error("CLOUDFLARE BYPASS ERROR:\nPlease go to Settings > Sources > <The name of this source> and press Cloudflare Bypass");
        }
    }
}
exports.FlameScans = FlameScans;

},{"./parser":49,"paperback-extensions-common":4}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
function getMangaThumbnail(mangaID) {
    return "https://scanmanga-vf.ws/uploads/manga/" + mangaID + ".jpg";
}
class Parser {
    parseMangaDetails($, mangaId) {
        let titles = [decodeHTMLEntity($(".widget-title").eq(0).text().trim())];
        const image = ($(".img-responsive").attr("src") ?? "").split("/")[0] == "https:"
            ? $(".img-responsive").attr("src") ?? ""
            : "https:" + $(".img-responsive").attr("src") ?? "";
        let status = paperback_extensions_common_1.MangaStatus.UNKNOWN, author = "", artist = "";
        // Details container
        const panel = $(".dl-horizontal");
        // Status
        switch ($('dt:contains("Statut")', panel).next().text().trim()) {
            case "En cours":
                status = paperback_extensions_common_1.MangaStatus.ONGOING;
                break;
            case "Terminé":
                status = paperback_extensions_common_1.MangaStatus.COMPLETED;
                break;
        }
        // Other titles
        let othersTitles = $('dt:contains("Appelé aussi")', panel).next().text().trim().split(",");
        for (let title of othersTitles) {
            titles.push(decodeHTMLEntity(title.trim()));
        }
        // Author & Artist
        const arrayTags = [];
        author =
            $('dt:contains("Auteur(s)")', panel).next().text().trim() != ""
                ? $('dt:contains("Auteur(s)")', panel).next().text().trim()
                : "";
        artist =
            $('dt:contains("Artist(s)")', panel).next().text().trim() != ""
                ? $('dt:contains("Artist(s)")', panel).next().text().trim()
                : "";
        // Set tags
        if ($('dt:contains("Catégories")', panel).length > 0) {
            const categories = $('dt:contains("Catégories")', panel).next().text().trim().split(",") ?? "";
            for (const category of categories) {
                const label = capitalizeFirstLetter(decodeHTMLEntity(category.trim()));
                const id = category.replace(" ", "-").toLowerCase().trim() ?? label;
                arrayTags.push({ id: id, label: label });
            }
        }
        // Tags
        if ($('dt:contains("Genres")', panel).length > 0) {
            const tags = $('dt:contains("Genres")', panel).next().text().trim().split(",") ?? "";
            for (const tag of tags) {
                const label = tag.replace(/(\r\n|\n|\r)/gm, "").trim();
                const id = tag
                    .replace(/(\r\n|\n|\r)/gm, "")
                    .trim()
                    .replace(" ", "-")
                    .toLowerCase() ?? label;
                if (!arrayTags.includes({ id: id, label: label })) {
                    arrayTags.push({ id: id, label: label });
                }
            }
        }
        const tagSections = [
            createTagSection({ id: "0", label: "genres", tags: arrayTags.map((x) => createTag(x)) }),
        ];
        const views = $('dt:contains("Vues")', panel).next().text().trim() || "";
        const rating = $('dt:contains("Note")', panel)
            .next()
            .children()
            .text()
            .trim()
            .match(/([+-]?([0-9]*[.])?[0-9]+)\/5/g)[0]
            ?.split("/")[0] || "";
        const desc = decodeHTMLEntity($(".well").children("p").text().trim());
        return createManga({
            id: mangaId,
            titles,
            image,
            views: Number(views) ?? 0,
            rating: Number(rating) ?? 0,
            status,
            artist,
            author,
            tags: tagSections,
            desc: this.encodeText(desc),
        });
    }
    parseChapters($, mangaId, _source) {
        const chapters = [];
        const arrChapters = $(".chapters li:not(.volume)").toArray();
        for (let chapter of arrChapters) {
            const id = $("a", chapter).attr("href") ?? "";
            const name = "Chapitre " + decodeHTMLEntity($("a", chapter).text().split(" ").pop() ?? "");
            const chapNum = Number(id.split("/").pop());
            const time = new Date($(".date-chapter-title-rtl", chapter).text() ?? "");
            chapters.push(createChapter({
                id,
                mangaId,
                name,
                langCode: paperback_extensions_common_1.LanguageCode.FRENCH,
                chapNum,
                time,
            }));
        }
        return chapters;
    }
    parseChapterDetails($, mangaId, id) {
        const pages = [];
        const chapterList = $("#all img").toArray();
        for (const obj of chapterList) {
            const imageUrl = $(obj).attr("data-src");
            if (!imageUrl)
                continue;
            pages.push(imageUrl.trim());
        }
        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        });
    }
    parseSearchResults($) {
        const results = [];
        for (const item of $(".media").toArray()) {
            let url = $("h5 a", item).attr("href")?.split("/")[4];
            let image = $("img", item).attr("src");
            let title = decodeHTMLEntity($("h5", item).text());
            let subtitle = "Chapitre " + decodeHTMLEntity($("a", item).eq(2).text().trim().replace(/#/g, ""));
            if (typeof url === "undefined" || typeof image === "undefined")
                continue;
            results.push(createMangaTile({
                id: url,
                image: image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }
        return results;
    }
    parseHomeSections($, sectionCallback) {
        const section1 = createHomeSection({
            id: "latest_popular_manga",
            title: "Dernier Manga Populaire Sorti",
            type: paperback_extensions_common_1.HomeSectionType.featured,
        });
        const section2 = createHomeSection({
            id: "latest_updates",
            title: "Dernier Manga Sorti",
            type: paperback_extensions_common_1.HomeSectionType.singleRowNormal,
        });
        const section3 = createHomeSection({
            id: "top_manga",
            title: "Top MANGA",
            type: paperback_extensions_common_1.HomeSectionType.singleRowNormal,
        });
        const popularManga = [];
        const latestManga = [];
        const topManga = [];
        const arrPopular = $(".hot-thumbnails li").toArray();
        const arrLatest = $(".mangalist .manga-item").toArray();
        const arrTop = $(".panel.panel-success").eq(0).find("ul .list-group-item").toArray();
        for (const item of arrPopular) {
            let url = $("a", item).first().attr("href")?.split("/")[4];
            let image = getMangaThumbnail(url);
            let title = decodeHTMLEntity($(".manga-name a", item).first().text());
            let subtitle = decodeHTMLEntity($("p", item).text().trim());
            if (typeof url === "undefined" || typeof image === "undefined")
                continue;
            popularManga.push(createMangaTile({
                id: url,
                image: image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }
        section1.items = popularManga;
        sectionCallback(section1);
        for (const item of arrLatest) {
            let url = $("a", item).first().attr("href")?.split("/").pop();
            let image = getMangaThumbnail(url);
            let title = decodeHTMLEntity($("a", item).first().text());
            let subtitle = "Chapitre " +
                decodeHTMLEntity(($("a", item)
                    .eq(1)
                    .text()
                    .trim()
                    .match(/(\d)+[.]?(\d)*/gm) ?? "")[0]);
            if (typeof url === "undefined" || typeof image === "undefined")
                continue;
            latestManga.push(createMangaTile({
                id: url,
                image: image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }
        section2.items = latestManga;
        sectionCallback(section2);
        for (const item of arrTop) {
            let url = $("a", item).first().attr("href")?.split("/").pop();
            let image = $("img", item).attr("src");
            let title = decodeHTMLEntity($("strong", item).text());
            let subtitle = $(".media-body", item)
                .text()
                .split("\n")[2]
                .trim()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                .replace("# ", "");
            if (typeof url === "undefined" || typeof image === "undefined")
                continue;
            topManga.push(createMangaTile({
                id: url,
                image: image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }
        section3.items = topManga;
        sectionCallback(section3);
    }
    encodeText(str) {
        return str.replace(/&#([0-9]{1,4});/gi, function (_, numStr) {
            var num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
    }
}
exports.Parser = Parser;
function decodeHTMLEntity(str) {
    return str.replace(/&#(\d+);/g, function (_match, dec) {
        return String.fromCharCode(dec);
    });
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

},{"paperback-extensions-common":4}]},{},[48])(48)
});
