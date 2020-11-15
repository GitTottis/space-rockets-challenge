import React from 'react'
import { Flex, Text } from "@chakra-ui/core";
import Favorites from "./favorites/favorites";
import { AuthContext } from '../contexts/auth-context'
import Logout from "./login/social-logout"


function NavBar() {
  const { user } = React.useContext(AuthContext)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
    { !!user && <Logout /> }
    { !!user && <Favorites /> }
    </Flex>
  );
}

export default NavBar;
