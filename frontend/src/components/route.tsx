import { Paper, Progress, Container, Badge, Tooltip } from '@mantine/core';
import { useState, useEffect } from 'react';
import { api } from './api';

export function Route() {
  let [route, setRoute] = useState<any>([]);

  useEffect(() => {
    api(setRoute);
  }, []);

  console.log(route);

  let legs: any = []
  let totalTime = 0
  if (route["results"]) {
    totalTime = route["results"][0]["tripLegs"]?.reduce((acc: number, curr: any) => {
      let connectionTime = curr["estimatedConnectingTimeInMinutes"] ? curr["estimatedConnectingTimeInMinutes"] : 0
      return acc + curr["estimatedDurationInMinutes"] + connectionTime
    }, 0)

    legs = route["results"][0]["tripLegs"]?.map((leg: any) => {
      let connection = () => {
        if (leg["estimatedConnectingTimeInMinutes"]) {
          return (
            <Progress.Section value={(leg["estimatedConnectingTimeInMinutes"] / totalTime) * 100} color="gray">
            </Progress.Section>
          )
        }
      }
      let { backgroundColor, borderColor, foregroundColor, shortName } = leg["serviceJourney"]["line"]
      let percentage = (leg["estimatedDurationInMinutes"] / totalTime) * 100
      let direction = leg["serviceJourney"]["direction"]
      return (
        <>
          {connection()}
          <Tooltip label={`${shortName} ${direction}`} position="bottom">
            <Progress.Section value={percentage} color={backgroundColor} style={{ overflow: "visible" }}>
              <Badge size="lg" radius="md" color={backgroundColor} variant="filled" style={{ border: `medium solid ${borderColor}`, bottom: "1.6rem", position: "relative", overflow: "visible" }} c={foregroundColor}>
                {shortName}
              </Badge>
            </Progress.Section>
          </Tooltip>
        </>
      )
    })
  }

  return (
    <Container size="30rem">
      <Paper p="lg" shadow="xl" radius="lg" withBorder h={250}>
        <Progress.Root size={20} style={{ overflow: "visible" }}>
          {legs}
        </Progress.Root>
      </Paper>
    </Container>
  );
}
