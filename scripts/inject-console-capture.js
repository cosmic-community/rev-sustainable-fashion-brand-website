const fs = require('fs');
const path = require('path');

// Console capture script content
const CONSOLE_SCRIPT = `
  (function () {
    if (window.self === window.top) return;

    const logs = [];
    const MAX_LOGS = 500;

    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug
    };

    function captureLog(level, args) {
      const timestamp = new Date().toISOString();
      const message = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg, (key, value) => {
              if (typeof value === 'function') return '[Function]';
              if (value instanceof Error) return value.toString();
              return value;
            }, 2);
          } catch (e) {
            return '[Object]';
          }
        }
        return String(arg);
      }).join(' ');

      const logEntry = {
        timestamp,
        level,
        message,
        url: window.location.href
      };

      logs.push(logEntry);
      if (logs.length > MAX_LOGS) {
        logs.shift();
      }

      try {
        window.parent.postMessage({
          type: 'console-log',
          log: logEntry
        }, '*');
      } catch (e) { }
    }

    // Override console methods
    ['log', 'warn', 'error', 'info', 'debug'].forEach(level => {
      console[level] = function(...args) {
        originalConsole[level].apply(console, args);
        captureLog(level, args);
      };
    });

    // Capture unhandled errors
    window.addEventListener('error', function(event) {
      captureLog('error', ['Uncaught Error:', event.error || event.message]);
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      captureLog('error', ['Unhandled Promise Rejection:', event.reason]);
    });

    function sendReady() {
      try {
        window.parent.postMessage({
          type: 'console-capture-ready',
          url: window.location.href,
          timestamp: new Date().toISOString()
        }, '*');
      } catch (e) { }
    }

    function sendRouteChange() {
      try {
        window.parent.postMessage({
          type: 'route-change',
          route: {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            href: window.location.href
          },
          timestamp: new Date().toISOString()
        }, '*');
      } catch (e) { }
    }

    // Send ready message
    if (document.readyState === 'complete') {
      setTimeout(sendReady, 100);
      setTimeout(sendRouteChange, 150);
    } else {
      window.addEventListener('load', function() {
        setTimeout(sendReady, 100);
        setTimeout(sendRouteChange, 150);
      });
    }

    // Monitor route changes for SPAs
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(sendRouteChange, 50);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(sendRouteChange, 50);
    };

    window.addEventListener('popstate', function() {
      setTimeout(sendRouteChange, 50);
    });

    window.addEventListener('hashchange', function() {
      setTimeout(sendRouteChange, 50);
    });
  })();
`;

// Recursive function to find all HTML files
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function injectConsoleCapture() {
  // Determine target directory
  let targetDir;
  
  if (fs.existsSync('.next')) {
    console.log('📁 Found Next.js build directory');
    targetDir = '.next';
  } else if (fs.existsSync('dist')) {
    console.log('📁 Found dist directory');
    targetDir = 'dist';
  } else if (fs.existsSync('build')) {
    console.log('📁 Found build directory');
    targetDir = 'build';
  } else if (fs.existsSync('out')) {
    console.log('📁 Found out directory');
    targetDir = 'out';
  } else {
    console.log('❌ No build directory found, skipping console capture injection');
    return;
  }

  try {
    // Find all HTML files
    const htmlFiles = findHtmlFiles(targetDir);
    
    if (htmlFiles.length === 0) {
      console.log('❌ No HTML files found in build directory');
      return;
    }

    console.log(`🔍 Found ${htmlFiles.length} HTML files`);

    let injectedCount = 0;

    htmlFiles.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if script is already injected
        if (content.includes('console-capture-ready')) {
          return;
        }

        // Inject the script before closing head tag or at the beginning of body
        if (content.includes('</head>')) {
          content = content.replace('</head>', `<script>${CONSOLE_SCRIPT}</script></head>`);
        } else if (content.includes('<body')) {
          content = content.replace(/<body[^>]*>/, match => `${match}<script>${CONSOLE_SCRIPT}</script>`);
        } else {
          // Fallback: add at the beginning of the HTML
          content = `<script>${CONSOLE_SCRIPT}</script>${content}`;
        }
        
        fs.writeFileSync(file, content);
        injectedCount++;
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    });

    console.log(`✅ Console capture script injected into ${injectedCount} HTML files`);
  } catch (error) {
    console.error('❌ Error during console capture injection:', error.message);
  }
}

// Run the injection
injectConsoleCapture();