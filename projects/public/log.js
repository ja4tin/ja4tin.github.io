!function() {
  if (window.console && window.console.log) {
    const log = (...args) => setTimeout(console.log.bind(console, ...args));

    // Brand Info
    log(
      "\n %c The Page %c https://ja4tin.com \n",
      "color:#fff;background:#000;padding:5px 0;border-radius:.5rem 0 0 .5rem;",
      "background: #efefef;color:#333;padding:5px 0 5px;border-radius:0 .5rem .5rem 0;text-decoration:none;"
    );

    // Performance
    const loadTime = (Math.round(100 * performance.now()) / 100 / 1e3).toFixed(2);
    log(
      `%cPage loaded in ${loadTime}s`,
      "background: #fff;color: #333;text-shadow: 0 0 2px #eee; margin-top: 5px;"
    );

    // Welcome Message
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    log(`%c${greeting}, Welcome to my world.`, "margin-top: 10px; font-style: italic; color: #666;");
  }
}();
