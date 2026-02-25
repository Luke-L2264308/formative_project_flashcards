(function () {
    let mount = document.getElementById("header");

    if (!mount) {
        return;
    }

    mount.innerHTML = [
        '<div class="site-header">',
        '    <h1>My Website</h1>',
        '    <nav>',
        '            <a href="index.html" class="header-button">Home</a>',
        '            <a href="accounts.html" class="header-button">Accounts</a>',
        '            <a href="contact.html" class="header-button">Contact</a>',
        '    </nav>',
        '</div>'
    ].join("\n");
})();