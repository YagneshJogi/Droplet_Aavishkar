import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 20px;
`;

const WaveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2b6cb0;
  animation: ${waveAnimation} 1s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const LoadingWave = () => {
  return (
    <LoadingContainer>
      <WaveDot delay={0} />
      <WaveDot delay={0.2} />
      <WaveDot delay={0.4} />
    </LoadingContainer>
  );
};

export default LoadingWave; 