function getCardToAppend(content, artist) {
    if (content.type === 'ad') {
        return `<div class="card">
                    <div class="card-body">
                        <div class="ad250-center">
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                            <!-- ac-250x250 -->
                            <ins class="adsbygoogle" 
                                 style="display:inline-block;width:250px;height:250px" 
                                 data-ad-client="ca-pub-7871464065505465" 
                                 data-ad-slot="6128946052"></ins>
                            <script>
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            </script>
                        </div>
                    </div>
                </div>`;
    }

    let tagLinks = '';

    for (let j = 0; j < content.tags.length; j++) {
        let link = `<a href="${artist}.html?tag=${content.tags[j]}">${content.tags[j]}</a>`;
        tagLinks += link;
        if (j < (content.tags.length - 1)) {
            tagLinks += ', ';
        }
    }

    return `<div class="card">
                <img src="img/${artist}/${content.image}" loading="lazy" class="card-img-top" alt="${content.title}">
                <div class="card-body">
                    <h5 class="card-title">${content.title}</h5>
                    <p class="card-text">${tagLinks}</p>
                </div>
            </div>`;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getApiEndpoint(artist, pageSize, page, tag) {
    let host='https://calligraphy-api.herokuapp.com';
    // let host='http://localhost:8080';
    let endpoint = `${host}/api/v1/artworks?artist=${artist}&pageSize=${pageSize}&page=${page}`;
    if (tag) {
        endpoint += `&tag=${tag}`;
    }
    return endpoint;
}

jQuery(document).ready(function ($) {

    let container = $('#gallery-cards');

    let pathname = window.location.pathname;
    let lastSlashIndex = pathname.lastIndexOf('/');
    let artist = pathname.substring(lastSlashIndex + 1).replace(".html", "");
    if (artist === '') {
        artist = 'index';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');

    if (tag) {
        $('#tag').append(`Showing '${tag}' artwork <a class="btn btn-primary btn-sm" href="${artist}.html">Show All</a>`);
    }

    let reachedLAstPage = false;
    let apiPageSize = 10;

    $.get(getApiEndpoint(artist, apiPageSize, 0, tag), function (json) {
        console.log(JSON.stringify(json))
        // inject ad content marker in the json data
        let adIndex = randomIntFromInterval(0, 3);
        // json.splice(adIndex, 0, {"type": "ad"});
        // console.log(json);

        for (let i = 0; i < json.length; i++) {
            if (!tag || json[i].tags.includes(tag)) {
                container.append(getCardToAppend(json[i], artist));
            }
        }

        let $gridContainer = $('.grid');

        // setup masonry
        const $grid = $gridContainer.masonry({
            itemSelector: '.card',
            // justify within parent div (row)
            fitWidth: true,
            // no transition
            transitionDuration: '0',
        });
        let masonryComponent = $grid.data('masonry');
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });

        // setup infinite scroll
        $grid.infiniteScroll({
            path: function () {
                if (!reachedLAstPage) {
                    return getApiEndpoint(artist, apiPageSize, this.pageIndex, tag);
                }
            },
            responseBody: 'json',
            outlayer: masonryComponent,
            history: false,
            checkLastPage: true,
            debug: true,
        });

        let infScroll = $gridContainer.data('infiniteScroll');

        $grid.on('load.infiniteScroll', function (event, body, path, response) {
            // console.log(`Loaded: ${path}`,
            //     `Status: ${response.status}`,
            //     `Current page: ${infScroll.pageIndex}`,
            //     `${infScroll.loadCount} pages loaded`,
            // );
            reachedLAstPage = body.length < apiPageSize;
            let itemsHTML = '';
            for (let i = 0; i < body.length; i++) {
                itemsHTML = itemsHTML + getCardToAppend(body[i], artist);
            }
            // convert HTML String into elements and append to masonry
            let $items = $(itemsHTML);
            $items.imagesLoaded(function () {
                $grid.append($items).masonry('appended', $items);
            })
        });

        console.log("gallery ready!");
    });


})
