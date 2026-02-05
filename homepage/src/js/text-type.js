(function() {
  const element = document.getElementById('signature');
  if (!element) return;

  // Use the window.signature global or fallback to current text
  // window.signature is set in scripts.pug from original-content, or likely just textContent if not present.
  // Given scripts.pug sets window.signature, we should respect it or use it.
  // Actually, main.pug sets #{main.signature} as text content.
  // Let's use the text content as the source.
  const textToType = element.textContent || element.innerText;
  
  // Clear content initially
  element.textContent = '';
  
  const config = {
    typingSpeed: 90,
    pauseDuration: 3000,
    cursorChar: '▋',
    deletingSpeed: 80
  };

  let charIndex = 0;
  let isDeleting = false;
  let text = textToType;

  function type() {
    const currentText = isDeleting
      ? text.substring(0, charIndex - 1)
      : text.substring(0, charIndex + 1);

    element.textContent = currentText + config.cursorChar;

    if (!isDeleting && charIndex === text.length) {
      // Finished typing, wait before deleting
      isDeleting = true;
      setTimeout(type, config.pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, wait before retyping
      isDeleting = false;
      setTimeout(type, 500); 
    } else {
      // Continue typing or deleting
      const speed = isDeleting ? config.deletingSpeed : config.typingSpeed;
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setTimeout(type, speed);
    }
  }

  // Initial delay start
  setTimeout(type, 1000);
})();
