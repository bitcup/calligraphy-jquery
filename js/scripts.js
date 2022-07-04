function appendCard(container, content) {
    if (content.type === 'ad') {
        let cardHtml =
            `<div class="card">
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

        container.append(cardHtml)
    }

    else {
        let cardHtml = `<div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${content.title}</h5>
                                <p class="card-text">${content.body}</p>
                                <img src="img/${content.imgSrc}" loading="lazy" class="card-img-top" alt="${content.imgSrc}">
                                <p></p>
                                <a class="btn btn-primary btn-sm" href="${content.url}">${content.urlText}</a>
                            </div>
                        </div>`;

        container.append(cardHtml)
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

jQuery(document).ready(function ($) {

    let container = $('#gallery-cards');

    $.getJSON("data/scripts.json", function (json) {

        // inject ad content marker in the json data
        let adIndex = randomIntFromInterval(0, 1);
        // json.content.splice(adIndex, 0, {"type": "ad"});
        // console.log(json);

        for (let i = 0; i < json.content.length; i++) {
            appendCard(container, json.content[i])
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

    });

})
