import { useEffect, useRef, useState } from 'react';
import { mapData } from '../../constants/projectsData';
import { SLIDE_IDS } from '../../constants/slideIds';
import './MiniMap.css';

interface NavItemProps {
  node: (typeof mapData)[0];
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ node, isActive, onClick }) => {
  const itemClass = `nav-item ${isActive ? 'active' : ''}`;

  return (
    <div className={itemClass} onClick={onClick} data-step-id={node.id}>
      <span className="nav-icon">
        <i className={node.icon}></i>
      </span>
      <span className="nav-text">{node.name}</span>
    </div>
  );
};

const MiniMap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(
    location.hash.slice(1)
      ? (location.hash.slice(1) as string).replace('/', '')
      : SLIDE_IDS.TITLE,
  );
  const miniMapRef = useRef<HTMLDivElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStepChange = (event: Event) => {
      const stepId = (event.target as Element).id;
      setActiveNodeId(stepId);
    };

    document.addEventListener('impress:stepenter', handleStepChange);

    return () => {
      document.removeEventListener('impress:stepenter', handleStepChange);
    };
  }, []);

  // 自动滚动到当前活动项目
  useEffect(() => {
    if (!navContentRef.current || !isVisible) return;

    const activeElement = navContentRef.current.querySelector(
      `[data-step-id="${activeNodeId}"]`,
    ) as HTMLElement;
    if (activeElement) {
      const container = navContentRef.current;
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      const scrollTop = container.scrollTop;

      // 计算元素是否在可视区域内
      const isElementVisible =
        elementTop >= scrollTop &&
        elementTop + elementHeight <= scrollTop + containerHeight;

      if (!isElementVisible) {
        scrollToActiveItem();
      }
    }
  }, [activeNodeId, isVisible]);

  const handleNodeClick = (nodeId: string) => {
    const currentIndex = mapData.findIndex((item) => item.id === activeNodeId);
    const targetIndex = mapData.findIndex((item) => item.id === nodeId);

    setActiveNodeId(nodeId);

    if (window.impress) {
      // 如果距离较远，添加平滑过渡效果
      const distance = Math.abs(targetIndex - currentIndex);
      if (distance > 1) {
        // 对于远距离跳转，使用较慢的过渡
        const impressInstance = window.impress();
        const originalDuration = document
          .getElementById('impress')
          ?.getAttribute('data-transition-duration');
        document
          .getElementById('impress')
          ?.setAttribute('data-transition-duration', '1500');

        impressInstance.goto(nodeId);

        // 恢复原始过渡时间
        setTimeout(() => {
          if (originalDuration) {
            document
              .getElementById('impress')
              ?.setAttribute('data-transition-duration', originalDuration);
          }
        }, 1500);
      } else {
        window.impress().goto(nodeId);
      }
    }
  };

  // 滚动到活动项目的函数
  const scrollToActiveItem = () => {
    if (!navContentRef.current) return;

    const activeElement = navContentRef.current.querySelector(
      `[data-step-id="${activeNodeId}"]`,
    ) as HTMLElement;
    if (activeElement) {
      const container = navContentRef.current;
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;

      // 计算滚动位置，使活动元素居中显示
      const targetScrollTop =
        elementTop - containerHeight / 2 + elementHeight / 2;

      // 平滑滚动
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleToggleMiniMap = () => {
      const newVisibleState = !isVisible;
      setIsVisible(newVisibleState);

      if (newVisibleState) {
        setTimeout(() => {
          scrollToActiveItem();
        }, 500); // 等待显示动画完成
      }
    };

    window.addEventListener('toggleMiniMap', handleToggleMiniMap);

    return () => {
      window.removeEventListener('toggleMiniMap', handleToggleMiniMap);
    };
  }, [isVisible]);

  const getNavigationContext = () => {
    const currentIndex = mapData.findIndex((item) => item.id === activeNodeId);
    return { currentIndex };
  };

  const getVisibleItems = () => {
    return mapData;
  };

  const { currentIndex } = getNavigationContext();

  return (
    <div
      className={`nav-list ${isVisible ? 'visible' : 'hidden'}`}
      id="miniMap"
      ref={miniMapRef}
    >
      <div className="nav-header">
        <span>
          <i className="fas fa-map"></i>
          <span className="nav-progress">
            {currentIndex + 1}/{mapData.length}
          </span>
        </span>
      </div>

      <div className="nav-content" ref={navContentRef}>
        {getVisibleItems().map((node) => (
          <NavItem
            key={node.id}
            node={node}
            isActive={activeNodeId === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniMap;
