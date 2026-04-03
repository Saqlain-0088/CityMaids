import React, { useState } from 'react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  label: string
}

export default function BeforeAfterSlider({ before, after, label }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    let x = 0
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
    } else {
      x = e.clientX - rect.left
    }
    const percent = (x / rect.width) * 100
    setSliderPos(Math.min(Math.max(percent, 0), 100))
  }

  return (
    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl group cursor-col-resize select-none border-4 border-white/10"
         onMouseMove={handleMove}
         onTouchMove={handleMove}>
      
      {/* Before Image (underneath) */}
      <div className="absolute inset-0">
        <img src={before} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 bg-slate-900/60 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest">
          Before
        </div>
      </div>

      {/* After Image (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <img src={after} alt="After" className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full border border-primary-400 uppercase tracking-widest">
          After
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
           style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-primary-500">
          <div className="flex gap-1.5 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
          </div>
        </div>
      </div>

      {/* Label Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-white font-bold text-sm z-20">
        {label}
      </div>
    </div>
  )
}
