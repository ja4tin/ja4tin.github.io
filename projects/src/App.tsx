import { useEffect } from 'react';
import './App.css';
import MiniMap from './components/MiniMap/MiniMap';
import OverviewSlide from './components/OverviewSlide/OverviewSlide';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ProjectSlide from './components/ProjectSlide/ProjectSlide';
import TitleSlide from './components/TitleSlide/TitleSlide';
import Toolbar from './components/Toolbar/Toolbar';
import TargetCursor from './components/ui/target-cursor';
import { IMPRESS_CONFIG } from './constants/impressConfig';
import { projectsData } from './constants/projectsData';
import { SLIDE_IDS } from './constants/slideIds';

function App() {
  useEffect(() => {
    let isOverviewMode = false;

    const handleStepEnter = (event: Event) => {
      const currentStepId = (event.target as Element).id;

      if (currentStepId === SLIDE_IDS.OVERVIEW) {
        isOverviewMode = true;
        resetAllStepsOpacity();
      } else {
        isOverviewMode = false;
        updateSlideOpacity(currentStepId);
      }
    };

    const handleStepLeave = (event: Event) => {
      if (!isOverviewMode) {
        const leavingStepId = (event.target as Element).id;
        const leavingStep = document.getElementById(leavingStepId);
        if (leavingStep && leavingStepId !== SLIDE_IDS.OVERVIEW) {
          leavingStep.classList.add('transitioning');
          setTimeout(() => {
            leavingStep.classList.remove('transitioning');
          }, 1000);
        }
      }
    };

    const updateSlideOpacity = (activeStepId: string) => {
      if (activeStepId === SLIDE_IDS.OVERVIEW) {
        return;
      }

      const allSteps = document.querySelectorAll('.step');

      allSteps.forEach((step) => {
        const stepElement = step as HTMLElement;

        stepElement.classList.remove('transitioning');

        if (stepElement.id === activeStepId) {
          stepElement.style.opacity = '1';
          stepElement.style.transition = 'opacity 0.8s ease-out';
          stepElement.style.pointerEvents = 'auto';
        } else {
          stepElement.style.opacity = '0.4';
          stepElement.style.transition = 'opacity 0.6s ease-out';
          stepElement.style.pointerEvents = 'none';
        }
      });
    };

    const resetAllStepsOpacity = () => {
      const allSteps = document.querySelectorAll(
        `.step:not(#${SLIDE_IDS.OVERVIEW})`,
      );

      allSteps.forEach((step) => {
        const stepElement = step as HTMLElement;
        stepElement.style.opacity = '1';
        stepElement.style.transition = 'opacity 0.3s ease';
        stepElement.style.pointerEvents = 'auto';
      });
    };

    const handleOverviewChange = () => {
      const impressElement = document.getElementById('impress');
      if (impressElement) {
        isOverviewMode = impressElement.classList.contains(
          'impress-on-overview',
        );

        if (isOverviewMode) {
          resetAllStepsOpacity();
        } else {
          const activeStep = document.querySelector('.step.active');
          if (activeStep) {
            updateSlideOpacity(activeStep.id);
          }
        }
      }
    };

    const updateImpressDimensions = () => {
      const impressElement = document.getElementById('impress');
      if (impressElement) {
        impressElement.setAttribute('data-width', IMPRESS_CONFIG.WIDTH);
        impressElement.setAttribute('data-height', IMPRESS_CONFIG.HEIGHT);
      }
    };

    const handleResize = () => {
      updateImpressDimensions();
    };

    const initializeOpacity = () => {
      const activeStep = document.querySelector('.step.active');
      if (activeStep) {
        updateSlideOpacity(activeStep.id);
      }
    };

    document.addEventListener('impress:stepenter', handleStepEnter);
    document.addEventListener('impress:stepleave', handleStepLeave);
    window.addEventListener('resize', handleResize);

    const impressElement = document.getElementById('impress');
    let observer: MutationObserver | null = null;

    if (impressElement) {
      observer = new MutationObserver(handleOverviewChange);
      observer.observe(impressElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    if (window.impress) {
      window.impress().init();
    }

    initializeOpacity();
    updateImpressDimensions();

    return () => {
      document.removeEventListener('impress:stepenter', handleStepEnter);
      document.removeEventListener('impress:stepleave', handleStepLeave);
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="App">
      <ProgressBar />

      <div
        id="impress"
        data-transition-duration={IMPRESS_CONFIG.TRANSITION_DURATION}
        data-max-scale={IMPRESS_CONFIG.MAX_SCALE}
        data-min-scale={IMPRESS_CONFIG.MIN_SCALE}
        data-perspective={IMPRESS_CONFIG.PERSPECTIVE}
        data-width={IMPRESS_CONFIG.WIDTH}
        data-height={IMPRESS_CONFIG.HEIGHT}
      >
        <TitleSlide />

        {projectsData.map((project) => (
          <ProjectSlide key={project.id} project={project} />
        ))}

        <OverviewSlide />
      </div>

      <MiniMap />
      <Toolbar />

      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
    </div>
  );
}

export default App;
