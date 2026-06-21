(function () {
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));
  var docs = Array.prototype.slice.call(document.querySelectorAll('.doc'));
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('backdrop');
  var menuToggle = document.getElementById('menuToggle');
  var search = document.getElementById('search');
  var main = document.getElementById('main');

  function show(id) {
    var found = false;
    docs.forEach(function (d) {
      var on = d.id === id;
      d.classList.toggle('active', on);
      if (on) found = true;
    });
    navItems.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-id') === id);
    });
    if (found) {
      if (main) main.scrollTop = 0;
      window.scrollTo(0, 0);
    }
    closeSidebar();
    return found;
  }

  function routeFromHash() {
    var id = (location.hash || '').replace(/^#/, '');
    if (!id || !show(id)) show(FIRST_ID);
  }

  navItems.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('data-id');
      if (location.hash === '#' + id) show(id);
      else location.hash = id;
    });
  });

  window.addEventListener('hashchange', routeFromHash);

  // ---- search filter ----
  function runSearch() {
    var q = (search.value || '').trim().toLowerCase();
    navItems.forEach(function (a) {
      var hay = a.textContent.toLowerCase();
      a.classList.toggle('hidden', q !== '' && hay.indexOf(q) === -1);
    });
    document.querySelectorAll('.nav-group').forEach(function (g) {
      var anyVisible = g.querySelector('.nav-item:not(.hidden)');
      g.classList.toggle('hidden', !anyVisible);
    });
  }
  if (search) {
    search.addEventListener('input', runSearch);
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = document.querySelector('.nav-item:not(.hidden)');
        if (first) { location.hash = first.getAttribute('data-id'); }
      }
      if (e.key === 'Escape') { search.value = ''; runSearch(); }
    });
  }

  // ---- mobile sidebar ----
  function openSidebar() { sidebar.classList.add('open'); backdrop.classList.add('show'); }
  function closeSidebar() { sidebar.classList.remove('open'); backdrop.classList.remove('show'); }
  if (menuToggle) menuToggle.addEventListener('click', openSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  routeFromHash();
})();
