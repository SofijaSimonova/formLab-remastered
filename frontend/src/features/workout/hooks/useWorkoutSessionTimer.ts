import { useEffect, useState } from 'react'

export function useWorkoutSessionTimer(
    startedAt: string | undefined,
) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0)

    useEffect(() => {
        if (!startedAt) {
            setElapsedSeconds(0)
            return
        }

        const startedAtMs = new Date(startedAt).getTime()

        const updateElapsed = () => {
            const elapsed = Math.max(
                0,
                Math.floor(
                    (Date.now() - startedAtMs) / 1000,
                ),
            )

            setElapsedSeconds(elapsed)
        }

        updateElapsed()

        const intervalId = window.setInterval(
            updateElapsed,
            1000,
        )

        return () => {
            window.clearInterval(intervalId)
        }
    }, [startedAt])

    return elapsedSeconds
}