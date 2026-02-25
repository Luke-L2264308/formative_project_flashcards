(function () {
    let mount = document.getElementById("header");

    if (!mount) {
        return;
    }

    mount.innerHTML = [
        '<div class="site-header">',
        
        '    <nav>',
        '            Flashcards',
        '            <a href="index.html" class="header-button">Home</a>',
        '            <a href="accounts.html" class="header-button">Accounts</a>',
        '            <a href="your-sets.html" class="header-button">Your Sets</a>',
        '    </nav>',
        '</div>'
    ].join("\n");
})();