import { ProgressCircle } from "@chakra-ui/react"

const ProgressCircleComponent = () => {
  return (
    <ProgressCircle.Root value={null} size="sm">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range stroke="blue.500" />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

export default ProgressCircleComponent;