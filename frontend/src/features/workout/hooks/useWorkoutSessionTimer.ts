import { useEffect, useState } from 'react'
import {SESSION_TIMER_INTERVAL_MS} from "../../../constraints/app.constants";



export function useWorkoutSessionTimer(
    startedAt: string | undefined,
) {
    const [elapsedSeconds, setElapsedSeconds] =
        useState(0)

    useEffect(() => {
        if (!startedAt) {
            setElapsedSeconds(0)
            return
        }

        const startedAtMs =
            new Date(startedAt).getTime()

        if (Number.isNaN(startedAtMs)) {
            setElapsedSeconds(0)
            return
        }

        const updateElapsed = () => {
            const elapsed = Math.max(
                0,
                Math.floor(
                    (Date.now() - startedAtMs) /
                    1000,
                ),
            )

            setElapsedSeconds(elapsed)
        }

        updateElapsed()

        const intervalId = window.setInterval(
            updateElapsed,
            SESSION_TIMER_INTERVAL_MS,
        )

        return () => {
            window.clearInterval(intervalId)
        }
    }, [startedAt])

    return elapsedSeconds
}