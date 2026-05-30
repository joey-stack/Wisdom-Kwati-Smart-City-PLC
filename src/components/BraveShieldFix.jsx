'use client';

import { useServerInsertedHTML } from 'next/navigation';

export default function BraveShieldFix() {
  useServerInsertedHTML(() => (
    <script
      id="brave-shield-fix"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var observer = new MutationObserver(function(mutations) {
              for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].attributeName === 'bis_skin_checked') {
                  mutations[i].target.removeAttribute('bis_skin_checked');
                }
              }
            });
            observer.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ['bis_skin_checked'],
              subtree: true
            });
            setTimeout(function() { observer.disconnect(); }, 5000);
          })();
        `
      }}
    />
  ));

  return null;
}

