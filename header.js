
let mount = document.getElementById("header");

if (mount) {



    mount.innerHTML = [
        '<div class="site-header">',
        '    <div class="brand">Flashcards</div>',

        '  <nav>',
        '    <button class="menu-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle menu">☰</button>',
        '    <div id="nav-menu" class="nav-menu" hidden>',
        '      <a href="index.html" class="header-button">Home</a>',
        '      <a href="accounts.html" class="header-button">Accounts</a>',
        '      <a href="your-sets.html" class="header-button">Your Sets</a>',
        '    </div>',
        '  </nav>',
        '</div>'
    ].join("\n");

    const btn = mount.querySelector('.menu-toggle');
    const menu = mount.querySelector('#nav-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            if (menu.hasAttribute('hidden')) menu.removeAttribute('hidden');
            if (!isOpen) menu.setAttribute('hidden', '');
            btn.setAttribute('aria-expanded', String(isOpen));
        });

        // close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                menu.classList.remove('open');
                menu.setAttribute('hidden', '');
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        // ensure menu closes when switching to desktop size
        const onResize = () => {
            if (window.innerWidth >= 768 && menu.classList.contains('open')) {
                menu.classList.remove('open');
                menu.setAttribute('hidden', '');
                btn.setAttribute('aria-expanded', 'false');
            }
        };
        window.addEventListener('resize', onResize);
    }
};
