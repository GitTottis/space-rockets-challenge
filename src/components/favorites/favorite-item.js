/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, ListItem, Text } from "@chakra-ui/core";
import { ACTIONS, useFavoritesUpdateContext } from "../../contexts/favorites-context"

export default function FavoriteItem({favouriteData, keyId}) {
    const [showItem, setShowItem] = useState(true);

    const favoriteSetter = useFavoritesUpdateContext()
    
    const deleteFavorite = () => {
        favoriteSetter({ 
            type:    ACTIONS.REMOVE_FAVORITE,
            payload: favouriteData
        })
    }

    return showItem && (
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
                    to={ favouriteData.type === 'launch' ? (`/launches/${favouriteData.flight_number.toString()}`) : (`/launch-pads/${favouriteData.site_id}`)}
                >
                <Box
                    ml="2"
                    fontWeight="semibold"
                    isTruncated
                >
                    { favouriteData.type === 'launch' ? ( favouriteData.mission_name ) : (favouriteData.name) }
                </Box>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                >
                    { favouriteData.type === 'launch'
                        ?   `${favouriteData.rocket.rocket_name} &bull; ${favouriteData.launch_site.site_name}` 
                        :   ( 
                                <Text 
                                    ml="2" 
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    { favouriteData.type === 'launch' ? (favouriteData.vehicles_launched.join(", ")) : null }
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
                    variantColor={ "gray" }
                    aria-label="Call Sage"
                    icon={"minus"}
                    onClick={() => {
                        setShowItem(false)
                        deleteFavorite()
                    }}
                />
                </Box>
            </Box>
        </ListItem>
    )
}
