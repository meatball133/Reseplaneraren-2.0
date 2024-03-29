import { Title, Stack } from '@mantine/core'

export function Timey(props: any) {
    const actuallFormattedTime = props.actuallTime
    const formattedTime = props.time
    const insertDash = props.insertDash

    let time: React.ReactNode
    if (formattedTime !== actuallFormattedTime) {
        time = <Stack gap="xs"><Title c="gray.6" order={3}><span style={{ backgroundColor: "var(--mantine-color-yellow-2)", borderRadius: "5px", padding: "2px", color: " var(--mantine-color-gray-7)" }}>{`${actuallFormattedTime}`}</span>{insertDash ? '-' : ''}</Title><Title c="gray.6" order={3} td="line-through">{`${formattedTime}`}</Title></Stack>
    } else {
        time = <Title c="gray.6" order={3}>{`${actuallFormattedTime} ${insertDash ? '-' : ''}`}</Title>
    }
    return time
}