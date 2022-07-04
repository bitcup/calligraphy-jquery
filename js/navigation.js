jQuery(document).ready(function ($) {
    let pathname = window.location.pathname;
    let mokhtarActive = pathname.indexOf('mokhtar.html') !== -1 ? 'active' : '';
    let kamelActive = pathname.indexOf('kamel.html') !== -1 ? 'active' : '';
    let aboutActive = pathname.indexOf('about.html') !== -1 ? 'active' : '';
    let scriptsActive = pathname.indexOf('scripts.html') !== -1 ? 'active' : '';

    $('#site-nav').append(
        `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top text-center" style="background-color: #2c3e50 !important;">
            <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
                <a class="navbar-brand" href="index.html">
                    <img src="img/logo/ac-narrow.svg" height="40" class="d-inline-block align-top" alt="ArabicCalligraphy.com">
                    <img src="img/logo/farsi.svg" height="40" class="d-inline-block align-top" alt="ArabicCalligraphy.com">
                </a>
                <button class="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" 
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link ${mokhtarActive}" href="mokhtar.html">Mokhtar El-Baba</a>
                        <a class="nav-item nav-link ${kamelActive}" href="kamel.html">Kamel El-Baba</a>
                        <a class="nav-item nav-link ${scriptsActive}" href="scripts.html">Scripts</a>
                        <a class="nav-item nav-link ${aboutActive}" href="about.html">About</a>
                    </div>
                </div>
            </div>
        </nav>`
    );

    $('#sticky-footer').append(
        `<footer class="mt-auto py-3 my-4" style="background-color: #2c3e50 !important">
            <p class="text-center text-light small" style="margin: 0">Copyright &copy; 2004–${new Date().getFullYear()} ArabicCalligraphy.com</p>
        </footer>`
    )

    console.log("Finished nav");
})
