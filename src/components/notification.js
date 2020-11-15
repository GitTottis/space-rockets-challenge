import React, { } from "react";
import {
  useDisclosure,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Text
} from "@chakra-ui/core";
import { Slide } from "@chakra-ui/transition"

export const ALERT_STATUSES = {
    error: "error",
    ok: "success",
    warn: "warning",
    info: "info"
}

export function getNotificationData(status, message, showTime) {
  return {
      status: status, 
      message: message,
      showTime: showTime
  }
}

export default function Notification({status, message, showtime }) {

  const { isOpen, onToggle } = useDisclosure()
  
  React.useEffect(()=>{
    // setTimeout(onToggle, showtime)
    let t1 = setTimeout(() => {
      console.log("Opening Notification")
      onToggle(true)
      }, 500
    )
  
    let t2 = setTimeout(() => {
      console.log("Closing Notification")
      onToggle(false)
      }, showtime
    )

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onToggle, showtime, message])

  return (
    <>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          color="white"
          mt="75px"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Alert status={status} fontSize={25}>
            <AlertIcon />
            <AlertTitle mr={2}>{status}!</AlertTitle>
            <AlertDescription >
              <Text as="em">{message}</Text>
            </AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={onToggle} />
          </Alert>
        </Box>
      </Slide>
    </>
  )
}