// Wait for the document to load before running the script 
(function ($) {

    // We use some Javascript and the URL #fragment to hide/show different parts of the page
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
    $(window).on('load hashchange', function () {

        // First hide all content regions, then show the content-region specified in the URL hash 
        // (or if no hash URL is found, default to first menu item)
        $('.content-region').hide();

        // Remove any active classes on the main-menu
        $('.main-menu a').removeClass('active');
        var region = location.hash.toString() || $('.main-menu a:first').attr('href');

        // Now show the region specified in the URL hash
        $(region).show();

        // Highlight the menu link associated with this region by adding the .active CSS class
        $('.main-menu a[href="' + region + '"]').addClass('active');

        // Alternate method: Use AJAX to load the contents of an external file into a div based on URL fragment
        // This will extract the region name from URL hash, and then load [region].html into the main #content div
        // var region = location.hash.toString() || '#first';
        // $('#content').load(region.slice(1) + '.html')

        loadArticles()
    });

})(jQuery);

const GENERIC_LINKS = {
    cypressNewsletter: 'https://go.cypress.io/cypress-newsletter'
};

const COMMUNITY_FEATURES = [
    {
        title: 'Once upon a time a cy.session()…',
        articleUrl: 'https://dev.to/sebastianclavijo/once-upon-a-time-a-cysession-1880',
        outlets: [
            { name: '📽️ Test Guild News Show (April 8, 2024)', url: 'https://www.linkedin.com/posts/joecolantonio_devsecops-automationtesting-softwaretesting-activity-7183134856497786880-WKZW/' },
            { name: '📰 TestGuild Automation in DevSecOps News (April 2024)', url: 'https://www.linkedin.com/pulse/first-ai-software-tester-you-replaced-more-joe-colantonio-r7nxe/' }
        ]
    },
    {
        title: 'What do a Cypress fixture, a cheese pizza, and the number φ (Phi) have in common?',
        articleUrl: 'https://dev.to/sebastianclavijo/what-do-the-number-ph-phi-a-cheese-pizza-pie-and-a-cypress-fixture-have-in-common-3c3c',
        outlets: []
    },
    {
        title: 'And the nominees for “Best Cypress Helper” are: Utility Function, Custom Command, Custom Query, Task, and External Plugin',
        articleUrl: 'https://dev.to/sebastianclavijo/and-the-nominees-for-best-cypress-helper-are-utility-function-custom-command-custom-query-task-and-external-plugin-3bb5',
        outlets: [
            { name: '📰 Cypress.io Newsletter (April 2024)', url: GENERIC_LINKS.cypressNewsletter },
            { name: '📰 Software Testing Weekly Issue #217 (April 2024)', url: 'https://softwaretestingweekly.com/issues/217' }
        ]
    },
    {
        title: 'The most abused Cypress command ever: cy.wait(TIME)',
        articleUrl: 'https://dev.to/sebastianclavijo/the-most-abused-cypress-command-ever-cywaittime-15e0',
        outlets: [
            { name: '📰 Software Testing Notes Issue #141 (Aug 2024)', url: 'https://softwaretestingnotes.substack.com/p/issue-141-software-testing-notes' },
            { name: '📰 Coding Jag by LamdaTest Issue #206 (Aug 2024)', url: 'https://www.linkedin.com/pulse/why-you-asking-me-test-lambdatest-ccuxe/?trackingId=yOl20%2B3XQ4mxC8OJJSIx2w%3D%3D' }
        ]
    },
    {
        title: 'The Quirky Guide to Crafting and Publishing Your Cypress npm Plugin',
        articleUrl: 'https://dev.to/sebastianclavijo/the-quirky-guide-to-crafting-and-publishing-your-cypress-npm-plugin-2pii',
        outlets: [
            { name: '📰 Cypress.io Newsletter (May 2024)', url: GENERIC_LINKS.cypressNewsletter },
            { name: '📰 Software Testing Weekly Issue #221 (May 2024)', url: 'https://softwaretestingweekly.com/issues/221' },
            { name: '📰 Cypress.io Newsletter (June 2024)', url: GENERIC_LINKS.cypressNewsletter },
            { name: '📰 QA Avenue Issue #18: Software Testing Insights (Aug 2024)', url: 'https://qaavenue.substack.com/p/issue-18-software-testing-insights' }
        ]
    },
    {
        title: 'CYPRESS-AJV-SCHEMA-VALIDATOR Plugin: The Brave Vigilante for Your API Contracts',
        articleUrl: 'https://dev.to/sebastianclavijo/cypress-ajv-schema-validator-plugin-the-brave-vigilante-for-your-api-contracts-5cfe',
        outlets: []
    },
    {
        title: 'WICK-A11Y Cypress Plugin: Your Unstoppable Ally for Smashing Accessibility Barriers, Cool as John Wick!',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-cypress-plugin-your-unstoppable-ally-for-smashing-accessibility-barriers-cool-as-john-wick-280a',
        outlets: [
            { name: '📰 Software Testing Notes Issue #141 (Aug 2024)', url: 'https://softwaretestingnotes.substack.com/p/issue-141-software-testing-notes' },
            { name: '📰 The Automation Insider Issue 14 Newsletter (Aug 27, 2024)', url: 'https://automationinsider.substack.com/p/the-automation-insider-issue-14?r=zfnsk&utm_campaign=post&utm_medium=web&triedRedirect=true' },
            { name: '📰 Software Testing Weekly Issue #235 (Sep 2024)', url: 'https://softwaretestingweekly.com/issues/235' }
        ]
    },
    {
        title: 'The transition from Product Manager to Software QA Engineer. Reinvent yourself! The Career Journey of Sebastian Clavijo',
        articleUrl: 'https://www.linkedin.com/pulse/qj10-transition-from-product-manager-qa-engineer-warnakulasooriya-xtcac/?trackingId=nDWkrydRSe%2B3gU8vWfU5Uw%3D%3D',
        outlets: [
            { name: '📰 Quality Insights Newsletter (Aug 2024)', url: 'https://www.linkedin.com/pulse/qj10-transition-from-product-manager-qa-engineer-warnakulasooriya-xtcac/?trackingId=%2FeDnqIiXT5eZHR1FqX5LAg%3D%3D' }
        ]
    },
    {
        title: 'WICK-A11Y "Chapter" 1.2.1 - Voice Support: The Accessibility Cypress Plugin that Talks More Than John Wick in His Movies',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-v121-voice-the-accessibility-cypress-plugin-that-talks-more-than-john-wick-in-his-movies-8c8',
        outlets: []
    },
    {
        title: 'Dynamic Tests in Cypress: To Loop or Not To Loop',
        articleUrl: 'https://dev.to/sebastianclavijo/dynamic-tests-in-cypress-to-loop-or-not-to-loop-2g22',
        outlets: [
            { name: '📰 Software Testing Weekly Issue #239 (Oct 2024)', url: 'https://softwaretestingweekly.com/issues/239' },
            { name: '📰 Software Testing Notes Issue #145 (Oct 2024)', url: 'https://softwaretestingnotes.substack.com/p/issue-145-software-testing-notes' },
            { name: '📰 Cypress News 2024 Part 3 (Oct 2024)', url: 'https://www.dlatesterow.pl/cypress-news-2024-cz-3/' }
        ]
    },
    {
        title: 'CYPRESS-AJV-SCHEMA-VALIDATOR v1.2.0: Boost Debugging Skills from Vigilante to Superhero with Advanced Schema Error Insights!',
        articleUrl: 'https://dev.to/sebastianclavijo/cypress-ajv-schema-validator-v120-boost-debugging-skills-from-vigilante-to-superhero-with-advanced-schema-error-insights-1hld',
        outlets: [
            { name: '📰 Software Testing Weekly Issue #241 (Oct 2024)', url: 'https://softwaretestingweekly.com/issues/241' }
        ]
    },
    {
        title: 'But How Much Abstraction is Still Okay in Cypress? To POM or Not To POM',
        articleUrl: 'https://dev.to/sebastianclavijo/but-how-much-abstraction-is-still-okay-in-cypress-to-pom-or-not-to-pom-511j',
        outlets: [
            { name: '📰 Software Testing Weekly Issue #242 (Oct 2024)', url: 'https://softwaretestingweekly.com/issues/242' },
            { name: '📰 Software Testing Notes Issue #147 (Oct 2024)', url: 'https://softwaretestingnotes.substack.com/p/issue-147-software-testing-notes?utm_source=share&utm_medium=android&r=434g0b&triedRedirect=true' },
            { name: '📰 QA Avenue Issue #27: Software Testing Insights (Nov 2024)', url: 'https://qaavenue.substack.com/p/issue-27-software-testing-insights' }
        ]
    },
    {
        title: "Unlocking the Mystery: Deciphering the Enigmatic Code of URL's Glob Patterns in cy.intercept()",
        articleUrl: 'https://dev.to/sebastianclavijo/unlocking-the-mystery-deciphering-the-enigmatic-code-of-urls-glob-patterns-in-cyintercept-3mgg',
        outlets: [
            { name: '📰 Critical Continuous Quality: MoT Weekly – Issue 492 (Nov 2024)', url: 'https://www.ministryoftesting.com/newsletter/critical-continuous-quality-mot-weekly-issue-492' }
        ]
    },
    {
        title: 'Behind the Words: Crafting My Career Transition Story from Product Manager to QA Engineer for Quality Insights Newsletter',
        articleUrl: 'https://dev.to/sebastianclavijo/behind-the-words-crafting-my-career-transition-story-from-product-manager-to-qa-engineer-for-quality-insights-newsletter-4dge',
        outlets: []
    },
    {
        title: 'WICK-A11Y VIDEO TUTORIAL: Mastering Accessibility Testing in Cypress',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-video-tutorial-mastering-accessibility-testing-in-cypress-3211',
        outlets: []
    },
    {
        title: 'CYPRESS-AJV-SCHEMA-VALIDATOR VIDEO TUTORIAL: Mastering API Schema Testing in Cypress',
        articleUrl: 'https://dev.to/sebastianclavijo/cypress-ajv-schema-validator-video-tutorial-mastering-api-schema-testing-in-cypress-78',
        outlets: []
    },
    {
        title: 'WICK-A11Y 1.4.0: Not Everything Needs to Fail a Test!',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-140-not-everything-needs-to-fail-a-test-1pe5',
        outlets: []
    },
    {
        title: 'My Top 19+1 Favorite Cypress Plugins for Testing with Wick-like Precision!',
        articleUrl: 'https://dev.to/sebastianclavijo/my-top-191-favorite-cypress-plugins-for-testing-with-wick-like-precision-3fhh',
        outlets: [
            { name: '📰 Software Testing Weekly Issue #259 (Feb 2025)', url: 'https://softwaretestingweekly.com/issues/259' },
            { name: "📰 How To Pick Cypress Plugins You Can Trust – Gleb Bahmutov's Article", url: 'https://glebbahmutov.com/blog/how-to-pick-cypress-plugins/' }
        ]
    },
    {
        title: 'The Test Drama (The Opening Salvo): Cypress vs Playwright Installation - The Good, The Bad, and the... Bug-ly!',
        articleUrl: 'https://dev.to/sebastianclavijo/the-test-drama-the-opening-salvo-cypress-vs-playwright-installation-the-good-the-bad-and-4hm6',
        outlets: [
            { name: '📰 Gateway to the MoTaverse: MoT Weekly – Issue 502 (Jan 2025)', url: 'https://www.linkedin.com/pulse/gateway-motaverse-mot-weekly-issue-502-ministry-of-testing-inl6e/' },
            { name: "📰 Cypress Tips January 2025 – Gleb Bahmutov's Newsletter", url: 'https://cypresstips.substack.com/p/cypress-tips-january-2025' },
            { name: '📰 Trending in Testing Weekly Newsletter #51 (Jan 2025)', url: 'https://trendingintesting.com/trending-in-testing-weekly-newsletter-51/' },
            { name: '📰 Software Testing Weekly Issue #258 (Feb 2025)', url: 'https://softwaretestingweekly.com/issues/258?#start' }
        ]
    },
    {
        title: 'The Test Drama: Cypress vs Playwright - Control Your Tests (Part 2): TAGS & TEST FILTERS',
        articleUrl: 'https://dev.to/sebastianclavijo/the-test-drama-cypress-vs-playwright-control-your-tests-part-2-tags-test-filters-3kh2',
        outlets: [
            { name: '📰 Software Testing Weekly Issue #269 (May 2025)', url: 'https://softwaretestingweekly.com/issues/269' },
            { name: '📰 Coding Jag by LamdaTest Issue #243 (May 2025)', url: 'https://www.linkedin.com/pulse/your-website-truly-accessible-find-out-now-lambdatest-s70yf/' },
            { name: "📰 Cypress Tips April 2025 – Gleb Bahmutov's Newsletter", url: 'https://cypresstips.substack.com/p/cypress-tips-april-2025' }
        ]
    },
    {
        title: "The Async Nature of Cypress: Don't Mess with the Timelines in Your Cypress Tests 'Dual-Verse'",
        articleUrl: 'https://dev.to/sebastianclavijo/the-async-nature-of-cypress-dont-mess-with-the-timelines-in-your-cypress-tests-dual-verse-3ehh',
        outlets: [
            { name: '📽️ Cypress.io official YouTube Channel - The Bug Bash: Episode 2 (May 13, 2025)', url: 'https://www.youtube.com/watch?v=zVrpZLStpco' },

            { name: '📰 Software Testing Notes Issue #170 (May 2025)', url: 'https://softwaretestingnotes.substack.com/p/issue-170-software-testing-notes' },
            { name: '📰 Software Testing Weekly Issue #270 (May 2025)', url: 'https://softwaretestingweekly.com/issues/270' }
        ]
    },
    {
        title: 'Meet the New CYPRESS-SCHEMA-VALIDATOR: When ZOD Joined Forces with AJV for the Ultimate Validation Duo!',
        articleUrl: 'https://dev.to/sebastianclavijo/meet-the-new-cypress-schema-validator-when-zod-joined-forces-with-ajv-for-the-ultimate-validation-2o73',
        outlets: [
            { name: '📽️ Test Guild News Show (Jun, 2025)', url: 'https://www.linkedin.com/posts/joecolantonio_devsecops-automationtesting-softwaretesting-activity-7337877625475919872-033I/' },

            { name: '📰 TestGuild Automation in DevSecOps Newsletter (Jun 2025)', url: 'https://www.linkedin.com/pulse/ai-generate-missing-playwright-tests-postman-more-joe-colantonio-gluie/' },
            { name: '📰 Software Testing Weekly Issue #275 (Jun 2025)', url: 'https://softwaretestingweekly.com/issues/275' },
            { name: '📰 Coding Jag by LamdaTest Issue #248 (Jun 2025)', url: 'https://www.linkedin.com/pulse/ai-writes-code-so-why-devs-slowing-down-lambdatest-ovpdf/' },
            { name: '📰 QA Avenue Issue #32: Software Testing Insights (Jun 2025)', url: 'https://qaavenue.substack.com/p/issue-32-software-testing-insights' },
            { name: '📰 Software Testing Notes Issue #182 (Aug 2025)', url: 'https://softwaretestingnotes.substack.com/p/issue-182-software-testing-notes' }
        ]
    },
    {
        title: "The 'second' most abused (and misused) Cypress command ever: cy.contains()",
        articleUrl: 'https://dev.to/sebastianclavijo/the-second-most-abused-and-misused-cypress-command-ever-cycontains-126j',
        outlets: [
            { name: '📰 Cypress.io Newsletter July edition (Jul 2025)', url: 'https://go.cypress.io/cypress-newsletter-july-2025' },
            { name: '📰 Software Testing Weekly Issue #277 (Jul 2025)', url: 'https://softwaretestingweekly.com/issues/277' }
        ]
    },
    {
        title: 'WICK-A11Y v2.2.0 x CYPRESS v15: Parabellum for Axe-ssibility Barriers',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-v220-x-cypress-v15-parabellum-for-axe-essibility-barriers-2fam',
        outlets: [
            { name: '📰 q2bstudio.com - Parabellum para Barreras de Accesibilidad', url: 'https://www.q2bstudio.com/nuestro-blog/18096/parabellum-para-barreras-de-accesibilidad' }
        ]
    },
    {
        title: 'WICK-A11Y v2.3.0: A Dazzling New Report, WCAG 2.2 AAA, and More Goodies',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-v230-a-dazzling-new-report-wcag-22-aaa-and-more-goodies-hd0',
        outlets: [
            { name: '📰 Cypress.io Newsletter October edition (Oct 2025)', url: 'https://go.cypress.io/cypress-newsletter-october-2025' },
            { name: '📰 q2bstudio.com - WICK-A11Y v2.3.0: Informe deslumbrante, WCAG 2.2 AAA y más novedades', url: 'https://www.q2bstudio.com/nuestro-blog/21237/wick-a11y-v2-3-0-informe-deslumbrante-wcag-2-2-aaa-y-mas-novedades' }
        ]
    },
    {
        title: 'CYPRESS-FLAKY-TEST-AUDIT: thriving in the Cypress "Dual-Verse" for once!',
        articleUrl: 'https://dev.to/sebastianclavijo/cypress-flaky-testaudit-thriving-in-the-cypress-dual-verse-for-once-l4o',
        outlets: [
            { name: '📰 Software Testing Weekly issue #298 (Jan 2026)', url: 'https://softwaretestingweekly.com/issues/298' },
            { name: '📰 Cypress Tips January 2026 -  Gleb Bahmutov Newsletter', url: 'https://cypresstips.substack.com/p/cypress-tips-january-2026' },
            { name: '📰 Ministry of Testing - Cypress Content (Jan 2026)', url: 'https://www.ministryoftesting.com/software-testing-tools/cypress' }
        ]
    },
    {
        title: 'Cypress.Promise.all() and cy.mapChain(): Two Hidden Gems for Cypress You Won’t Let Go Once You Try Them',
        articleUrl: 'https://dev.to/sebastianclavijo/cypresspromiseall-and-cymapchain-two-hidden-gems-for-cypress-you-wont-let-go-once-you-try-20mj',
        outlets: [
            { name: '📰 Software Testing Notes Issue #201 (Jan 2026)', url: 'https://softwaretestingnotes.substack.com/p/issue-201-software-testing-notes' },
            { name: '📰 Cypress Tips January 2026 -  Gleb Bahmutov Newsletter', url: 'https://cypresstips.substack.com/p/cypress-tips-january-2026' },
            { name: '📰 Software Testing Weekly issue #301 (Feb 2026)', url: 'https://softwaretestingweekly.com/issues/301' },
        ]
    },
    {
        title: 'WICK-A11Y v3.0.1: Cypress v16 Ready - Upgrade Without Fear (Fully Backward Compatible)',
        articleUrl: 'https://dev.to/sebastianclavijo/wick-a11y-v301-cypress-v16-ready-upgrade-without-fear-fully-backward-compatible-77m',
        outlets: [
            { name: '📽️ Test Guild News Show (Mar 2025)', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7439410355727982592/' },

            { name: '📰 TestGuild Automation in DevSecOps Newsletter (Mar 2025)', url: 'https://www.linkedin.com/pulse/automation-debt-ai-validation-crisis-cypress-trust-gate-colantonio-ouate' }
        ]
    }
];

const NON_LINK_NEWSLETTERS = new Set([
    'Cypress.io Newsletter (April 26, 2024)',
    'Cypress.io Newsletter (May 29, 2024)',
    'Cypress.io Newsletter (June 27, 2024)'
]);

const PLUGIN_FEATURE_GROUPS = [
    {
        name: 'Cypress',
        items: [
            {
                plugin: 'wick-a11y',
                repoUrl: 'https://github.com/sclavijosuero/wick-a11y',
                features: [
                    { name: '🌐 W3C Org - Official Web Accessibility Evaluation Tools List', url: 'https://www.w3.org/WAI/test-evaluate/tools/list/' },
                    { name: '🌐 Cypress.io Documentation - Accessibility Testing', url: 'https://docs.cypress.io/app/guides/accessibility-testing?ref=cypress-io.ghost.io' },
                    { name: '🌐 Cypress.io Product Blog - Open Source Accessibility Plugins in Cypress', url: 'https://www.cypress.io/blog/open-source-accessibility-plugins-in-cypress' },
                    { name: '🌐 Cypress Conference’25 - Miloš Jovanović session: Cross-Browser Consistency: Mitigating Testing Discrepancies with Cypress', url: 'https://www.youtube.com/watch?v=8vmFDl0bfnY' },
                    { name: '🌐 testdev.tools - Wick A11y', url: 'https://testdev.tools/wick-a11y/' },
                    { name: '🌐 TestGuild - Testing Tool Matcher', url: 'https://testguild.com/tools/cypress' },
                    { name: '🌐 digitala11y.com - Open Source Accessibility Testing Tools Roundup', url: 'https://www.digitala11y.com/open-source-accessibility-tools/' },

                    { name: '⚖️ myparto.com - Accessibility Statement', url: 'https://www.myparto.com/en/content/AccessibilityStatement.html' },
                    { name: '⚖️ ws-autoteile.com - Accessibility Statement', url: 'https://www.ws-autoteile.com/en/content/AccessibilityStatement.html' },
                    { name: '⚖️ autoteileservice24.de - Accessibility Statement', url: 'https://www.autoteileservice24.de/en/content/AccessibilityStatement.html' },


                    { name: '📽️ Test Guild News Show (Jul 2024)', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7216114421041934336/' },
                    { name: '📽️ Test Guild News Show (Sep 2024) - Voice Feature', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7246557474520989696/' },
                    { name: '📽️ Test Guild News Show (Nov 2024)', url: 'https://www.linkedin.com/posts/joecolantonio_how-do-you-automate-across-multiple-systems-activity-7261785050751340545-8CM6?utm_source=share&utm_medium=member_desktop' },
                    { name: "📽️ Gleb Bahmutov - Check Page Accessibility Using wick-a11y Plugin (Oct 7, 2025)", url: 'https://www.youtube.com/watch?v=G1tpXv0hv0s' },
                    { name: "📽️ Joan Esquivel Montero - Cypress Accessibility Testing powered by WICK-A11Y", url: 'https://www.youtube.com/watch?v=LVxyJMW6EJw' },
                    { name: '📽️ Joan Esquivel Montero - Pruebas Automatizadas de Accesibilidad con Cypress + WickA11y', url: 'https://www.youtube.com/watch?v=96Sz2QCXE7I' },
                    { name: '📽️ Ioan Solderea - European Accessibility Act 2025: Compliance Deadline Nears', url: 'https://www.youtube.com/watch?v=joP3TNdLjF8' },
                    { name: '📽️ Ioan Solderea - Wick A11y – Cypress Plugin for Automated Accessibility Checks', url: 'https://www.youtube.com/watch?v=tqeZTopcy50' },
                    { name: "📽️ Peter Michael Souza Jr - 20 Things I'd Tell Myself If I Was Learning Cypress for the First Time - Video & Article", url: 'https://www.petermsouzajr.com/blog/20-things-id-tell-myself-if-i-was-learning-cypress-for-the-first-time' },
                    { name: '📽️ Test Guild News Show (Mar 2025)', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7439410355727982592/' },

                    { name: '📰 TestGuild Automation in DevSecOps Newsletter (Jul 2024)', url: 'https://www.linkedin.com/pulse/ai-etl-testing-shift-left-dead-cypress-a11y-more-joe-colantonio-f6l0e/' },
                    { name: '📰 The Automation Insider Issue 13 Newsletter', url: 'https://automationinsider.substack.com/p/the-automation-insider-issue-13?r=zfnsk&utm_campaign=post&utm_medium=web&triedRedirect=true' },
                    { name: "📰 Abigail Armijo - Tools for Accessibility Testing", url: 'https://substack.com/home/post/p-142159238' },
                    { name: '📰 Cypress Tips September 2024 – Gleb Bahmutov Newsletter', url: 'https://cypresstips.substack.com/p/cypress-tips-september-2024' },
                    { name: '📰 TestGuild Automation in DevSecOps Newsletter (Oct 2024)', url: 'https://www.linkedin.com/pulse/test-accessibility-event-playwright-github-actions-llm-joe-colantonio-ippqe/' },
                    { name: "📰 James Wadley - Let's talk about wick-a11y…", url: 'https://dev.to/w4dd325/lets-talk-about-wick-a11y-1afa' },
                    { name: '📰 A11y-evaluation-tools Sheet', url: 'https://docs.google.com/spreadsheets/d/10CTezA0iDdaWggaqxuHawj-5u8YXdZeWBJsIkuvJ364/edit?gid=347324347#gid=347324347' },
                    { name: '📰 TestGuild Automation in DevSecOps Newsletter (Nov 2024)', url: 'https://www.linkedin.com/pulse/digital-testing-al-driven-mobile-attacks-plugins-more-joe-colantonio-lpume' },
                    { name: '📰 Cypress Tips December 2024 – Gleb Bahmutov Newsletter', url: 'https://cypresstips.substack.com/p/cypress-tips-december-2024' },
                    { name: '📰 Ravindre Ramjiawan - Accessibility tools', url: 'https://techhub.iodigital.com/articles/accessibility-tools' },
                    { name: '📰 talent500.com - Exploring Open Source Accessibility Plugins in Cypress', url: 'https://talent500.com/blog/open-source-accessibility-plugins-cypress/' },
                    { name: "📰 Fatih Soysal - WICK-A11Y 1.4.0: Not Everything Needs to Fail the Test!", url: 'https://fatihsoysal.com/blog/wick-a11y-1-4-0-her-seyin-testi-basarisiz-olmasina-gerek-yok/' },
                    { name: '📰 testdriver.ai - How to Effectively Use Accessibility Testing Tools in Your Development Process', url: 'https://testdriver.ai/articles/how-to-effectively-use-accessibility-testing-tools-in-your-development-process' },
                    { name: '📰 Software Testing Notes Issue #157', url: 'https://softwaretestingnotes.substack.com/p/issue-157-software-testing-notes' },
                    { name: "📰 Ioan Solderea - Understanding the European Accessibility Act 2025: Compliance is Key", url: 'https://dev.to/cypress/understanding-the-european-accessibility-act-2025-compliance-is-key-3fif' },
                    { name: '📰 Ádám Szentiványi - Comparison of Accessibility Tools', url: 'https://prezi.com/p/aklj2f6-bviu/comparison-of-accessibility-tools/' },
                    { name: '📰 Vast Green: The Accessibility Improvement Act - BFSG - Conclusion', url: 'https://vast-green.com/bfsg-abschluss/' },
                    { name: '📰 TestGuild Automation in DevSecOps Newsletter (Mar 2025)', url: 'https://www.linkedin.com/pulse/automation-debt-ai-validation-crisis-cypress-trust-gate-colantonio-ouate' },

                    { name: "✏️ Gleb Bahmutov - Testing The Swag Store Course (Bonus 74: Check accessibility issues)", url: 'https://cypress.tips/courses/swag-store/lessons/bonus74' },
                    { name: "✏️ Gleb Bahmutov - TDD Calculator Course (Lesson e6 & e7: Catch accessibility issues)", url: 'https://cypress.tips/courses/tdd-calculator/lessons/e6' },
                    { name: "✏️ Alexander Thalhammer - Accessibility in Angular Workshop", url: 'https://lxt.dev/Angular-A11Y-Quick-Intro.pdf' }
                ]
            },
            {
                plugin: 'cypress-schema-validator',
                repoUrl: 'https://github.com/sclavijosuero/cypress-schema-validator',
                features: [
                    { name: '🌐 TestGuild - Testing Tool Matcher', url: 'https://testguild.com/tools/cypress' },

                    { name: '📽️ Test Guild News Show (Jun 2025)', url: 'https://www.linkedin.com/posts/joecolantonio_devsecops-automationtesting-softwaretesting-activity-7337877625475919872-033I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAJfhRkBK-_7FuzGe0IFv3r5Eej4IFAScJM' },
                    { name: '📽️ Razvan Vancea - Cypress API Schema Validator Tutorial', url: 'https://www.youtube.com/watch?v=tUwNqvcdjwg' },

                    { name: '📰 TestGuild Automation in DevSecOps Newsletter (Jun 2025)', url: 'https://www.linkedin.com/pulse/ai-generate-missing-playwright-tests-postman-more-joe-colantonio-gluie/' },
                    { name: "📰 Peter Michael Souza Jr - 20 Things I'd Tell Myself If I Was Learning Cypress for the First Time - Video & Article", url: 'https://www.petermsouzajr.com/blog/20-things-id-tell-myself-if-i-was-learning-cypress-for-the-first-time' },
                    { name: '📰 Software Testing Weekly Issue #275', url: 'https://softwaretestingweekly.com/issues/275' },
                    { name: '📰 Coding Jag by LamdaTest Issue #248', url: 'https://www.linkedin.com/pulse/ai-writes-code-so-why-devs-slowing-down-lambdatest-ovpdf/' },
                    { name: '📰 Software Testing Notes Issue #182', url: 'https://softwaretestingnotes.substack.com/p/issue-182-software-testing-notes' }
                ]
            },
            {
                plugin: 'cypress-ajv-schema-validator',
                repoUrl: 'https://github.com/sclavijosuero/cypress-ajv-schema-validator',
                features: [
                    { name: '🌐 json-schema.org - Schema Tooling Site', url: 'https://json-schema.org/tools?query=&sortBy=name&sortOrder=ascending&groupBy=toolingTypes&licenses=&languages=&drafts=&toolingTypes=' },
                    { name: '🌐 Cypress.io Product Blog - Elevate Your Cypress Testing: Top 10 Essential Plugins', url: 'https://www.cypress.io/blog/elevate-your-cypress-testing-top-10-essential-plugins?utm_medium=blog&utm_source=social_media&utm_term=linkedin&utm_content=10_plugins' },
                    { name: '🌐 testdev.tools - cypress-ajv-schema-validator', url: 'https://testdev.tools/cypress-ajv-schema-validator/' },

                    { name: '📽️ Joan Esquivel Montero - Cypress API Testing: AJV Schema Validator', url: 'https://www.youtube.com/watch?v=SPmJvH5mYaU' },
                    { name: '📽️ Murat Ozcan - Schema validation using cypress-ajv-schema-validator vs Optic', url: 'https://www.youtube.com/watch?v=ysCADOh9aJU&t=13s' },
                    { name: '📽️ Murat Ozcan - Demo comparing API e2e vs Schema testing', url: 'https://www.youtube.com/watch?v=ePjcKMq4c2o' },

                    { name: '📰 Software Testing Notes Issue #157', url: 'https://softwaretestingnotes.substack.com/p/issue-157-software-testing-notes' },
                    { name: '📰 S. Chathurang - API Schema Validation with Cypress', url: 'https://dev.to/cypress/api-schema-validation-with-cypress-185m' },
                    { name: '📰 Cypress News 2025 cz. 2', url: 'https://www.dlatesterow.pl/cypress-news-2025-cz-2/' },
                    { name: '📰 Cypress News 2025 cz. 3', url: 'https://www.dlatesterow.pl/cypress-news-2025-cz-3/' },
                    { name: '📰 Cypress News 2026 cz. 1', url: 'https://www.dlatesterow.pl/cypress-news-2026-cz-1/' },

                    { name: "✏️ Murat Ozcan's Udemy Course - Epic Test Arch.", url: 'https://www.udemy.com/course/epic-test-arch-test-everything-everywhere-all-at-once/?couponCode=NEWYEARCAREER' }
                ]
            },
            {
                plugin: 'cypress-flaky-test-audit',
                repoUrl: 'https://github.com/sclavijosuero/cypress-flaky-test-audit',
                features: [
                    { name: '📰 Software Testing Weekly issue #298', url: 'https://softwaretestingweekly.com/issues/298' },
                    { name: '📰 Cypress Tips January 2026 -  Gleb Bahmutov Newsletter', url: 'https://cypresstips.substack.com/p/cypress-tips-january-2026' }
                ]
            }
        ]
    },
    {
        name: 'Playwright',
        items: [
            {
                plugin: 'pw-api-plugin',
                repoUrl: 'https://github.com/sclavijosuero/pw-api-plugin',
                features: [
                    { name: '🌐 testingmaster.in - Awesome Playwright plugins (PwAPI Plugin)', url: 'https://testingmasterdotin.github.io/awesome-playwright/' },
                    { name: '🌐 Test Guild - The Best Open Source API Testing Tools for 2025', url: 'https://testguild.com/12-open-source-api-testing-tools-rest-soap-services/#Playwright_for_API_testing' },

                    { name: "📽️ Alan Void - Esse plugin para PLAYWRIGHT é muito bom!", url: 'https://www.youtube.com/watch?v=-VzclPt6eFA' },
                    { name: '📽️ Test Guild News Show (Mar 2025)', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7302376476731916288/' },
                    { name: "📽️ JoanMedia - Boost Your Testing Workflow with Playwright's PW-API-PLUGIN", url: 'https://www.youtube.com/watch?v=fdbs-UQQfRY' },

                    { name: '📰 Test Guild Automation in DevSecOps Newsletter (Mar 2025)', url: 'https://www.linkedin.com/pulse/visual-api-testing-playwright-jmeter-book-more-joe-colantonio-cwmze/' },
                    { name: '📰 testdriver.ai - How to Enhance API Testing in Playwright with the New PW-API-PLUGIN', url: 'https://testdriver.ai/articles/how-to-enhance-api-testing-in-playwright-with-the-new-pw-api-plugin' },
                    { name: '📰 Software Testing Weekly Issue #273', url: 'https://softwaretestingweekly.com/issues/273' }
                ]
            },
            {
                plugin: 'playwright-schema-validator',
                repoUrl: 'https://github.com/sclavijosuero/playwright-schema-validator',
                features: [
                    { name: '📽️ Razvan Vancea - Playwright API Schema Validator Tutorial', url: 'https://www.youtube.com/watch?v=3R9DsDoPDow' }
                ]
            },
            {
                plugin: 'playwright-ajv-schema-validator',
                repoUrl: 'https://github.com/sclavijosuero/playwright-ajv-schema-validator',
                features: [
                    { name: '🌐 json-schema.org - Schema Tooling Site', url: 'https://json-schema.org/tools?query=&sortBy=name&sortOrder=ascending&groupBy=toolingTypes&licenses=&languages=&drafts=&toolingTypes=' },
                    { name: '🌐 testingmaster.in - Awesome Playwright plugins (Playwrihght Ajv Schema Validator)', url: 'https://testingmasterdotin.github.io/awesome-playwright/' },

                    { name: '📰 Software Testing Weekly Issue #266', url: 'https://softwaretestingweekly.com/issues/266' }
                ]
            }
        ]
    },
    {
        name: 'Platform-agnostic',
        items: [
            {
                plugin: 'core-ajv-schema-validator',
                repoUrl: 'https://github.com/sclavijosuero/core-ajv-schema-validator',
                features: [
                    { name: '🌐 json-schema.org - Schema Tooling Site', url: 'https://json-schema.org/tools?query=&sortBy=name&sortOrder=ascending&groupBy=toolingTypes&licenses=&languages=&drafts=&toolingTypes=' }
                ]
            },
            {
                plugin: 'core-zod-schema-validator',
                repoUrl: 'https://github.com/sclavijosuero/core-zod-schema-validator',
                features: [
                    { name: '📽️ Cypress.io YouTube - The Bug Bash: Episode 3 (May 27, 2025)', url: 'https://www.youtube.com/watch?v=SRTASYXHqeo' }
                ]
            }
        ]
    }
];

function createPluginHighlightsSection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'blog-features plugin-features';
    wrapper.innerHTML = `
        <details class="feature-panel" id="plugin-highlights">
            <summary class="feature-summary">
                <div class="feature-summary-text">
                    <p class="feature-eyebrow">Plugin spotlight</p>
                    <h3>Where these tools were featured</h3>
                    <p class="feature-summary-copy">Industry lists, newsletters, talks, and videos showcasing these open source projects.</p>
                </div>
                <div class="feature-summary-meta">
                    <span class="feature-chip" id="plugin-features-count">Loading...</span>
                    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </div>
            </summary>
            <div class="feature-body">
                <p class="feature-intro">
                    Curated shout-outs grouped by framework so you can see how Cypress, Playwright, and platform-agnostic packages have been amplified.
                </p>
                <div class="plugin-features-list" id="plugin-features-content">
                    <!-- Plugin mentions injected via JS -->
                </div>
                <button type="button" class="feature-collapse-btn" id="plugin-collapse-btn">
                    <span>Collapse highlights</span>
                    <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>
                </button>
            </div>
        </details>
    `;
    return wrapper;
}

const loadArticles = () => {
    // Cypress DEV.TO Articles
    fetch('https://dev.to/api/articles?username=sebastianclavijo')
        .then(response => response.json())
        .then(articles => {
            const $articles = $('#articles');
            $articles.empty();
            articles.forEach(article => {
                $articles.append($(`<li class="article">
        <a href="${article.url}" target="_blank">
          <img loading="lazy" alt="cover image of the blog post ${article.title}" class="article-img" src="${article.cover_image}">
          <div class="article-title">${article.title}</div>
        </a>
        <div class="article-description">${article.description}</div>
      </li>`));
            })
        })
}

// ===== MAIN APPLICATION ===== 
document.addEventListener('DOMContentLoaded', function () {
    // Initialize application
    initializeNavigation();
    initializeScrollEffects();
    loadBlogArticles();
    loadPlugins();
    renderBlogFeatures();
});

// ===== NAVIGATION ===== 
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                updateActiveNavLink(this);

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Mobile hamburger menu
    hamburger?.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Update navigation on scroll
    window.addEventListener('scroll', updateNavigationOnScroll);
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SCROLL EFFECTS ===== 
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.achievement-item, .article-card, .plugin-card, .contact-item, .social-link');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== BLOG ARTICLES ===== 
function loadBlogArticles() {
    console.log('Loading blog articles...');

    const blogLoading = document.getElementById('blog-loading');
    const blogContent = document.getElementById('blog-content');

    showLoading(blogLoading);

    // Use fetch API directly
    fetch('https://dev.to/api/articles?username=sebastianclavijo&per_page=30')
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(articles => {
            console.log('Articles fetched:', articles.length);

            if (articles && articles.length > 0) {
                renderSimpleBlogContent(articles, blogContent);
                hideLoading(blogLoading);
                blogContent.classList.add('loaded');
            } else {
                throw new Error('No articles found');
            }
        })
        .catch(error => {
            console.error('Error loading blog articles:', error);
            showError(blogContent, 'Failed to load blog articles. Please try again later.');
            hideLoading(blogLoading);
        });
}

function renderSimpleBlogContent(articles, container) {
    const articlesHtml = articles.map(article => createArticleCard(article)).join('');
    container.innerHTML = `<div class="articles-grid">${articlesHtml}</div>`;
}

function createArticleCard(article) {
    const publishedDate = new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const coverImage = article.cover_image || article.social_image || 'images/json.jpg';

    return `
        <a href="${article.url}" target="_blank" rel="noopener" class="article-card">
            <img src="${coverImage}" alt="${article.title}" class="article-image" loading="lazy">
            <div class="article-content">
                <h4 class="article-title">${article.title}</h4>
                <p class="article-description">${article.description || 'Read this insightful article on testing and automation.'}</p>
                <div class="article-meta">
                    <span class="article-date">${publishedDate}</span>
                    <div class="article-tags">
                        ${article.tag_list.map(tag => `<span class="article-tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </a>
    `;
}

// ===== BLOG FEATURE CALLOUTS =====
function renderBlogFeatures() {
    const container = document.getElementById('blog-features-content');
    const countChip = document.getElementById('blog-features-count');
    const collapseBtn = document.getElementById('feature-collapse-btn');
    const featurePanel = document.getElementById('community-highlights');

    if (!container) {
        return;
    }

    const featuredArticles = COMMUNITY_FEATURES.filter(feature => feature.outlets && feature.outlets.length);
    if (!featuredArticles.length) {
        container.innerHTML = '<p class="feature-mentions feature-mentions--empty">Community highlights coming soon.</p>';
        return;
    }

    const featuresHtml = featuredArticles.map(feature => createFeatureEntry(feature)).join('');
    container.innerHTML = featuresHtml;

    if (countChip) {
        countChip.innerHTML = '<span>50+</span><span>shout-outs</span>';
    }

    collapseBtn?.addEventListener('click', () => {
        if (featurePanel?.open) {
            featurePanel.open = false;
            featurePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

function createFeatureEntry(feature) {
    const mentionCount = feature.outlets.length;
    const mentionLabel = mentionCount === 1 ? 'feature' : 'features';
    const metaLabel = mentionCount ? `${mentionCount} ${mentionLabel}` : 'Original spotlight';

    const normalizedOutlets = feature.outlets.map(normalizeOutlet);

    const mentionsMarkup = mentionCount
        ? `
            <ul class="feature-mentions">
                ${normalizedOutlets.map(renderNormalizedOutlet).join('')}
            </ul>
        `
        : `<p class="feature-mentions feature-mentions--empty">Shared directly on dev.to</p>`;

    return `
        <article class="feature-article">
            <div class="feature-article-header">
                <div>
                    <h4>
                        <a href="${feature.articleUrl}" target="_blank" rel="noopener">
                            ${feature.title}
                        </a>
                    </h4>
                </div>
                <span class="feature-article-meta">${metaLabel}</span>
            </div>
            ${mentionsMarkup}
        </article>
    `;
}

function normalizeOutlet(outlet) {
    const trimmedName = outlet.name.trim();
    const newsletterMatch = trimmedName.match(/\(([^)]+)\)/);

    if (NON_LINK_NEWSLETTERS.has(trimmedName)) {
        const formattedDate = formatMonthYear(newsletterMatch ? newsletterMatch[1] : '');
        return {
            label: 'Cypress.io Newsletter',
            dateLabel: formattedDate ? ` - ${formattedDate}` : '',
            href: null
        };
    }

    const cypressNewsletterMatch = trimmedName.match(/^Cypress\.io Newsletter\s*\(([^)]+)\)/i);
    if (cypressNewsletterMatch) {
        const formattedDate = formatMonthYear(cypressNewsletterMatch[1]);
        return {
            label: 'Cypress.io Newsletter',
            dateLabel: formattedDate ? ` - ${formattedDate}` : '',
            href: outlet.url || null
        };
    }

    const dateMatch = trimmedName.match(/^(.*)\(([^)]+)\)$/);
    if (dateMatch) {
        const label = dateMatch[1].trim().replace(/[-–—]\s*$/, '');
        const formattedDate = formatMonthYear(dateMatch[2]);
        return {
            label,
            dateLabel: formattedDate ? ` (${formattedDate})` : '',
            href: outlet.url || null
        };
    }

    return {
        label: outlet.name,
        dateLabel: '',
        href: outlet.url || null
    };
}

function renderNormalizedOutlet(outlet) {
    const text = `${outlet.label}${outlet.dateLabel}`;
    if (outlet.href) {
        return `
            <li>
                <a href="${outlet.href}" target="_blank" rel="noopener">
                    <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    <span>${text}</span>
                </a>
            </li>
        `;
    }

    return `
        <li>
            <span class="feature-mention-text">${text}</span>
        </li>
    `;
}

function formatFullDate(rawDate) {
    const parsedDate = parseDate(rawDate);
    if (!parsedDate) {
        return rawDate;
    }

    return parsedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function formatMonthYear(rawDate) {
    const parsedDate = parseDate(rawDate);
    if (!parsedDate) {
        return rawDate;
    }

    const month = parsedDate.toLocaleString('en-US', { month: 'long' });
    return `${month}, ${parsedDate.getFullYear()}`;
}

function parseDate(rawDate) {
    if (!rawDate) {
        return null;
    }

    const normalized = rawDate
        .replace(/\s+/g, ' ')
        .replace(/(\d+)(st|nd|rd|th)/gi, '$1')
        .trim();

    let parsed = Date.parse(normalized);
    if (!Number.isNaN(parsed)) {
        return new Date(parsed);
    }

    parsed = Date.parse(`${normalized} 1`);
    if (!Number.isNaN(parsed)) {
        return new Date(parsed);
    }

    return null;
}

// ===== PLUGIN FEATURE CALLOUTS =====
function renderPluginFeatures() {
    const container = document.getElementById('plugin-features-content');
    const countChip = document.getElementById('plugin-features-count');
    const collapseBtn = document.getElementById('plugin-collapse-btn');
    const panel = document.getElementById('plugin-highlights');

    if (!container) {
        return;
    }

    const groupsHtml = PLUGIN_FEATURE_GROUPS.map(createPluginGroupSection).join('');
    container.innerHTML = groupsHtml;

    if (countChip) {
        countChip.innerHTML = '<span>70+</span><span>spotlights</span>';
    }

    collapseBtn?.addEventListener('click', () => {
        if (panel?.open) {
            panel.open = false;
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

function createPluginGroupSection(group) {
    const pluginCards = group.items
        .filter(item => item.features.length > 0)
        .map(createPluginFeatureCard)
        .join('');

    if (!pluginCards) {
        return '';
    }

    return `
        <section class="plugin-feature-group">
            <h4 class="feature-group-title">${group.name}</h4>
            <div class="plugin-feature-list">
                ${pluginCards}
            </div>
        </section>
    `;
}

function createPluginFeatureCard(plugin) {
    let lastMentionType = null;
    const mentions = plugin.features.map(mention => {
        const mentionType = getMentionType(mention.name);
        const isNewGroup = mentionType !== lastMentionType;
        lastMentionType = mentionType;
        return renderPluginMention(mention, isNewGroup);
    }).join('');

    return `
        <article class="feature-article plugin-feature-article">
            <div class="feature-article-header">
                <div>
                    <h4>
                        <a href="${plugin.repoUrl}" target="_blank" rel="noopener">
                            ${plugin.plugin}
                        </a>
                    </h4>
                </div>
                <span class="feature-article-meta">${plugin.features.length} mention${plugin.features.length === 1 ? '' : 's'}</span>
            </div>
            <ul class="feature-mentions">
                ${mentions}
            </ul>
        </article>
    `;
}

function getMentionType(name = '') {
    const firstChar = Array.from(name.trim())[0] || '';
    return firstChar;
}

function renderPluginMention(mention, isNewGroup) {
    const groupClass = isNewGroup ? ' feature-mention-group-start' : '';
    if (mention.url) {
        return `
            <li class="feature-mention${groupClass}">
                <a href="${mention.url}" target="_blank" rel="noopener">
                    <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    <span>${mention.name}</span>
                </a>
            </li>
        `;
    }

    return `
        <li class="feature-mention${groupClass}">
            <span class="feature-mention-text">${mention.name}</span>
        </li>
    `;
}

// ===== PLUGINS SECTION ===== 
function loadPlugins() {
    console.log('Loading plugins...');

    const pluginsLoading = document.getElementById('plugins-loading');
    const pluginsContent = document.getElementById('plugins-content');

    showLoading(pluginsLoading);

    // Start with fallback plugins to ensure they always load
    renderFallbackPlugins(pluginsContent);
    hideLoading(pluginsLoading);
}

async function fetchNPMPlugins() {
    console.log('Attempting to fetch NPM plugins...');

    // The NPM user packages endpoint might not work reliably, so let's start with known packages
    return await fetchHardcodedPlugins();
}

async function fetchHardcodedPlugins() {
    const pluginNames = [
        'wick-a11y',
        'cypress-ajv-schema-validator',
        'playwright-ajv-schema-validator'
    ];

    const pluginPromises = pluginNames.map(async (name) => {
        try {
            const response = await fetch(`https://registry.npmjs.org/${name}`);
            if (!response.ok) throw new Error(`Failed to fetch ${name}`);

            const packageData = await response.json();
            const pluginImage = await fetchPluginImage(packageData);

            return {
                ...packageData,
                pluginImage: pluginImage
            };
        } catch (error) {
            console.warn(`Failed to fetch ${name}:`, error);
            return null;
        }
    });

    const results = await Promise.all(pluginPromises);
    return results.filter(plugin => plugin !== null);
}

async function fetchPluginImage(packageData) {
    try {
        const repoUrl = extractGitHubRepoUrl(packageData);
        if (!repoUrl) return null;

        // Try to get README content from GitHub
        const readmeContent = await fetchReadmeFromGitHub(repoUrl);
        if (!readmeContent) return null;

        // Extract the first image from README
        const imageUrl = extractImageFromReadme(readmeContent, repoUrl);
        return imageUrl;
    } catch (error) {
        console.warn('Failed to fetch plugin image:', error);
        return null;
    }
}

function extractGitHubRepoUrl(packageData) {
    const repository = packageData.repository;
    if (!repository) return null;

    let repoUrl = repository.url || repository;
    if (typeof repoUrl !== 'string') return null;

    // Clean up the URL
    repoUrl = repoUrl.replace(/^git\+/, '').replace(/\.git$/, '');

    // Extract owner/repo from GitHub URL
    const match = repoUrl.match(/github\.com[\/:]([^\/]+)\/([^\/]+)/);
    if (!match) return null;

    return {
        owner: match[1],
        repo: match[2],
        fullUrl: `https://github.com/${match[1]}/${match[2]}`
    };
}

async function fetchReadmeFromGitHub(repoInfo) {
    const readmeVariants = ['README.md', 'README.MD', 'readme.md', 'Readme.md'];

    for (const readmeFile of readmeVariants) {
        try {
            // Try to fetch the README file from GitHub raw content
            const response = await fetch(`https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/main/${readmeFile}`);
            if (response.ok) {
                return await response.text();
            }

            // If main branch doesn't work, try master branch
            const masterResponse = await fetch(`https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/master/${readmeFile}`);
            if (masterResponse.ok) {
                return await masterResponse.text();
            }
        } catch (error) {
            console.warn(`Failed to fetch ${readmeFile}:`, error);
            continue;
        }
    }

    return null;
}

function extractImageFromReadme(readmeContent, repoInfo) {
    // Look for image patterns in markdown
    const imagePatterns = [
        // Standard markdown image syntax
        /!\[.*?\]\((.*?)\)/g,
        // HTML img tags
        /<img[^>]+src=["']([^"']+)["'][^>]*>/g
    ];

    const foundImages = [];

    for (const pattern of imagePatterns) {
        let match;
        while ((match = pattern.exec(readmeContent)) !== null) {
            foundImages.push(match[1]);
        }
    }

    if (foundImages.length === 0) {
        // Try to find common image names in the repo
        return tryCommonImageNames(repoInfo);
    }

    // Prioritize certain image names
    const priorityImages = foundImages.filter(img =>
        /overview|screenshot|demo|example|preview/i.test(img)
    );

    const selectedImage = priorityImages.length > 0 ? priorityImages[0] : foundImages[0];

    // Convert relative URLs to absolute GitHub URLs
    if (selectedImage.startsWith('./') || selectedImage.startsWith('../') || !selectedImage.startsWith('http')) {
        const cleanPath = selectedImage.replace(/^\.\//, '').replace(/^\//, '');
        return `https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/main/${cleanPath}`;
    }

    return selectedImage;
}

function tryCommonImageNames(repoInfo) {
    // Common image names to try, prioritizing GIF over PNG, images/videos folders over root
    const commonNames = [
        'images/overview.gif',
        'images/overview.png',
        'videos/overview.gif',
        'videos/overview.png',
        'overview.gif',
        'overview.png',
        'images/screenshot.gif',
        'images/screenshot.png',
        'videos/screenshot.gif',
        'videos/screenshot.png',
        'screenshot.gif',
        'screenshot.png',
        'images/demo.gif',
        'images/demo.png',
        'videos/demo.gif',
        'videos/demo.png',
        'demo.gif',
        'demo.png',
        'images/example.gif',
        'images/example.png',
        'videos/example.gif',
        'videos/example.png',
        'example.gif',
        'example.png',
        'images/preview.gif',
        'images/preview.png',
        'videos/preview.gif',
        'videos/preview.png',
        'preview.gif',
        'preview.png',
        'docs/overview.gif',
        'docs/overview.png',
        'assets/overview.gif',
        'assets/overview.png'
    ];

    // Return the first common name as a URL (we'll let the browser handle 404s)
    return `https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/main/${commonNames[0]}`;
}

function renderPlugins(plugins, container) {
    container.innerHTML = '';

    plugins.forEach(plugin => {
        const pluginCard = createPluginCard(plugin);
        container.appendChild(pluginCard);
    });
}

function createPluginCard(plugin) {
    const card = document.createElement('div');
    card.className = 'plugin-card';

    const latestVersion = plugin['dist-tags']?.latest || 'N/A';
    const description = plugin.description || 'No description available';
    const keywords = plugin.keywords || [];
    const repository = plugin.repository?.url || plugin.homepage || '#';
    const npmUrl = `https://www.npmjs.com/package/${plugin.name}`;

    // Get icon based on plugin name
    const iconClass = getPluginIcon(plugin.name);

    // Create image section if we have a plugin image
    const imageSection = plugin.pluginImage ? `
        <div class="plugin-image-container">
            <img src="${plugin.pluginImage}" alt="${plugin.name} screenshot" class="plugin-image" loading="lazy" onerror="this.style.display='none'">
        </div>
    ` : '';

    card.innerHTML = `
        <div class="plugin-header">
            <div class="plugin-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="plugin-info">
                <h3 class="plugin-title">${plugin.name}</h3>
                <span class="plugin-version">v${latestVersion}</span>
            </div>
        </div>
        ${imageSection}
        <p class="plugin-description">${description}</p>
        <div class="plugin-stats">
            <div class="plugin-stat">
                <i class="fas fa-download"></i>
                <span>Weekly Downloads: ${formatNumber(plugin.downloads?.weekly || 0)}</span>
            </div>
            <div class="plugin-stat">
                <i class="fas fa-tag"></i>
                <span>Latest: v${latestVersion}</span>
            </div>
        </div>
        <div class="plugin-links">
            <a href="${npmUrl}" target="_blank" rel="noopener" class="plugin-link">
                <i class="fab fa-npm"></i>
                NPM
            </a>
            <a href="${repository.replace('git+', '').replace('.git', '')}" target="_blank" rel="noopener" class="plugin-link">
                <i class="fab fa-github"></i>
                GitHub
            </a>
        </div>
    `;

    return card;
}

function getPluginIcon(pluginName) {
    const iconMap = {
        'wick-a11y': 'fas fa-universal-access',
        'cypress-ajv-schema-validator': 'fas fa-check-circle',
        'playwright-ajv-schema-validator': 'fas fa-theater-masks'
    };

    return iconMap[pluginName] || 'fas fa-puzzle-piece';
}

function renderFallbackPlugins(container) {
    const fallbackPlugins = [
        {
            name: 'wick-a11y',
            group: 'green',
            description: 'Cypress plugin for configurable accessibility analysis supporting WCAG 2.2 (A-AAA). It provides a detailed list of violations in the Cypress log, visual feedback directly in the Cypress runner, and generates a comprehensive, severity-based HTML report that includes per-violation details, fix guidance, and a screenshot with interactive elements for each accessibility issue. The plugin uses axe-core and cypress-axe to deliver comprehensive accessibility testing.',
            version: '3.0.1',
            githubUrl: 'https://github.com/sclavijosuero/wick-a11y',
            npmUrl: 'https://www.npmjs.com/package/wick-a11y',
            icon: 'fas fa-universal-access',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/wick-a11y/main/images/full-overview.gif'
        },
        {
            name: 'cypress-schema-validator',
            group: 'green',
            description: 'Cypress plugin for API schema validation. It leverages the core-ajv-schema-validator powered by the AJV package (for plain JSON schemas, Swagger documents, and OpenAPI schemas) as well as the core-zod-schema-validator powered by the ZOD package (for Zod schemas).',
            version: '1.0.1',
            githubUrl: 'https://github.com/sclavijosuero/cypress-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/cypress-schema-validator',
            icon: 'fas fa-check-circle',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/cypress-schema-validator/main/videos/overview.gif'
        },
        {
            name: 'cypress-flaky-test-audit',
            group: 'green',
            description: 'A Cypress plugin that tracks the order in which Cypress commands are entered into the command queue and delivers detailed, per-command analytics for your test runs. It helps identify flaky tests, performance bottlenecks, and commands that don’t execute, and presents audit results in the browser console, terminal output, and an HTML report with visual graphs of Cypress command execution',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/cypress-flaky-test-audit',
            npmUrl: 'https://www.npmjs.com/package/cypress-flaky-test-audit',
            icon: 'fas fa-random',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/cypress-flaky-test-audit/main/assets/overview.gif'
        },
        {
            name: 'wick-dom-observer',
            group: 'green',
            description: 'Cypress commands to reliably detect UI elements that may appear/disappear quickly: clickAndWatchForElement (click + observe) and watchForElement (observe only). It supports required/optional appearance, optional disappearance checks, custom timeout/polling, and minimum visible duration (mustLast) with a synchronous assertion callback.',
            version: '1.0.2',
            githubUrl: 'https://github.com/sclavijosuero/wick-dom-observer',
            npmUrl: 'https://www.npmjs.com/package/wick-dom-observer',
            icon: 'fas fa-random',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/wick-dom-observer/refs/heads/main/assets/images/overview.png'
        },
        {
            name: 'pw-api-plugin',
            group: 'red',
            description: 'Playwright plugin for comprehensive API testing and result presentation using the Playwright UI, Trace Viewer, and HTML Report. It significantly aids debugging processes and supports both Playwright native API and Axios requests.',
            version: '2.1.0',
            githubUrl: 'https://github.com/sclavijosuero/pw-api-plugin',
            npmUrl: 'https://www.npmjs.com/package/pw-api-plugin',
            icon: 'fas fa-theater-masks',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/pw-api-plugin/main/videos/overview.gif'
        },
        {
            name: 'playwright-schema-validator',
            group: 'red',
            description: 'Playwright plugin for API schema validation. It leverages the core-ajv-schema-validator powered by the AJV package (for plain JSON schemas, Swagger documents, and OpenAPI schemas) as well as the core-zod-schema-validator powered by the ZOD package (for Zod schemas). It delivers results in a clear, user-friendly format, simplifying the process of identifying and addressing schema issues.',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/playwright-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/playwright-schema-validator',
            icon: 'fas fa-theater-masks',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/playwright-ajv-schema-validator/main/videos/overview.gif'
        },
        {
            name: 'core-ajv-schema-validator',
            group: 'blue',
            description: 'Core AJV schema validation library that powers multiple testing framework integrations. Framework-agnostic JSON schema validation.',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/core-ajv-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/core-ajv-schema-validator',
            icon: 'fas fa-cogs',
            pluginImage: null
        },
        {
            name: 'core-zod-schema-validator',
            group: 'blue',
            description: 'Core Zod schema validation library that powers multiple testing framework integrations. Framework-agnostic TypeScript-first schema validation.',
            version: '1.0.1',
            githubUrl: 'https://github.com/sclavijosuero/core-zod-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/core-zod-schema-validator',
            icon: 'fas fa-cogs',
            pluginImage: null
        },
        {
            name: 'cypress-ajv-schema-validator',
            group: 'legacy',
            description: 'Legacy JSON Schema validator for Cypress using AJV. Now replaced by cypress-schema-validator for new projects.',
            version: '2.0.2',
            githubUrl: 'https://github.com/sclavijosuero/cypress-ajv-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/cypress-ajv-schema-validator',
            icon: 'fas fa-archive',
            pluginImage: null,
            isLegacy: true
        },
        {
            name: 'playwright-ajv-schema-validator',
            group: 'legacy',
            description: 'Playwright plugin for API schema validation against plain JSON schemas, Swagger schema documents. Built on the robust core-ajv-schema-validator plugin and powered by the Ajv JSON Schema Validator, it delivers results in a clear, user-friendly format, simplifying the process of identifying and addressing schema issues.',
            version: '1.0.2',
            githubUrl: 'https://github.com/sclavijosuero/playwright-ajv-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/playwright-ajv-schema-validator',
            icon: 'fas fa-archive',
            pluginImage: null,
            isLegacy: true
        }
    ];

    const tutorialPlugin = {
        name: 'how-to-create-a-cypress-plugin',
        description: 'Complete tutorial and example code showing how to create a Cypress plugin from scratch. Perfect starting point for plugin development.',
        version: '1.0.0',
        githubUrl: 'https://github.com/sclavijosuero/how-to-create-a-cypress-plugin',
        npmUrl: null, // This is not an NPM package
        icon: 'fas fa-graduation-cap',
        pluginImage: null,
        isTutorial: true
    };

    container.innerHTML = '';

    const activePlugins = fallbackPlugins.filter(plugin => !plugin.isLegacy);
    const legacyPlugins = fallbackPlugins.filter(plugin => plugin.isLegacy);

    // Render active plugins
    activePlugins.forEach(plugin => {
        const card = createFallbackPluginCard(plugin);
        container.appendChild(card);
    });

    // Render legacy plugins with divider directly after active ones
    if (legacyPlugins.length) {
        const legacyHeading = document.createElement('div');
        legacyHeading.className = 'plugin-group-heading';
        legacyHeading.innerHTML = `
            <h3>Legacy Plugins</h3>
            <p>Maintained for backward compatibility. For new projects adopt the latest schema validators above.</p>
        `;
        container.appendChild(legacyHeading);

        legacyPlugins.forEach(plugin => {
            const card = createFallbackPluginCard(plugin);
            container.appendChild(card);
        });
    }

    // Add plugin highlights section after legacy
    const pluginHighlightsSection = createPluginHighlightsSection();
    container.appendChild(pluginHighlightsSection);
    renderPluginFeatures();

    // Add tutorial section
    const tutorialSection = document.createElement('div');
    tutorialSection.className = 'tutorial-section';
    tutorialSection.innerHTML = `
        <div class="tutorial-header">
            <h3>📚 Learning Resources</h3>
            <p>Want to create your own plugins? Start here!</p>
        </div>
    `;

    const tutorialCard = createTutorialCard(tutorialPlugin);
    tutorialSection.appendChild(tutorialCard);
    container.appendChild(tutorialSection);
}

function createFallbackPluginCard(plugin) {
    const card = document.createElement('div');
    const groupClass = plugin.isLegacy ? 'plugin-legacy legacy-plugin' : plugin.group ? `plugin-${plugin.group}` : '';
    card.className = `plugin-card ${groupClass}`.trim();

    // Generate GitHub overview image URL
    const githubOverviewImage = getGithubOverviewImage(plugin.githubUrl);

    // Create image section - prioritize local image, then GitHub overview
    const imageUrl = plugin.pluginImage || githubOverviewImage;
    const imageSection = imageUrl ? `
        <div class="plugin-image-container">
            <img src="${imageUrl}" alt="${plugin.name} overview" class="plugin-image" loading="lazy" onerror="handleImageError(this, '${plugin.githubUrl}')">
        </div>
    ` : '';

    const legacyBadge = plugin.isLegacy ? '<span class="legacy-badge">Legacy</span>' : '';

    card.innerHTML = `
        <div class="plugin-header">
            <div class="plugin-icon">
                <i class="${plugin.icon}"></i>
            </div>
            <div class="plugin-info">
                <h3 class="plugin-title">${plugin.name}${legacyBadge}</h3>
                <span class="plugin-version">v${plugin.version}</span>
            </div>
        </div>
        ${imageSection}
        <p class="plugin-description">${plugin.description}</p>
        <div class="plugin-stats">
            <div class="plugin-stat">
                <i class="fas fa-star"></i>
                <span>Featured Plugin</span>
            </div>
            <div class="plugin-stat">
                <i class="fas fa-tag"></i>
                <span>Latest: v${plugin.version}</span>
            </div>
        </div>
        <div class="plugin-links">
            <a href="${plugin.npmUrl}" target="_blank" rel="noopener" class="plugin-link">
                <i class="fab fa-npm"></i>
                NPM
            </a>
            <a href="${plugin.githubUrl}" target="_blank" rel="noopener" class="plugin-link">
                <i class="fab fa-github"></i>
                GitHub
            </a>
        </div>
    `;

    return card;
}

function getGithubOverviewImage(githubUrl) {
    if (!githubUrl) return null;

    try {
        // Extract owner and repo from GitHub URL
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return null;

        const [, owner, repo] = match;

        // Try images/overview.gif first (prioritizing GIF over PNG)
        // GitHub raw URLs format: https://raw.githubusercontent.com/owner/repo/main/images/overview.gif
        const basePath = `https://raw.githubusercontent.com/${owner}/${repo}/main`;
        const imageUrl = `${basePath}/images/overview.gif`;

        console.log(`Generated image URL for ${owner}/${repo}: ${imageUrl}`);

        // We'll return the images folder GIF version first and let the browser handle fallback via onerror
        return imageUrl;
    } catch (error) {
        console.log(`Could not generate overview image URL for ${githubUrl}:`, error);
        return null;
    }
}

function handleImageError(imgElement, githubUrl) {
    const currentSrc = imgElement.src;
    console.log(`Image failed to load: ${currentSrc}`);

    // Fallback sequence: images/overview.gif → images/overview.png → videos/overview.gif → videos/overview.png → overview.gif → overview.png → hide
    if (currentSrc.includes('images/overview.gif')) {
        // Try images/overview.png
        const newSrc = currentSrc.replace('images/overview.gif', 'images/overview.png');
        console.log(`Trying fallback: ${newSrc}`);
        imgElement.src = newSrc;
        return;
    } else if (currentSrc.includes('images/overview.png')) {
        // Try videos/overview.gif
        const newSrc = currentSrc.replace('images/overview.png', 'videos/overview.gif');
        console.log(`Trying fallback: ${newSrc}`);
        imgElement.src = newSrc;
        return;
    } else if (currentSrc.includes('videos/overview.gif')) {
        // Try videos/overview.png
        const newSrc = currentSrc.replace('videos/overview.gif', 'videos/overview.png');
        console.log(`Trying fallback: ${newSrc}`);
        imgElement.src = newSrc;
        return;
    } else if (currentSrc.includes('videos/overview.png')) {
        // Try root overview.gif
        const newSrc = currentSrc.replace('videos/overview.png', 'overview.gif');
        console.log(`Trying fallback: ${newSrc}`);
        imgElement.src = newSrc;
        return;
    } else if (currentSrc.includes('overview.gif') && !currentSrc.includes('images/') && !currentSrc.includes('videos/')) {
        // Try root overview.png
        const newSrc = currentSrc.replace('overview.gif', 'overview.png');
        console.log(`Trying fallback: ${newSrc}`);
        imgElement.src = newSrc;
        return;
    }

    // If all failed, hide the image container
    console.log(`All image fallbacks failed for: ${githubUrl}`);
    imgElement.style.display = 'none';
    const container = imgElement.closest('.plugin-image-container');
    if (container) {
        container.style.display = 'none';
    }
}

function createTutorialCard(plugin) {
    const card = document.createElement('div');
    card.className = 'tutorial-card';

    card.innerHTML = `
        <div class="tutorial-card-header">
            <div class="tutorial-icon">
                <i class="${plugin.icon}"></i>
            </div>
            <div class="tutorial-info">
                <h3 class="tutorial-title">${plugin.name}</h3>
                <span class="tutorial-type">Tutorial Repository</span>
            </div>
        </div>
        <p class="tutorial-description">${plugin.description}</p>
        <div class="tutorial-features">
            <div class="tutorial-feature">
                <i class="fas fa-book"></i>
                <span>Step-by-step guide</span>
            </div>
            <div class="tutorial-feature">
                <i class="fas fa-code"></i>
                <span>Complete example</span>
            </div>
            <div class="tutorial-feature">
                <i class="fas fa-rocket"></i>
                <span>Ready to use template</span>
            </div>
        </div>
        <div class="tutorial-links">
            <a href="${plugin.githubUrl}" target="_blank" rel="noopener" class="tutorial-link primary">
                <i class="fab fa-github"></i>
                View Tutorial
            </a>
        </div>
    `;

    return card;
}

// ===== UTILITY FUNCTIONS ===== 
function showLoading(element) {
    if (element) {
        element.style.display = 'block';
    }
}

function hideLoading(element) {
    if (element) {
        element.style.display = 'none';
    }
}

function showError(container, message) {
    container.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; color: var(--secondary-color);"></i>
            <p>${message}</p>
        </div>
    `;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}


