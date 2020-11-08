/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { useFavoritesContext } from "../contexts/favorites-context";
import FavoriteItem from  "./favorite-item"
import {
    Drawer,
    DrawerBody,
    Box,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
    CloseButton,
    List,
    Flex,
    useDisclosure
  } from "@chakra-ui/core";

  const PLACEMENT = "right";

  export default function Favorites() {
    const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
    // const [favoriteLaunches, setFavoriteLaunches] = useFavoritesState('favouriteLaunches')
    // const [favoritePads, setFavoritePads] = useFavoritesState('favouritePads')
    const favourites = useFavoritesContext()
    // const setFavouritePads = useFavoritesUpdateContext()
  
    return (
      <>
        <Button
          onClick={onOpen}
          _hover={{ bg: "transparent" }}
          fontFamily="mono"
          letterSpacing="2px"
          fontWeight="bold"
          fontSize="lg"
          bg="transparent"
        >
          F4V0R!TE5
        </Button>
        <Drawer
            placement={PLACEMENT} isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent marginTop="88px">
            <DrawerHeader borderBottomWidth="1px">
              <Flex
                align="center"
                justify="space-between"
                wrap="wrap"
              >
                <h1>Favorites</h1>
                <CloseButton size="md" onClick={onClose} />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
            <Box
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              mb={2}
              isTruncated
            >
              Pads  {   Object.values(favourites).filter(favourite => favourite.type === 'pad').length > 0 
                          ? ` (${Object.values(favourites).filter(favourite => favourite.type === 'pad').length})`
                          : `(no favorites)`
                        }
              {/* Pads { Object.keys(favourites).length > 0 ? `(${Object.keys(favourites).length})` : `(no favorite pad)`} */}
            </Box>
            <List
              mb={4}
            >
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                {
                  Object.entries(favourites)
                    .filter( ([key, value]) => value.type === 'pad')
                    .map(([key, value]) => {
                      return <FavoriteItem favouriteData={ value } keyId={key} key={key}/>
                    })
                }
              </Flex>
            </List>
            <Box
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              mb={2}
              isTruncated
            >
              Launches  {   Object.values(favourites).filter(favourite => favourite.type === 'launch').length > 0 
                          ? ` (${Object.values(favourites).filter(favourite => favourite.type === 'launch').length})`
                          : `(no favorites)`
                        }
            </Box>
            <List
              mb={4}
            >
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                {
                  Object.entries(favourites)
                    .filter( ([key, value]) => value.type === 'launch')
                    .map(([key, value]) => {
                      return <FavoriteItem favouriteData={ value } keyId={key} key={key}/>
                    })
                }
              </Flex>
            </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }