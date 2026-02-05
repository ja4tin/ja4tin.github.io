import { SLIDE_IDS, SLIDE_POSITIONS } from '../../constants/slideIds';
import { USER_CONFIG } from '../../constants/userConfig';
import { BlurFade } from '../ui/blur-fade';
import './TitleSlide.css';

const TitleSlide = () => {
  const handleSocialClick = (url: string, type: string) => {
    if (type === 'email') {
      window.location.href = url;
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNext = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.impress) {
      window.impress().next()
    }
  };

  return (
    <div
      id={SLIDE_IDS.TITLE}
      className="step title-slide"
      data-x={SLIDE_POSITIONS.TITLE.x}
      data-y={SLIDE_POSITIONS.TITLE.y}
      data-z={SLIDE_POSITIONS.TITLE.z}
    >
      <div className="profile-container">
        <div className="header-section">
          <BlurFade delay={0.2} inView>
            <div className="greeting-section">
              <h1 className="profile-name">
                Hey 👋, I'm <span className="cursor-target">Ja4tin Ye</span>!
              </h1>
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <div
              className="avatar-section cursor-target"
              onClick={() => window.location.href = '/'}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={USER_CONFIG.AVATAR_URL}
                alt={`${USER_CONFIG.NAME} Avatar`}
                className="profile-avatar"
              />
              <div className="status-indicator"></div>
            </div>
          </BlurFade>
        </div>

        <div className="bio-section">
          {USER_CONFIG.BIO.map((line, index) => (
            <BlurFade key={index} delay={0.4 + index * 0.1} inView>
              <p className="bio-line">{line}</p>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.7} inView>
          <div className="social-links">
            {USER_CONFIG.CONTACT_LINKS.map((link, index) => (
              <button
                key={index}
                onClick={() => handleSocialClick(link.url || '', link.type)}
                className={`social-link cursor-target ${link.type === 'wechat' ? 'wechat' : ''}`}
              // title={link.text}
              >
                <i className={link.icon}></i>
              </button>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.9} inView>
          <div className="scroll-hint" onClick={handleNext}>
            <i className="fas fa-chevron-down"></i>
            <span>Explore my works</span>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default TitleSlide;
