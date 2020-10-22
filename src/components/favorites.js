/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    CloseButton,
    Link, List, ListItem,
    Flex,
    useDisclosure
  } from "@chakra-ui/core";


  export default function Favorites() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const placement = "right";
  
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
            placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent   marginTop="88px">
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
            <List>
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                <ListItem><Link>Pad 1</Link></ListItem>
                <ListItem><Link>Launch 1</Link></ListItem>
                <ListItem><Link>Pad 2</Link></ListItem>
                <ListItem><Link>Pad 3</Link></ListItem>
                <ListItem><Link>Launch 2</Link></ListItem>
                <ListItem><Link>Launch 3</Link></ListItem>
              </Flex>
            </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }