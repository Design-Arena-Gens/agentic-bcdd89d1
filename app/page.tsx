'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState(0);
  const [monkeyX, setMonkeyX] = useState(200);
  const [monkeyY, setMonkeyY] = useState(250);
  const [tailWag, setTailWag] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, 800, 600);

      // Background
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, 800, 400);
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(0, 400, 800, 200);

      // Sun
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(700, 80, 40, 0, Math.PI * 2);
      ctx.fill();

      // Scene 0-1: Monkey playing with lion's tail
      if (scene < 2) {
        // Lion body
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(450, 350, 200, 120);

        // Lion head
        ctx.beginPath();
        ctx.arc(550, 330, 60, 0, Math.PI * 2);
        ctx.fill();

        // Lion mane
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(550, 330, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#DAA520';
        ctx.beginPath();
        ctx.arc(550, 330, 60, 0, Math.PI * 2);
        ctx.fill();

        // Lion eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(535, 320, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(565, 320, 5, 0, Math.PI * 2);
        ctx.fill();

        // Lion mouth
        ctx.beginPath();
        ctx.arc(550, 340, 15, 0, Math.PI);
        ctx.stroke();

        // Lion tail (wagging)
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 8;
        ctx.beginPath();
        const tailX = 650;
        const tailY = 410;
        const wagAmount = Math.sin(tailWag) * 30;
        ctx.moveTo(tailX, tailY);
        ctx.quadraticCurveTo(tailX + 30 + wagAmount, tailY - 40, tailX + 60 + wagAmount, tailY);
        ctx.stroke();

        // Tail tuft
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(tailX + 60 + wagAmount, tailY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Monkey
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(monkeyX, monkeyY, 40, 0, Math.PI * 2);
        ctx.fill();

        // Monkey face
        ctx.fillStyle = '#D2B48C';
        ctx.beginPath();
        ctx.arc(monkeyX, monkeyY, 25, 0, Math.PI * 2);
        ctx.fill();

        // Monkey eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(monkeyX - 10, monkeyY - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(monkeyX + 10, monkeyY - 5, 4, 0, Math.PI * 2);
        ctx.fill();

        // Monkey smile
        ctx.beginPath();
        ctx.arc(monkeyX, monkeyY + 5, 10, 0, Math.PI);
        ctx.stroke();

        // Monkey arms reaching for tail
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(monkeyX + 30, monkeyY + 10);
        ctx.lineTo(tailX + 60 + wagAmount - 20, tailY - 10);
        ctx.stroke();

        setTailWag(tailWag + 0.2);

        if (scene === 0) {
          setMonkeyX(monkeyX + 0.5);
          if (monkeyX > 580) setScene(1);
        }
      }

      // Scene 2: Lion turns angry
      if (scene === 2) {
        // Lion body (turning)
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(450, 350, 200, 120);

        // Lion head
        ctx.beginPath();
        ctx.arc(480, 330, 60, 0, Math.PI * 2);
        ctx.fill();

        // Lion mane (spiky/angry)
        ctx.fillStyle = '#8B4513';
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 * i) / 12;
          ctx.beginPath();
          ctx.moveTo(480, 330);
          ctx.lineTo(
            480 + Math.cos(angle) * 90,
            330 + Math.sin(angle) * 90
          );
          ctx.lineWidth = 15;
          ctx.stroke();
        }

        ctx.fillStyle = '#DAA520';
        ctx.beginPath();
        ctx.arc(480, 330, 60, 0, Math.PI * 2);
        ctx.fill();

        // Lion angry eyes
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(465, 320, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(495, 320, 8, 0, Math.PI * 2);
        ctx.fill();

        // Lion open mouth (roaring)
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(480, 350, 20, 0, Math.PI);
        ctx.fill();

        // Sharp teeth
        ctx.fillStyle = '#FFF';
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(460 + i * 10, 350);
          ctx.lineTo(465 + i * 10, 360);
          ctx.lineTo(470 + i * 10, 350);
          ctx.fill();
        }

        // Monkey scared
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(300, monkeyY, 40, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#D2B48C';
        ctx.beginPath();
        ctx.arc(300, monkeyY, 25, 0, Math.PI * 2);
        ctx.fill();

        // Wide scared eyes
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(290, monkeyY - 5, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(310, monkeyY - 5, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(290, monkeyY - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(310, monkeyY - 5, 4, 0, Math.PI * 2);
        ctx.fill();

        // Scared mouth
        ctx.beginPath();
        ctx.arc(300, monkeyY + 10, 8, Math.PI, 0);
        ctx.stroke();
      }

      // Scene 3: Lion chasing monkey
      if (scene === 3) {
        // Lion running
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(350 + animationFrame * 2, 350, 180, 100);

        ctx.beginPath();
        ctx.arc(380 + animationFrame * 2, 340, 50, 0, Math.PI * 2);
        ctx.fill();

        // Running legs
        const legOffset = Math.sin(animationFrame * 0.3) * 20;
        ctx.fillRect(360 + animationFrame * 2, 450 + legOffset, 15, 30);
        ctx.fillRect(390 + animationFrame * 2, 450 - legOffset, 15, 30);
        ctx.fillRect(480 + animationFrame * 2, 450 - legOffset, 15, 30);
        ctx.fillRect(510 + animationFrame * 2, 450 + legOffset, 15, 30);

        // Monkey running away
        ctx.fillStyle = '#8B4513';
        const monkeyRunX = 150 + animationFrame * 1.5;
        ctx.beginPath();
        ctx.arc(monkeyRunX, 280, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#D2B48C';
        ctx.beginPath();
        ctx.arc(monkeyRunX, 280, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scene 4: Lion catches and eats monkey
      if (scene >= 4) {
        // Lion with mouth open
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(300, 350, 200, 120);

        ctx.beginPath();
        ctx.arc(400, 330, 70, 0, Math.PI * 2);
        ctx.fill();

        // Lion mane
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(400, 330, 90, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#DAA520';
        ctx.beginPath();
        ctx.arc(400, 330, 70, 0, Math.PI * 2);
        ctx.fill();

        // Giant open mouth
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(400, 360, 40, 0, Math.PI);
        ctx.fill();

        // Teeth
        ctx.fillStyle = '#FFF';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(360 + i * 10, 360);
          ctx.lineTo(365 + i * 10, 380);
          ctx.lineTo(370 + i * 10, 360);
          ctx.fill();
        }

        if (scene === 4) {
          // Monkey partially visible (being eaten)
          const fadeAmount = Math.min(animationFrame * 2, 255);
          ctx.globalAlpha = 1 - fadeAmount / 255;
          ctx.fillStyle = '#8B4513';
          ctx.beginPath();
          ctx.arc(400, 380, 25, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        if (scene === 5) {
          // Show "THE END" message
          ctx.fillStyle = '#000';
          ctx.font = 'bold 60px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('THE END', 400, 200);

          // Lion satisfied
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(385, 320, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(415, 320, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrame++;

      // Scene progression
      if (scene === 1 && animationFrame > 100) {
        setScene(2);
        animationFrame = 0;
      }
      if (scene === 2 && animationFrame > 60) {
        setScene(3);
        animationFrame = 0;
      }
      if (scene === 3 && animationFrame > 100) {
        setScene(4);
        animationFrame = 0;
      }
      if (scene === 4 && animationFrame > 80) {
        setScene(5);
        animationFrame = 0;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [isPlaying, scene, monkeyX, monkeyY, tailWag]);

  const startAnimation = () => {
    setIsPlaying(true);
    setScene(0);
    setMonkeyX(200);
    setMonkeyY(250);
    setTailWag(0);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        The Monkey and the Lion
      </h1>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: '5px solid white',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          backgroundColor: 'white'
        }}
      />

      <button
        onClick={startAnimation}
        style={{
          marginTop: '30px',
          padding: '15px 40px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying ? 'Restart Story' : 'Play Story'}
      </button>

      <p style={{
        color: 'white',
        marginTop: '20px',
        fontSize: '1.1rem',
        textAlign: 'center',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        {!isPlaying && 'Click the button to watch the story of a playful monkey who learns a dangerous lesson...'}
        {scene === 0 && 'The monkey approaches the sleeping lion...'}
        {scene === 1 && 'The monkey plays with the lion\'s tail!'}
        {scene === 2 && 'The lion wakes up angry!'}
        {scene === 3 && 'The chase begins!'}
        {scene >= 4 && 'The lion catches the monkey...'}
      </p>
    </div>
  );
}
