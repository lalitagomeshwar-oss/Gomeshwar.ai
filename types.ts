export interface Chapter {
  id: string;
  title: string;
  content: string;
  bullets: string[];
  visualPrompt?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  chapters?: Chapter[];
}

export type WhiteboardTheme = "greenboard" | "whiteboard";
export type VideoQuality = "1080p" | "720p";

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  volume: number;
  quality: VideoQuality;
  isFitToScreen: boolean;
  isAutoTiltEnabled: boolean;
}

