import { useEffect, useRef } from "react";
import styles from "./Snowfall.module.css";
function SnowfallCanvas({ snowflakeCount = 150 }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const snowflakes = [];
        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.5 + 0.5,
            });
        }
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = `rgba(255, 255, 255, ${snowflakes[0].opacity})`;
            ctx.beginPath();
            snowflakes.forEach((flake) => {
                ctx.moveTo(flake.x, flake.y);
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            });
            ctx.fill();
        };
        const update = () => {
            snowflakes.forEach((flake) => {
                flake.y += flake.speed;
                if (flake.y > canvas.height) {
                    flake.y = -flake.radius; // Reset to the top
                    flake.x = Math.random() * canvas.width; // Give it a new horizontal position
                }
            });
        };
        let animationFrameId;
        const animate = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animate);
    }, [snowflakeCount]);
    return (
        <canvas
            ref={canvasRef}
            className={`${styles["snowfall-canvas"]}`}
        ></canvas>
    );
}
export default SnowfallCanvas;
