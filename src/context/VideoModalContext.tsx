import React, { createContext, useContext, useState } from 'react'
import { VideoModal } from '../components/VideoModal'

interface VideoData {
  title: string
  videoId: string
  description: string
  category: string
  date: string
}

interface VideoModalContextType {
  openModal: (data: VideoData) => void
  closeModal: () => void
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined)

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [videoData, setVideoData] = useState<VideoData | null>(null)

  const openModal = (data: VideoData) => {
    setVideoData(data)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <VideoModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <VideoModal isOpen={isOpen} onClose={closeModal} videoData={videoData} />
    </VideoModalContext.Provider>
  )
}

export function useVideoModal() {
  const context = useContext(VideoModalContext)
  if (!context) {
    throw new Error('useVideoModal must be used within a VideoModalProvider')
  }
  return context
}
