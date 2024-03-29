import { Flex, Stack, Title, Text } from "@mantine/core";
import React from "react";
import {Timey} from "../time"

export function TimeFormated(props: any) {
    console.log(props.estimatedDepartureTime)
    const dateOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' }
    const formattedStartTime = new Date(props.departTime).toLocaleTimeString('en-GB', dateOptions)
    const formattedDestinationTime = new Date(props.arrivalTime).toLocaleTimeString('en-GB', dateOptions)

    let actuallFormattedDestinationTime
    if (props.estimatedArrivalTime !== undefined) {
        actuallFormattedDestinationTime = new Date(props.estimatedArrivalTime).toLocaleTimeString('en-GB', dateOptions)
    } else {
        actuallFormattedDestinationTime = formattedDestinationTime
    }

    let actuallFormattedStartTime
    if (props.estimatedDepartureTime !== undefined) {
        actuallFormattedStartTime = new Date(props.estimatedDepartureTime).toLocaleTimeString('en-GB', dateOptions)
    }else {
        actuallFormattedStartTime = formattedStartTime
    }

    let startTime = <Timey time={formattedStartTime} actuallTime={actuallFormattedStartTime} insertDash={true}/>

    let destinationTime = <Timey time={formattedDestinationTime} actuallTime={actuallFormattedDestinationTime}/>

    return (
        <Flex>
            {startTime}
            {destinationTime}
        </Flex>
    )
}
