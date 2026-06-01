'use client';

import { useServerInsertedHTML } from 'next/navigation';

export default function BraveShieldFix() {
  useServerInsertedHTML(() => (
    <script
      id="brave-shield-fix"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // 1. Clean up and observe bis_skin_checked attributes immediately as DOM is parsed
            if (document.documentElement.hasAttribute('bis_skin_checked')) {
              document.documentElement.removeAttribute('bis_skin_checked');
            }
            
            var observer = new MutationObserver(function(mutations) {
              for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                  m.target.removeAttribute('bis_skin_checked');
                } else if (m.type === 'childList') {
                  for (var j = 0; j < m.addedNodes.length; j++) {
                    var node = m.addedNodes[j];
                    if (node.nodeType === 1) {
                      if (node.hasAttribute('bis_skin_checked')) {
                        node.removeAttribute('bis_skin_checked');
                      }
                      var elements = node.querySelectorAll('[bis_skin_checked]');
                      for (var k = 0; k < elements.length; k++) {
                        elements[k].removeAttribute('bis_skin_checked');
                      }
                    }
                  }
                }
              }
            });
            
            observer.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ['bis_skin_checked'],
              childList: true,
              subtree: true
            });
            
            setTimeout(function() { observer.disconnect(); }, 10000);

            // 2. Intercept console.error to silence hydration warnings caused by bis_skin_checked/cosmetic extensions
            var originalError = console.error;
            console.error = function() {
              var msg = "";
              for (var i = 0; i < arguments.length; i++) {
                try {
                  msg += " " + String(arguments[i]);
                } catch(e) {}
              }
              if (
                msg.indexOf('bis_skin_checked') !== -1 ||
                msg.indexOf('BraveShieldFix') !== -1 ||
                msg.indexOf('hydration-mismatch') !== -1 ||
                msg.indexOf('Hydration Mismatch') !== -1 ||
                msg.indexOf('did not match') !== -1 ||
                msg.indexOf('Server-rendered HTML') !== -1 ||
                msg.indexOf('SuppressHydrationWarning') !== -1 ||
                msg.indexOf('suppressHydrationWarning') !== -1
              ) {
                return;
              }
              originalError.apply(console, arguments);
            };
          })();
        `
      }}
    />
  ));

  return null;
}


