import {useCallback, useEffect, useRef, useState,} from 'react'
import {DEFAULT_REST_SECONDS, REST_TIMER_INTERVAL_MS} from "../../../constraints/app.constants";


export function useRestTimer() {
    const [
        remainingSeconds,
        setRemainingSeconds,
    ] = useState(0)

    const endTimeRef =
        useRef<number | null>(null)

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            const endTime =
                endTimeRef.current

            if (endTime === null) {
                return
            }

            const remaining = Math.max(
                0,
                Math.ceil(
                    (endTime - Date.now()) /
                    1000,
                ),
            )

            setRemainingSeconds(
                remaining,
            )

            if (remaining === 0) {
                endTimeRef.current = null
            }
        }, REST_TIMER_INTERVAL_MS)

        return () => {
            window.clearInterval(
                intervalId,
            )
        }
    }, [])

    const start = useCallback(
        (
            seconds = DEFAULT_REST_SECONDS,
        ) => {
            const duration = Math.max(
                0,
                Math.floor(seconds),
            )

            endTimeRef.current = Date.now() +
                duration * 1000

            setRemainingSeconds(
                duration,
            )
        },
        [],
    )

    const addTime = useCallback(
        (seconds: number) => {
            const amount = Math.max(
                0,
                Math.floor(seconds),
            )

            if (amount === 0) {
                return
            }

            const now = Date.now()

            const currentEndTime =
                endTimeRef.current ??
                now

            const newEndTime =
                Math.max(
                    currentEndTime,
                    now,
                ) +
                amount * 1000

            endTimeRef.current =
                newEndTime

            setRemainingSeconds(
                Math.ceil(
                    (newEndTime -
                        now) /
                    1000,
                ),
            )
        },
        [],
    )

    const subtractTime = useCallback(
        (seconds: number) => {
            const amount = Math.max(
                0,
                Math.floor(seconds),
            )

            if (amount === 0) {
                return
            }

            const endTime =
                endTimeRef.current

            if (endTime === null) {
                return
            }

            const newEndTime =
                endTime -
                amount * 1000

            const remaining =
                Math.max(
                    0,
                    Math.ceil(
                        (newEndTime -
                            Date.now()) /
                        1000,
                    ),
                )

            if (remaining === 0) {
                endTimeRef.current =
                    null
            } else {
                endTimeRef.current =
                    newEndTime
            }

            setRemainingSeconds(
                remaining,
            )
        },
        [],
    )

    const skip = useCallback(() => {
        endTimeRef.current = null
        setRemainingSeconds(0)
    }, [])

    return {
        remainingSeconds,
        start,
        addTime,
        subtractTime,
        skip,
    }
}