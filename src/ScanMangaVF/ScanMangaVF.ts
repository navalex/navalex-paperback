import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    PagedResults,
    SearchRequest,
    Request,
    SourceInfo,
    SourceManga,
    BadgeColor,
    SearchResultsProviding,
    MangaProviding,
    ChapterProviding,
    HomePageSectionsProviding,
} from "@paperback/types";
import { Parser } from "./parser";

const SOURCE_DOMAIN = "https://scanmanga-vf.ws";

export const ScanMangaVFInfo: SourceInfo = {
    version: "1.0.0",
    name: "ScanManga-VF",
    description: "Extension that pulls manga from ScanManga-VF.ws website.",
    author: "Navalex",
    authorWebsite: "http://github.com/navalex",
    icon: "navalex.png",
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: SOURCE_DOMAIN,
    sourceTags: [
        {
            text: "French",
            type: BadgeColor.GREY,
        },
        {
            text: "Cloudflare",
            type: BadgeColor.RED,
        },
    ],
};
const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44";
export class ScanMangaVF
    implements MangaProviding, ChapterProviding, HomePageSectionsProviding, SearchResultsProviding
{
    constructor(private cheerio: CheerioAPI) {}
    baseUrl = SOURCE_DOMAIN;
    requestManager = App.createRequestManager({
        requestsPerSecond: 3,
        requestTimeout: 8000,
    });
    RETRY = 5;
    parser = new Parser();

    getMangaShareUrl(mangaId: string): string {
        return `${this.baseUrl}/manga/${mangaId}`;
    }

    getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        throw new Error("Method not implemented.");
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const request = App.createRequest({
            url: `${this.baseUrl}/manga/${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseMangaDetails($, mangaId);
    }
    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = App.createRequest({
            url: `${this.baseUrl}/manga/${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapters($, mangaId, this);
    }
    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = App.createRequest({
            url: `${chapterId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapterDetails($, mangaId, chapterId);
    }
    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let page = metadata?.page ?? 1;
        if (page == -1) return App.createPagedResults({ results: [], metadata: { page: -1 } });
        const search = query.title?.replace(/ /g, "+").replace(/[’'´]/g, "%27") ?? "";
        const param = `filterList?page=${page}&tag=&alpha=${search}&sortBy=name&asc=true`;
        const request = App.createRequest({
            url: `${this.baseUrl}`,
            method: "GET",
            param,
        });
        const data = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(data.status);
        const $ = this.cheerio.load(data.data);
        const manga = this.parser.parseSearchResults($);
        page++;
        if (manga.length < 10) page = -1;
        return App.createPagedResults({
            results: manga,
            metadata: { page: page },
        });
    }
    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const request = App.createRequest({
            url: `${this.baseUrl}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        this.CloudFlareError(response.status);
        const $ = this.cheerio.load(response.data);
        this.parser.parseHomeSections($, sectionCallback);
    }
    getCloudflareBypassRequest(): Request {
        return App.createRequest({
            url: this.baseUrl,
            method: "GET",
            headers: {
                "user-agent": userAgent,
                referer: `${this.baseUrl}/`,
            },
        });
    }
    CloudFlareError(status: any) {
        if (status == 503) {
            throw new Error(
                "CLOUDFLARE BYPASS ERROR:\nPlease go to Settings > Sources > <The name of this source> and press Cloudflare Bypass"
            );
        }
    }
}
