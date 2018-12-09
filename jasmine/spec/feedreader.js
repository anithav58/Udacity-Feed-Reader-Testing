/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
	(function() {
		/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
		describe('RSS Feeds', function() {
			/* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
			it('are defined', () => {
				expect(allFeeds).toBeDefined();
				expect(allFeeds.length).not.toBe(0);
			});

			it('contains the url property', () => {
				allFeeds.forEach(feed => {
					expect(feed.url).toBeDefined();
					expect(feed.url.length).not.toBe(0);
				});
			});

			it('contains the name property', () => {
				allFeeds.forEach(feed => {
					expect(feed.name).toBeDefined();
					expect(feed.name.length).not.toBe(0);
				});
			});
		});

		describe('The menu', () => {
			it('menu element is hidden by default', () => {
				expect($('body').hasClass('menu-hidden')).toBe(true);
			});

			it('menu changes visibility', () => {
				let $menuIcon = $('.menu-icon-link');

				expect($menuIcon.length).toBe(1);
				expect($('body').hasClass('menu-hidden')).toBe(true);
				$menuIcon.trigger('click');
				expect($('body').hasClass('menu-hidden')).toBe(false);
				$menuIcon.trigger('click');
			});
		});

		describe('Initial Entries', () => {
			beforeEach(done => {
				loadFeed(0, () => {
					done();
				});
			});

			it('has entries', done => {
				expect($('.feed .entry').length > 0).toBe(true);
				done();
			});
		});

		describe('New Feed Selection', () => {
			let initialResult;

			beforeEach(done => {
				loadFeed(0, result => {
					initialResult = result;
					done();
				});
			});

			describe('Update News Feed Selection', () => {
				let currentResult;
				beforeEach(done => {
					loadFeed(1, function(result) {
						currentResult = result;
						done();
					});
				});

				it('has content for the first feed', done => {
					expect(initialResult).toBeDefined();
					expect(currentResult).toBeDefined();
					expect(initialResult.feed.link === currentResult.feed.link).toBe(false);
					expect(initialResult.feed.title === currentResult.feed.title).toBe(false);
					expect(initialResult.feed.feedUrl === currentResult.feed.feedUrl).toBe(false);
					done();
				});
			});
		});
	})()
);
