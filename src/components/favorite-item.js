/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, ListItem, Text } from "@chakra-ui/core";

  export default function FavoriteItem({itemType, data}) {
    if (itemType === 'launch') {
        return (
            <ListItem>
            <Box
                d="flex" 
                alignItems="baseline" 
                justifyContent="space-between"
                boxShadow="md"
                rounded="lg"
                overflow="hidden"
                position="relative"
                mb={1}
            >
                <Box
                as={Link}
                to={`/launches/${data.flight_number.toString()}`}
                >
                {/* {key} */}
                <Box
                    ml="2"
                    fontWeight="semibold"
                    isTruncated
                >
                    {data.mission_name}
                </Box>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                >
                    {data.rocket.rocket_name} &bull; {data.launch_site.site_name}
                </Box>
                </Box>
                <Box 
                pos="absolute"
                right="0"
                >
                <IconButton
                    align="center"
                    border="none"
                    variant="outline"
                    variantColor="yellow"
                    aria-label="Call Sage"
                    icon={"star"}
                    // onClick={ () =>setFavouritePads(appendNewFavourite())}
                />
                </Box>
            </Box>
            </ListItem>
        )
    }
    else {
        return (
            <ListItem>
              <Box
                d="flex" 
                alignItems="baseline" 
                justifyContent="space-between"
                boxShadow="md"
                rounded="lg"
                overflow="hidden"
                position="relative"
                mb={1}
              >
                <Box
                  as={Link}
                  to={`/launch-pads/${data.site_id}`}
                >
                  <Box
                    ml="2"
                    fontWeight="semibold"
                    isTruncated
                  >
                    {data.name}
                  </Box>
                  <Text 
                    ml="2" 
                    color="gray.500"
                    fontSize="sm"
                  >
                    {data.vehicles_launched.join(", ")}
                  </Text>
                </Box>
                <Box
                  pos="absolute"
                  right="0"
                >
                  <IconButton
                    border="none"
                    variant="outline"
                    variantColor="yellow"
                    aria-label="Call Sage"
                    icon={"star"}
                    // onClick={ () =>setFavouritePads(appendNewFavourite())}
                  />
                </Box>
              </Box>
            </ListItem>
          )
    }

  }