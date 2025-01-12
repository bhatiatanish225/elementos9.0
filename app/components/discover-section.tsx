import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function DiscoverSection() {
  const events = [
    {
      title: "Pre-Event Activities: Flashmob and Logo Reveal",
      description:
        "A flashmob to create excitement and a logo reveal to officially announce the event.",
      date: "January 30",
      eventName: "preEvent",
    },
    {
      title: "Opening Ceremony",
      description:
        "Includes a lighting ceremony by President Hemdutt Joshi Sir, welcome speech, and a guest speaker session.",
      date: "January 31",
      eventName: "openingCeremony",
    },
    {
      title: "UI/UX Event",
      description: "An online event focusing on UI/UX design.",
      date: "January 31",
      eventName: "uiux",
    },
    {
      title: "Prompt vs Prompt",
      description:
        "Participants compete by responding to given prompts with creativity or logic.",
      date: "February 1",
      eventName: "promptVsPrompt",
    },
    {
      title: "Electronics Competition",
      description: "A competition testing skills in electronics.",
      date: "February 1",
      eventName: "electronics",
    },
    {
      title: "Hackathon/Case Study",
      description:
        "An overnight event where teams solve a problem or develop a solution, ending at 8:00 AM the next day.",
      date: "February 1",
      eventName: "hackathon",
    },
    {
      title: "Bug Bounty",
      description: "A competitive event focused on finding and fixing bugs.",
      date: "February 2",
      eventName: "bugBounty",
    },
    {
      title: "Buggy Racing",
      description: "A fun and competitive buggy racing event.",
      date: "February 2",
      eventName: "buggyRacing",
    },
    {
      title: "Closing Ceremony",
      description:
        "Includes a quiz, prize distribution, event highlights, and a closing speech.",
      date: "February 2",
      eventName: "closingCeremony",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const characterRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return undefined
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (characterRef.current) {
      const { left, top } = characterRef.current.getBoundingClientRect()
      const x = e.clientX - left - 50
      const y = e.clientY - top - 50
      setMousePosition({ x, y })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="w-full relative overflow-hidden" id="event">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF2D78]/5 to-transparent" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className={`w-8 h-8 ${i % 2 === 0 ? 'bg-[#FF2D78]' : 'bg-[#00FFD1]'} opacity-10 rounded-full blur-sm`} />
          </div>
        ))}
      </div>

      {/* Squid Game Character */}
      <div 
        ref={characterRef}
        className="fixed bottom-8 right-8 z-50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div 
          className="w-[100px] h-[100px] relative transition-all duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        >
          <Image
            src="/squichar.png"
            alt="Squid Game Character"
            width={100}
            height={100}
            className={`animate-float transform-gpu transition-all duration-300 ${
              isHovering ? 'scale-110 brightness-110' : ''
            }`}
            priority
          />
          {/* Character Glow Effect */}
          <div className={`absolute inset-0 bg-[#FF2D78] rounded-full blur-xl opacity-0 transition-opacity duration-300 ${
            isHovering ? 'opacity-20' : ''
          }`} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-[#FF2D78] font-['Roboto_Mono'] text-center relative">
          <span className="relative">
            ENTER THE EVENTS
            <div className="absolute -inset-x-6 -inset-y-3 bg-[#FF2D78]/10 blur-xl -z-10" />
          </span>
        </h2>
      </div>
      
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {events.map((event, index) => (
              <div className="flex-[0_0_100%] min-w-0" key={index}>
                <div className="container mx-auto px-4">
                  <Card
                    desc={event.description}
                    title={event.title}
                    date={event.date}
                    eventName={event.eventName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="container mx-auto px-4 relative">
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-3 rounded-full"
            onClick={scrollPrev}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-3 rounded-full"
            onClick={scrollNext}
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-[#CCFF00] w-6' : 'bg-gray-400'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverSection;

function Card({
  title,
  date,
  desc,
  eventName,
}: {
  title: string;
  date: string;
  desc: string;
  eventName: string;
}) {
  const router = useRouter();

  return (
    <div className="bg-[#1A1B35] rounded-3xl p-10 md:p-16 max-w-5xl mx-auto border-4 border-[#FF2D78] relative overflow-hidden shadow-[0_0_30px_rgba(255,45,120,0.4)] hover:shadow-[0_0_50px_rgba(255,45,120,0.6)] transition-all duration-500 group">
      {/* Circular Date Badge */}
      <div className="absolute -top-4 -right-4 transform rotate-12 z-20">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#FF2D78] blur-xl opacity-50 rounded-full" />
          {/* Main circular badge */}
          <div className="relative bg-[#FF2D78] text-white w-32 h-32 rounded-full border-2 border-white/20 flex flex-col items-center justify-center">
            {/* Mask Icon */}
            {/* <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-7 h-7 bg-[#FF2D78]" style={{ maskImage: "url('/mask-icon.svg')" }} />
            </div> */}
            {/* Date Text */}
            <span className="font-black text-4xl leading-none mb-1">{date.split(' ')[1]}</span>
            <span className="font-bold text-sm uppercase">{date.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D78]/5 via-transparent to-[#00FFD1]/5" />
      <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
      
      {/* Content with enhanced comic styling */}
      <div className="space-y-8 relative z-10">
        <h3 className="text-4xl md:text-6xl font-black text-white font-['Roboto_Mono'] group-hover:text-[#FF2D78] transition-colors duration-300 leading-tight">
          {title}
          <div className="absolute -inset-x-6 -inset-y-3 bg-[#FF2D78]/10 blur-xl -z-10 group-hover:bg-[#FF2D78]/20 transition-all duration-300" />
        </h3>
        
        <p className="text-[#00FFD1] text-xl md:text-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 font-medium border-l-4 border-[#00FFD1] pl-6">
          {desc}
        </p>
        
        {/* Squid Game-styled button */}
        <button
          onClick={() => router.push(`/register/${eventName}`)}
          className="group/btn relative w-full sm:w-auto"
        >
          <div className="absolute inset-0 bg-[#FF2D78] transform skew-x-6 rounded-xl transition-all duration-300 group-hover/btn:bg-[#00FFD1] blur-lg opacity-50" />
          <div className="relative bg-[#FF2D78] text-white text-3xl font-black px-12 py-6 rounded-xl transform -skew-x-6 transition-all duration-300 group-hover/btn:bg-[#00FFD1] group-hover/btn:text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 flex items-center justify-center gap-4 border-2 border-white/20">
            ENTER GAME
            <ArrowRight className="h-8 w-8 group-hover/btn:translate-x-2 transition-transform" />
          </div>
        </button>
      </div>

      {/* Squid Game-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#FF2D78]/20" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#00FFD1]/20" />
      
      {/* Diagonal lines */}
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white/50 w-full"
            style={{
              transform: `rotate(45deg) translateY(${i * 8}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
