/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, ListItem, Text } from "@chakra-ui/core";
import { ACTIONS } from "../utils/localize-favorites"

export default function FavoriteItem({itemType, data, favoriteSetter}) {
    const [btnState, setBtnState] = React.useState( true )
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
                    to={ itemType === 'favouriteLaunches' ? (`/launches/${data.flight_number.toString()}`) : (`/launch-pads/${data.site_id}`)}
                >
                <Box
                    ml="2"
                    fontWeight="semibold"
                    isTruncated
                >
                    { itemType === 'favouriteLaunches' ? ( data.mission_name ) : (data.name) }
                </Box>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                >
                    { itemType === 'favouriteLaunches' 
                        ?   `${data.rocket.rocket_name} &bull; ${data.launch_site.site_name}` 
                        :   ( 
                                <Text 
                                    ml="2" 
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    { itemType === 'favouriteLaunches' ? (data.vehicles_launched.join(", ")) : null }
                                </Text>
                            )
                    }
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
                    variantColor={ btnState ? "yellow" : "gray" }
                    aria-label="Call Sage"
                    icon={"star"}
                    _hover={{ variantColor: !btnState ? "yellow" : "gray" }}
                    onClick={
                        () => {
                            favoriteSetter({ 
                                type:   btnState 
                                        ? itemType === 'favouriteLaunches' ? ACTIONS.REMOVE_FAVORITE_LAUNCH : ACTIONS.REMOVE_FAVORITE_PAD
                                        : itemType === 'favouriteLaunches' ? ACTIONS.ADD_FAVORITE_LAUNCH    : ACTIONS.REMOVE_FAVORITE_PAD,
                                payload: data 
                            })
                            setBtnState(!btnState)
                        }
                    }
                />
                </Box>
            </Box>
        </ListItem>
    )
}
