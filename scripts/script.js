// Wait for the document to load before running the script 
(function ($) {
  
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions, then show the content-region specified in the URL hash 
    // (or if no hash URL is found, default to first menu item)
    $('.content-region').hide();
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash
    $(region).show();
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 

    // Alternate method: Use AJAX to load the contents of an external file into a div based on URL fragment
    // This will extract the region name from URL hash, and then load [region].html into the main #content div
    // var region = location.hash.toString() || '#first';
    // $('#content').load(region.slice(1) + '.html')

    loadArticles()    
  });
  
})(jQuery);


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
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeNavigation();
    initializeScrollEffects();
    loadBlogArticles();
    loadPlugins();
});

// ===== NAVIGATION ===== 
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    hamburger?.addEventListener('click', function() {
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
                        ${article.tag_list.slice(0, 2).map(tag => `<span class="article-tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </a>
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
            description: 'Cypress plugin for performing configurable Accessibility tests using AXE. Features detailed HTML reports with violation details and fix instructions, voice support for audible feedback at suite/test/violation/DOM levels, shows violations directly in the webpage with an interactive console to interact with violations, and flawless integration in Cypress.',
            version: '1.4.0',
            githubUrl: 'https://github.com/sclavijosuero/wick-a11y',
            npmUrl: 'https://www.npmjs.com/package/wick-a11y',
            icon: 'fas fa-universal-access',
            pluginImage: null
        },
        {
            name: 'cypress-schema-validator',
            description: 'Modern JSON Schema validator for Cypress using both AJV and Zod. Successor to cypress-ajv-schema-validator with enhanced features and better performance.',
            version: '2.0.0',
            githubUrl: 'https://github.com/sclavijosuero/cypress-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/cypress-schema-validator',
            icon: 'fas fa-check-circle',
            pluginImage: null
        },
        {
            name: 'pw-api-plugin',
            description: 'Playwright plugin for API testing that supports Playwright native API and Axios. Displays API request and response details in Playwright UI, the Trace Viewer, and HTML test reports.',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/pw-api-plugin',
            npmUrl: 'https://www.npmjs.com/package/pw-api-plugin',
            icon: 'fas fa-theater-masks',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/pw-api-plugin/main/videos/overview.gif'
        },
        {
            name: 'playwright-ajv-schema-validator',
            description: 'Playwright plugin for API schema validation using AJV. Integrates seamlessly with the pw-api-plugin to bring the power of schema validation to Playwright testing.',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/playwright-ajv-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/playwright-ajv-schema-validator',
            icon: 'fas fa-theater-masks',
            pluginImage: 'https://raw.githubusercontent.com/sclavijosuero/playwright-ajv-schema-validator/main/videos/overview.gif'
        },
        {
            name: 'core-ajv-schema-validator',
            description: 'Core AJV schema validation library that powers multiple testing framework integrations. Framework-agnostic JSON schema validation.',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/core-ajv-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/core-ajv-schema-validator',
            icon: 'fas fa-cogs',
            pluginImage: null
        },
        {
            name: 'core-zod-schema-validator',
            description: 'Core Zod schema validation library that powers multiple testing framework integrations. Framework-agnostic TypeScript-first schema validation.',
            version: '1.0.0',
            githubUrl: 'https://github.com/sclavijosuero/core-zod-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/core-zod-schema-validator',
            icon: 'fas fa-cogs',
            pluginImage: null
        },
        {
            name: 'cypress-ajv-schema-validator',
            description: 'Legacy JSON Schema validator for Cypress using AJV. Now replaced by cypress-schema-validator for new projects.',
            version: '1.2.0',
            githubUrl: 'https://github.com/sclavijosuero/cypress-ajv-schema-validator',
            npmUrl: 'https://www.npmjs.com/package/cypress-ajv-schema-validator',
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
    
    // Render regular plugins
    fallbackPlugins.forEach(plugin => {
        const card = createFallbackPluginCard(plugin);
        container.appendChild(card);
    });

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
    card.className = plugin.isLegacy ? 'plugin-card legacy-plugin' : 'plugin-card';
    
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


