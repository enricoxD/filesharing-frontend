import Lottie, {LottieRefCurrentProps} from "lottie-react"
import loadingAnimationData from "@/assets/lottie/loading.json"
import {useRef, useState} from "react";

export const Loading = () => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [animationDirection, setAnimationDirection] = useState<1 | -1>(1)

    return <div className={"fallback section"}>
        <h2>Loading...</h2>
        <p>Fetching your requested data, please wait.</p>
        <Lottie
            id={"lottie"}
            onComplete={() => {
                setTimeout(() => {
                    const newDirection = (animationDirection * -1) as 1 | -1
                    lottieRef.current?.setDirection(newDirection);
                    lottieRef.current?.play();
                    setAnimationDirection(newDirection)
                }, 350)
            }}
            lottieRef={lottieRef}
            animationData={loadingAnimationData}
            loop={false}
        />
    </div>
}