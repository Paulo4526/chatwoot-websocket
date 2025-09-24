'use client';

import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React, { useRef, useState, useEffect } from "react";

interface PlayButtonProps {
  url: string;
}

export default function PlayButton({ url }: PlayButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const updateTime = () => {
    const audio = audioRef.current;
    if (audio && !dragging) setCurrentTime(audio.currentTime);
    animationRef.current = requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (playing) animationRef.current = requestAnimationFrame(updateTime);
    else if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, [playing]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Mostra tempo decorrido / total ou total se não começou
  const displayedTime =
    currentTime === 0
      ? formatTime(duration)
      : `${formatTime(currentTime)} / ${formatTime(duration)}`;

  return (
    <Flex
      align="center"
      gap="2"
      style={{
        width: '150px',
        padding: "4px 8px",
        borderRadius: 8,
        position: "relative",
      }}
    >
      {/* Botão play/pause */}
      <Button
        onClick={togglePlay}
        style={{ width: 32, height: 32, display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Button>

      {/* Barra de progresso */}
      <input
        type="range"
        min={0}
        max={100}
        value={duration ? (currentTime / duration) * 100 : 0}
        onChange={handleChange}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onMouseMove={(e) => {
          if (!duration) return;
          const target = e.currentTarget;
          const rect = target.getBoundingClientRect();
          const percent = ((e.clientX - rect.left) / rect.width) * 100;
          setHoverTime(Math.min(Math.max(percent, 0), 100));
        }}
        onMouseLeave={() => setHoverTime(null)}
        style={{
          flex: 1,
          height: 4,
          borderRadius: 2,
          background: "#e0e0e0",
          cursor: "pointer",
          width:'20px'
        }}
      />

      {/* Tempo */}
      <Text size="1" align="right" style={{ minWidth: 50, fontSize: 10 }}>
        {displayedTime}
      </Text>

      {/* Tooltip */}
      {hoverTime !== null && duration > 0 && (
        <Text
          size="1"
          style={{
            position: "absolute",
            left: `${hoverTime}%`,
            top: -18,
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "2px 4px",
            borderRadius: 3,
            whiteSpace: "nowrap",
            fontSize: 9,
          }}
        >
          {formatTime((hoverTime / 100) * duration)}
        </Text>
      )}
    </Flex>
  );
}
