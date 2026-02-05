
(function() {
  const nameElement = document.querySelector('h1[data-translate="name"]');
  if (!nameElement) return;

  const text = nameElement.textContent.trim() || "Ja4tin Ye";
  
  // Configuration
  const config = {
    pauseBetweenAnimations: 6000, // 每一轮动画结束后暂停的时间 (毫秒)
    blurAmount: '2px',
    borderColor: '#0011ff',
    stepDuration: 4000 // 每一个单词高亮的时间 (毫秒) - 调大这个值可以减慢切换速度
  };

  nameElement.innerHTML = '';
  
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-flex';
  wrapper.style.gap = '12px';
  nameElement.appendChild(wrapper);

  const words = text.split(' ');
  const wordElements = [];

  words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.color = '#fff';
      span.style.filter = `blur(${config.blurAmount})`;
      span.style.opacity = '0.5';
      span.style.transition = 'filter 0.5s, opacity 0.5s'; // Slower transition
      span.style.whiteSpace = 'nowrap';
      wrapper.appendChild(span);
      wordElements.push(span);
  });

  const box = document.createElement('div');
  box.style.position = 'absolute';
  // box.style.border = `1px solid ${config.borderColor}`; // Removed full border
  box.style.borderRadius = '3px';
  box.style.pointerEvents = 'none';
  box.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'; 
  box.style.opacity = '0';
  box.style.zIndex = '10';
  
  // Create corners
  const cornerLength = '8px';
  const cornerWidth = '2px';
  
  const createCorner = (top, left, right, bottom) => {
      const corner = document.createElement('div');
      corner.style.position = 'absolute';
      corner.style.width = cornerLength;
      corner.style.height = cornerLength;
      corner.style.borderColor = config.borderColor;
      corner.style.borderStyle = 'solid';
      corner.style.borderWidth = '0';
      
      if (top) corner.style.top = '-2px';
      if (bottom) corner.style.bottom = '-2px';
      if (left) corner.style.left = '-2px';
      if (right) corner.style.right = '-2px';
      
      if (top && left) corner.style.borderTopWidth = cornerWidth;
      if (top && left) corner.style.borderLeftWidth = cornerWidth;
      
      if (top && right) corner.style.borderTopWidth = cornerWidth;
      if (top && right) corner.style.borderRightWidth = cornerWidth;
      
      if (bottom && left) corner.style.borderBottomWidth = cornerWidth;
      if (bottom && left) corner.style.borderLeftWidth = cornerWidth;
      
      if (bottom && right) corner.style.borderBottomWidth = cornerWidth;
      if (bottom && right) corner.style.borderRightWidth = cornerWidth;
      
      return corner;
  };

  box.appendChild(createCorner(true, true, false, false)); // Top-Left
  box.appendChild(createCorner(true, false, true, false)); // Top-Right
  box.appendChild(createCorner(false, true, false, true)); // Bottom-Left
  box.appendChild(createCorner(false, false, true, true)); // Bottom-Right

  wrapper.appendChild(box);

  let currentIndex = 0;
  
  function loop() {
      // Reset all to blur
      wordElements.forEach(s => {
          s.style.filter = `blur(${config.blurAmount})`;
          s.style.opacity = '0.5';
      });

      if (currentIndex >= wordElements.length) {
          box.style.opacity = '0';
          setTimeout(() => {
              currentIndex = 0;
              loop();
          }, config.pauseDuration);
          return;
      }

      const target = wordElements[currentIndex];
      target.style.filter = 'blur(0px)';
      target.style.opacity = '1';
      
      // Calculate position relative to wrapper
      if (target.parentElement === wrapper) {
           box.style.width = `${target.offsetWidth + 12}px`;
           box.style.height = `${target.offsetHeight + 4}px`;
           box.style.left = `${target.offsetLeft - 6}px`;
           box.style.top = `${target.offsetTop - 2}px`;
           box.style.opacity = '1';
      }

      currentIndex++;
      setTimeout(loop, config.stepDuration); 
  }
  
  // Start delay
  setTimeout(loop, 500);

})();
