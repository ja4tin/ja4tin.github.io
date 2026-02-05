import { useCallback, useEffect, useRef, useState } from 'react';
import './target-cursor.css';

interface TargetCursorProps {
  targetSelector?: string;
  hideDefaultCursor?: boolean;
  spinDuration?: number;
  spinEase?: string;
}

const TargetCursor = ({
  targetSelector = '.cursor-target',
  hideDefaultCursor = true,
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isTargeting, setIsTargeting] = useState(false);
  const [targetBounds, setTargetBounds] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const moveCursor = useCallback((x: number, y: number) => {
    setCursorPos({ x, y });
  }, []);

  useEffect(() => {
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    let activeTarget: HTMLElement | null = null;

    const moveHandler = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY);
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as HTMLElement;

      const allTargets: HTMLElement[] = [];
      let current: HTMLElement | null = directTarget;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }

      const target = allTargets[0] || null;
      if (!target) return;

      if (activeTarget === target) return;

      activeTarget = target;
      setIsTargeting(true);
      setTargetBounds(target.getBoundingClientRect());

      const leaveHandler = () => {
        activeTarget = null;
        setIsTargeting(false);
        setTargetBounds(null);
        target.removeEventListener('mouseleave', leaveHandler);
      };

      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, moveCursor, hideDefaultCursor, isVisible]);

  const getCornerPositions = () => {
    if (!targetBounds) return null;

    const cornerSize = 12;
    const borderWidth = 3;

    return {
      topLeft: {
        x: targetBounds.left - cursorPos.x - borderWidth,
        y: targetBounds.top - cursorPos.y - borderWidth,
      },
      topRight: {
        x: targetBounds.right - cursorPos.x + borderWidth - cornerSize,
        y: targetBounds.top - cursorPos.y - borderWidth,
      },
      bottomRight: {
        x: targetBounds.right - cursorPos.x + borderWidth - cornerSize,
        y: targetBounds.bottom - cursorPos.y + borderWidth - cornerSize,
      },
      bottomLeft: {
        x: targetBounds.left - cursorPos.x - borderWidth,
        y: targetBounds.bottom - cursorPos.y + borderWidth - cornerSize,
      },
    };
  };

  const cornerPositions = getCornerPositions();

  return (
    <div
      ref={cursorRef}
      className="target-cursor"
      style={{
        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div
        className={`target-cursor-center ${!isTargeting ? 'spinning' : ''}`}
      />
      <div
        className="target-cursor-corner target-cursor-corner--top-left"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.topLeft.x}px, ${cornerPositions.topLeft.y}px)`
              : undefined,
        }}
      />
      <div
        className="target-cursor-corner target-cursor-corner--top-right"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.topRight.x}px, ${cornerPositions.topRight.y}px)`
              : undefined,
        }}
      />
      <div
        className="target-cursor-corner target-cursor-corner--bottom-right"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.bottomRight.x}px, ${cornerPositions.bottomRight.y}px)`
              : undefined,
        }}
      />
      <div
        className="target-cursor-corner target-cursor-corner--bottom-left"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.bottomLeft.x}px, ${cornerPositions.bottomLeft.y}px)`
              : undefined,
        }}
      />
    </div>
  );
};

export default TargetCursor;
