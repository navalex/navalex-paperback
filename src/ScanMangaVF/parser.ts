import {
    Chapter,
    ChapterDetails,
    HomeSection,
    HomeSectionType,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    Tag,
    TagSection,
} from "paperback-extensions-common";

function getMangaThumbnail(mangaID: string | undefined) {
    return "https://scanmanga-vf.ws/uploads/manga/" + mangaID + ".jpg";
}

export class Parser {
    parseMangaDetails($: any, mangaId: string): Manga {
        let titles = [decodeHTMLEntity($(".widget-title").eq(0).text().trim())];
        const image =
            ($(".img-responsive").attr("src") ?? "").split("/")[0] == "https:"
                ? $(".img-responsive").attr("src") ?? ""
                : "https:" + $(".img-responsive").attr("src") ?? "";
        let status = MangaStatus.UNKNOWN,
            author = "",
            artist = "";

        // Details container
        const panel = $(".dl-horizontal");

        // Status
        switch ($('dt:contains("Statut")', panel).next().text().trim()) {
            case "En cours":
                status = MangaStatus.ONGOING;
                break;
            case "Terminé":
                status = MangaStatus.COMPLETED;
                break;
        }

        // Other titles
        let othersTitles = $('dt:contains("Appelé aussi")', panel).next().text().trim().split(",");
        for (let title of othersTitles) {
            titles.push(decodeHTMLEntity(title.trim()));
        }

        // Author & Artist
        const arrayTags: Tag[] = [];
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
                const id =
                    tag
                        .replace(/(\r\n|\n|\r)/gm, "")
                        .trim()
                        .replace(" ", "-")
                        .toLowerCase() ?? label;

                if (!arrayTags.includes({ id: id, label: label })) {
                    arrayTags.push({ id: id, label: label });
                }
            }
        }

        const tagSections: TagSection[] = [
            createTagSection({ id: "0", label: "genres", tags: arrayTags.map((x) => createTag(x)) }),
        ];

        const views = $('dt:contains("Vues")', panel).next().text().trim() || "";
        const rating =
            $('dt:contains("Note")', panel)
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

    parseChapters($: any, mangaId: string, _source: any): Chapter[] {
        const chapters: Chapter[] = [];
        const arrChapters = $(".chapters li:not(.volume)").toArray();

        for (let chapter of arrChapters) {
            const id = $("a", chapter).attr("href") ?? "";
            const name = "Chapitre " + decodeHTMLEntity($("a", chapter).text().split(" ").pop() ?? "");
            const chapNum = Number(id.split("/").pop());
            const time = new Date($(".date-chapter-title-rtl", chapter).text() ?? "");

            chapters.push(
                createChapter({
                    id,
                    mangaId,
                    name,
                    langCode: LanguageCode.FRENCH,
                    chapNum,
                    time,
                })
            );
        }

        return chapters;
    }

    parseChapterDetails($: any, mangaId: string, id: string): ChapterDetails {
        const pages: string[] = [];

        const chapterList = $("#all img").toArray();
        for (const obj of chapterList) {
            const imageUrl = $(obj).attr("data-src");
            if (!imageUrl) continue;
            pages.push(imageUrl.trim());
        }

        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        });
    }

    parseSearchResults($: any): MangaTile[] {
        const results: MangaTile[] = [];

        for (const item of $(".media").toArray()) {
            let url = $("h5 a", item).attr("href")?.split("/")[4];
            let image = $("img", item).attr("src");
            let title = decodeHTMLEntity($("h5", item).text());
            let subtitle = "Chapitre " + decodeHTMLEntity($("a", item).eq(2).text().trim().replace(/#/g, ""));

            if (typeof url === "undefined" || typeof image === "undefined") continue;

            results.push(
                createMangaTile({
                    id: url,
                    image: image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }
        return results;
    }

    parseHomeSections($: any, sectionCallback: (section: HomeSection) => void): void {
        const section1 = createHomeSection({
            id: "latest_popular_manga",
            title: "Dernier Manga Populaire Sorti",
            type: HomeSectionType.featured,
        });
        const section2 = createHomeSection({
            id: "latest_updates",
            title: "Dernier Manga Sorti",
            type: HomeSectionType.singleRowNormal,
        });
        const section3 = createHomeSection({
            id: "top_manga",
            title: "Top MANGA",
            type: HomeSectionType.singleRowNormal,
        });

        const popularManga: MangaTile[] = [];
        const latestManga: MangaTile[] = [];
        const topManga: MangaTile[] = [];

        const arrPopular = $(".hot-thumbnails li").toArray();
        const arrLatest = $(".mangalist .manga-item").toArray();
        const arrTop = $(".panel.panel-success").eq(0).find("ul .list-group-item").toArray();

        for (const item of arrPopular) {
            let url = $("a", item).first().attr("href")?.split("/")[4];
            let image = getMangaThumbnail(url);
            let title = decodeHTMLEntity($(".manga-name a", item).first().text());
            let subtitle = decodeHTMLEntity($("p", item).text().trim());

            if (typeof url === "undefined" || typeof image === "undefined") continue;

            popularManga.push(
                createMangaTile({
                    id: url,
                    image: image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }
        section1.items = popularManga;
        sectionCallback(section1);

        for (const item of arrLatest) {
            let url = $("a", item).first().attr("href")?.split("/").pop();
            let image = getMangaThumbnail(url);
            let title = decodeHTMLEntity($("a", item).first().text());
            let subtitle =
                "Chapitre " +
                decodeHTMLEntity(
                    ($("a", item)
                        .eq(1)
                        .text()
                        .trim()
                        .match(/(\d)+[.]?(\d)*/gm) ?? "")[0]
                );

            if (typeof url === "undefined" || typeof image === "undefined") continue;

            latestManga.push(
                createMangaTile({
                    id: url,
                    image: image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
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

            if (typeof url === "undefined" || typeof image === "undefined") continue;

            topManga.push(
                createMangaTile({
                    id: url,
                    image: image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }
        section3.items = topManga;
        sectionCallback(section3);
    }

    encodeText(str: string) {
        return str.replace(/&#([0-9]{1,4});/gi, function (_, numStr) {
            var num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
    }
}

function decodeHTMLEntity(str: string) {
    return str.replace(/&#(\d+);/g, function (_match, dec) {
        return String.fromCharCode(dec);
    });
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
