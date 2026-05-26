(function() {
  const observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
        mutation.target.removeAttribute('bis_skin_checked');
      } else if (mutation.type === 'childList') {
        for (let j = 0; j < mutation.addedNodes.length; j++) {
          const node = mutation.addedNodes[j];
          if (node.nodeType === 1) {
            if (node.hasAttribute('bis_skin_checked')) {
              node.removeAttribute('bis_skin_checked');
            }
            const elements = node.querySelectorAll('[bis_skin_checked]');
            for (let k = 0; k < elements.length; k++) {
              elements[k].removeAttribute('bis_skin_checked');
            }
          }
        }
      }
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['bis_skin_checked']
  });
})();
