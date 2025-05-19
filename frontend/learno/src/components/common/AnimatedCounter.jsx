import { useState, useEffect } from "react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

const AnimatedCounter = ({ end, duration = 2, prefix = "", suffix = "", decimals = 0 }) => {
  const [isCounterStarted, setIsCounterStarted] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !isCounterStarted) {
      setIsCounterStarted(true)
    }
  }, [inView, isCounterStarted])

  return (
    <div ref={ref} className="animated-counter">
      {isCounterStarted ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          separator=","
        />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </div>
  )
}

export default AnimatedCounter
