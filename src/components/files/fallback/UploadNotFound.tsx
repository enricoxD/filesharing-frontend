import Lottie, {LottieRefCurrentProps} from "lottie-react"
import notFoundAnimationData from "@/assets/lottie/not_found.json"
import {useRef, useState} from "react";

export const UploadNotFound = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationDirection, setAnimationDirection] = useState<1 | -1>(1)

  return <div className={"fallback section"}>
    <h2>Not Found</h2>
    <p>The requested data could not be found.</p>
    <Lottie
      id={"lottie"}
      onComplete={() => {
        setTimeout(() => {
          const newDirection = (animationDirection * -1) as 1 | -1
          lottieRef.current?.setDirection(newDirection);
          lottieRef.current?.play();
          setAnimationDirection(newDirection)
        }, 750)
      }}
      lottieRef={lottieRef}
      animationData={notFoundAnimationData}
      loop={false}
    />
  </div>
}