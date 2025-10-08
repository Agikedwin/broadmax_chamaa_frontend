import useCardAnimation from '../../hooks/useCardAnimation';

const Card = ({ children, className, onClick }) => {
  const { cardRef, animateHover, animateHoverExit } = useCardAnimation();
  // No need for useEffect here anymore!

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-md p-6 ${className}`}
      onClick={onClick}
      onMouseEnter={animateHover}
      onMouseLeave={animateHoverExit}
    >
      {children}
    </div>
  )
}

export default Card;